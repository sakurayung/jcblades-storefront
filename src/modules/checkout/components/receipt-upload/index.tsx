import React, { useState} from "react";
import axios from "axios";

interface UploadedFile {
    filename: string;
    url: string;
    mimeType: string;
}

const ReceiptUploa = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploadFile, setUploadFile] = useState<UploadedFile | null>(null);
    const [loading, setLoading] = useState(false); 
    const [token, setToken] = useState<string | null>(null);


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post('/api/upload/main', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            setUploadFile(response.data.files[0]);
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setLoading(false);
        }
    }   

    return (
        <div>
      <form onSubmit={handleUpload}>
        <input 
          type="file" 
          onChange={handleFileChange}
          accept="image/*,application/pdf"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Receipt'}
        </button>
      </form>

      {uploadFile && (
        <div>
          <p>Uploaded File: {uploadFile.filename}</p>
          {/* Display the file based on type */}
          {uploadFile.mimeType.includes('image') ? (
            <img src={uploadFile.url} alt="Receipt" style={{ maxWidth: '300px' }} />
          ) : (
            <a href={uploadFile.url} target="_blank" rel="noopener noreferrer">
              View Receipt
            </a>
          )}
        </div>
      )}
    </div>
    )
}