"use client"
import { useState, useRef, ChangeEvent } from "react"
import axios from "axios"

const FileUploadComponent = () => {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedFileUrl, setUploadedFileUrl] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const selectedFile = e.target.files?.[0]

    if (selectedFile) {
      const acceptableTypes = ['image/jpeg,', 'image/png',]
      if (!acceptableTypes.includes(selectedFile.type)) {
        setError("Please upload a valid image file (JPEG or PNG)")
        return
      }

      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB")
        return
      }
      setFile(selectedFile)
    }
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
    
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      // Perform the same validations as handleFileChange
      const acceptableTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
      if (!acceptableTypes.includes(droppedFile.type)) {
        setError("Please upload a valid file type (JPEG, PNG, or PDF)")
        return
      }
      
      if (droppedFile.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit")
        return
      }
      
      setFile(droppedFile)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleUpload = async () => {
    if (!file) {
      return
    }
    setUploading(true)
    setError(null)
    setUploadProgress(0)
    
    try {
      const formData = new FormData()
      formData.append("files", file)
      
      const response = await axios.post("/api/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setUploadProgress(progress)
          }
        }
      })

      if (response.data && response.data.uploads && response.data.uploads.length > 0) {
        setUploadedFileUrl(response.data.uploads[0].url)
      }
      setUploading(false)
    } catch (error: any) {
      console.error("Error uploading files", error)
      setError(error.response?.data?.message || "Failed to upload file. Please try again.")
      setUploading(false)
    }
  }

  const resetUpload = () => {
    setFile(null)
    setUploadedFileUrl("")
    setError(null)
    setUploadProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Get file size in a readable format
  const getFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes'
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
    else return (bytes / 1048576).toFixed(1) + ' MB'
  }

  // Determine file icon based on type
  const getFileIcon = (fileType: string): string => {
    if (fileType.includes('image')) return '🖼️'
    if (fileType.includes('pdf')) return '📄'
    return '📁'
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow">
    {!uploadedFileUrl ? (
      <>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"
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
            accept=".jpg,.jpeg,.png,.pdf"
          />
          
          <div className="flex flex-col items-center justify-center space-y-3">
            {file ? (
              <>
                <div className="text-4xl">{getFileIcon(file.type)}</div>
                <div className="font-medium text-gray-800 truncate max-w-full">
                  {file.name}
                </div>
                <div className="text-sm text-gray-500">
                  {getFileSize(file.size)}
                </div>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  JPEG, PNG or PDF (max 5MB)
                </p>
              </>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-3 text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <div className="mt-4 flex gap-3">
          {file && (
            <button 
              onClick={resetUpload}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Remove
            </button>
          )}
          
          <button 
            onClick={handleUpload} 
            disabled={!file || uploading}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              !file || uploading 
                ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {uploading ? "Uploading..." : "Upload Receipt"}
          </button>
        </div>

        {uploading && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-right mt-1 text-gray-500">{uploadProgress}%</p>
          </div>
        )}
      </>
    ) : (
      <div className="text-center">
        <div className="mb-4 flex items-center justify-center">
          <div className="bg-green-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-medium text-gray-900">Upload Complete!</h3>
        
        <div className="mt-4 mb-4 border rounded-lg overflow-hidden">
          {uploadedFileUrl.endsWith('.pdf') ? (
            <div className="bg-gray-100 p-8 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
              </svg>
            </div>
          ) : (
            <img 
              src={uploadedFileUrl} 
              alt="Uploaded file" 
              className="w-full object-contain max-h-64" 
            />
          )}
        </div>
        
        <div className="flex gap-3 mt-4">
          <a 
            href={uploadedFileUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
          >
            View File
          </a>
          <button 
            onClick={resetUpload}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Upload Another
          </button>
        </div>
      </div>
    )}
  </div>
  );
};

export default FileUploadComponent;