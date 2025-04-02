import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import formidable from "formidable";
import fs from "fs";
import FormData from "form-data";

export const config = {
    api: {
        bodyParser: false,
    },
};


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { type } = req.query;
    try {
        // Get the session (if your backend requires authentication)
    
        // Parse the incoming multipart/form-data request
        const form = formidable({ multiples: true });
        const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>(
          (resolve, reject) => {
            form.parse(req, (err, fields, files) => {
              if (err) reject(err);
              resolve([fields, files]);
            });
          }
        );
        const formData = new FormData();
    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file) {
      return res.status(400).json({ error: "No file provided" });
    }

    // Append the file to FormData with the correct filepath
    formData.append("file", fs.createReadStream(file.filepath), {
      filename: file.originalFilename || "upload",
      contentType: file.mimetype || "application/octet-stream",
    });

    // Send the request to your Medusa backend
    const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
    const response = await axios.post(
      'http://localhost:9000/store/carts/[id]/upload-receipt', // Adjust this to match your backend route
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Cookie: req.headers.cookie || "", // Pass cookies for session/auth
        },
      }
    );

    // Return the backend response to the client
    return res.status(200).json(response.data);
  } catch (error: any) {
    console.error("Upload error:", error);
    return res.status(error.response?.status || 500).json({
      error: error.message || "Failed to upload file",
    });
  }
}