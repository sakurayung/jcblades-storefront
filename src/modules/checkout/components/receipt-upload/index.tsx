"use client"
import { useState } from "react"
import axios from "axios"

const FileUploadComponent = () => {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedFileUrl, setUploadedFileUrl] = useState("")

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0])
  }

  const getFileBase64EncodedContent = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = async () => {
        // Extract the base64 content by splitting at the comma
        const base64Content = (reader.result as string).split(",")[1]
        resolve(base64Content)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleUpload = async () => {
    if (!file) {
      return
    }
    setUploading(true)
    try {
      const base64Content = await getFileBase64EncodedContent(file)

      const response = await axios.post("/api/uploads", {
        files: [
          {
            filename: file.name,
            mimeType: file.type,
            content: base64Content,
            access: "public",
          },
        ],
      })

      if (response.data && response.data.length > 0) {
        setUploadedFileUrl(response.data[0].url)
      }
      setUploading(false)
    } catch (error) {
      console.error("Error uploading files", error)
      setUploading(false)
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? "Uploading...." : "Upload to s3"}
      </button>

      {uploadedFileUrl && (
        <div>
          <p>File uploaded successfully!</p>
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;
