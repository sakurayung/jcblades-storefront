"use client"
import { useState, useRef, ChangeEvent, useEffect } from "react"
import axios from "axios"
// import { sdk } from "@lib/config"; // This import is unused

interface FileUploadComponentProps {
  onUploadComplete?: () => void // Callback to signal upload completion
}

const FileUploadComponent = ({
  onUploadComplete,
}: FileUploadComponentProps) => {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadedFileUrl, setUploadedFileUrl] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [cartId, setCartId] = useState<string | null>(null)
  const [uploadedFileName, setUploadedFileName] = useState("") // Kept for completeness, though UI might not show if modal closes
  const [hasUploaded, setHasUploaded] = useState(false)

  useEffect(() => {
    const fetchCartId = async () => {
      try {
        const response = await fetch("/api/cart")
        const data = await response.json()
        if (data.cartId) {
          setCartId(data.cartId)
        } else {
          setError("No cart found. Please add items to your cart first.")
        }
      } catch (err) {
        setError("Failed to retrieve cart information. Please try again.")
      }
    }

    fetchCartId()
  }, [])

  // Consider initializing hasUploaded from sessionStorage if persistence across remounts is desired
  // useEffect(() => {
  //   if (sessionStorage.getItem("receipt_uploaded") === "true") {
  //     setHasUploaded(true);
  //   }
  // }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const selectedFiles = Array.from(e.target.files || [])

    if (selectedFiles.length + files.length > 2) {
      setError("Maximum 2 files allowed")
      return
    }

    const invalidFile = selectedFiles.find((file) => {
      const acceptableTypes = ["image/jpeg", "image/png", "image/jpg"]
      if (!acceptableTypes.includes(file.type)) {
        setError("Please upload valid image files (JPEG or PNG)")
        return true
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB")
        return true
      }
      return false
    })

    if (invalidFile) return

    const newFiles = selectedFiles.filter(
      (newFile) =>
        !files.some((existingFile) => existingFile.name === newFile.name)
    )

    if (newFiles.length < selectedFiles.length) {
      setError("Duplicate files detected and removed")
    }

    setFiles((prevFiles) => [...prevFiles, ...newFiles])
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    setError(null)

    const droppedFiles = Array.from(e.dataTransfer.files || [])

    if (droppedFiles.length + files.length > 2) {
      setError("Maximum 2 files allowed")
      return
    }

    const invalidFile = droppedFiles.find((file) => {
      const acceptableTypes = ["image/jpeg", "image/png", "image/jpg"]
      if (!acceptableTypes.includes(file.type)) {
        setError("Please upload valid image files (JPEG or PNG)")
        return true
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB")
        return true
      }
      return false
    })

    if (invalidFile) return

    const newFiles = droppedFiles.filter(
      (newFile) =>
        !files.some((existingFile) => existingFile.name === newFile.name)
    )

    if (newFiles.length < droppedFiles.length) {
      setError("Duplicate files detected and removed")
    }

    setFiles((prevFiles) => [...prevFiles, ...newFiles])
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const removeFile = (index: number) => {
    setFiles((files) => files.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (files.length === 0) return
    if (hasUploaded) {
      setError(
        "Receipt have already been uploaded. Please refresh to upload again."
      )
      return
    }
    if (!cartId) {
      setError("Cart information is unavailable. Please try again.")
      return
    }

    setUploading(true)
    setError(null)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append("files", file)
      })

      const response = await axios.post("/api/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            )
            setUploadProgress(progress)
          }
        },
      })

      if (
        response.data &&
        response.data.uploads &&
        response.data.uploads.length > 0
      ) {
        setUploadedFileUrl(response.data.uploads[0].url) // Note: Uses only the first file's URL
        setUploadedFileName(
          files.length === 1 ? files[0].name : `${files.length} files uploaded`
        )
        setHasUploaded(true)
        sessionStorage.setItem("receipt_uploaded", "true")

        // Call the callback to signal completion (e.g., close modal)
        onUploadComplete?.()
      }
      setUploading(false)
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Failed to upload files. Please try again."
      )
      setUploading(false)
    }
  }

  const resetUpload = () => {
    setFiles([])
    setUploadedFileUrl("")
    setUploadedFileName("")
    setError(null)
    setUploadProgress(0)
    setHasUploaded(false)
    // sessionStorage.removeItem("receipt_uploaded"); // If you want "Upload Again" to clear this
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const getFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg border border-gray-100 shadow-sm">
      {!uploadedFileUrl ? ( // This screen will be shown until upload is successful
        <div className="p-5">
          {/* ... (rest of your existing JSX for the upload form) ... */}
          <div className="mb-4">
            <h3 className="text-base font-medium text-gray-900">
              Upload Receipt
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Please upload your receipt to verify your purchase (max 2 files)
            </p>
          </div>

          <div
            className={`border border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
              isDragging
                ? "border-blue-400 bg-blue-50"
                : files.length > 0
                ? "border-gray-300 bg-gray-50"
                : "border-gray-200 hover:bg-gray-50 hover:border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".jpg,.jpeg,.png"
              multiple
              disabled={files.length >= 2}
            />

            <div className="flex flex-col items-center justify-center space-y-3">
              {files.length > 0 ? (
                <div className="w-full space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center space-x-3 flex-grow min-w-0">
                        <div className="bg-blue-100 p-2 rounded flex-shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div className="overflow-hidden min-w-0 flex-grow">
                          <p
                            className="text-sm font-medium text-gray-900 truncate"
                            title={file.name}
                          >
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {getFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          removeFile(index)
                        }}
                        className="p-1 rounded-full hover:bg-gray-100 flex-shrink-0 ml-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}

                  {files.length < 2 && (
                    <div className="text-center mt-2">
                      <p className="text-xs text-blue-600">
                        Click to add{" "}
                        {files.length === 1 ? "one more file" : "files"}{" "}
                        (optional)
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700">
                    Drag and drop or{" "}
                    <span className="text-blue-600 font-medium">
                      browse files
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    JPEG or PNG (max 5MB, up to 2 files)
                  </p>
                </>
              )}
            </div>
          </div>

          {error && (
            <div className="mt-3 text-sm text-red-600 bg-red-50 p-3 rounded-md flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-red-500 mr-2 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {!cartId && !error && (
            <div className="mt-3 text-sm text-amber-600 bg-amber-50 p-3 rounded-md flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Retrieving cart information...</span>
            </div>
          )}

          {uploading && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-gray-700">
                  Uploading
                </span>
                <span className="text-xs text-gray-500">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1">
                <div
                  className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={files.length === 0 || uploading || !cartId || hasUploaded}
            className={`w-full mt-4 px-4 py-2.5 text-sm font-medium rounded-md transition-all ${
              files.length === 0 || uploading || !cartId || hasUploaded
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {uploading
              ? "Uploading..."
              : hasUploaded
              ? "Already Uploaded"
              : "Upload Receipt"}
          </button>

          {hasUploaded && ( // This message might appear if hasUploaded is true initially
            <p className="mt-2 text-xs text-amber-600 text-center">
              Files have already been uploaded. Refresh to upload again or reset.
            </p>
          )}
        </div>
      ) : (
        // This "Upload Complete" screen might not be visible if the modal closes immediately.
        // Its content is kept for completeness or if you decide to delay the modal close.
        <div className="p-5">
          <div className="mb-4">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-base font-medium text-gray-900">
                Upload Complete
              </h3>
            </div>
            <p className="text-xs text-gray-500 mt-1 ml-8">
              {files.length === 1
                ? "Your receipt has"
                : `${files.length} files have`}{" "}
              been successfully uploaded
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="bg-blue-100 p-2 rounded flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {uploadedFileName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {files.length === 1
                      ? files[0].type.includes("pdf") // Example, adjust if PDF not allowed
                        ? "PDF Document"
                        : "Image"
                      : "Multiple Files"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <a
              href={uploadedFileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-all text-center"
            >
              View Receipt
            </a>
            <button
              onClick={resetUpload} // This button would allow uploading again if the modal didn't close
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-all"
            >
              Upload Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FileUploadComponent
