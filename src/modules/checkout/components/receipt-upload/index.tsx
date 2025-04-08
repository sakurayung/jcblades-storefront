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

  const handleUpload = async () => {
    if (!file) {
      return
    }
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("files", file)
      
      const response = await axios.post("/api/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      if (response.data && response.data.uploads && response.data.uploads.length > 0) {
        setUploadedFileUrl(response.data.uploads[0].url)
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
        {uploading ? "Uploading...." : "Upload receipt"}
      </button>

      {uploadedFileUrl && (
        <div>
          <p>File uploaded successfully!</p>
          <img src={uploadedFileUrl} alt="Uploaded file" style={{ maxWidth: "300px" }} />
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;