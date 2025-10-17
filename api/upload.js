// joeljamestech - Cloudinary permanent upload API for multiple files
import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  console.log("// joeljamestech - Upload API triggered");

  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("// joeljamestech - Parse error:", err);
      return res.status(500).json({ error: "Upload failed" });
    }

    const uploadedFiles = Array.isArray(files["files[]"]) ? files["files[]"] : [files["files[]"]];
    const uploadedUrls = [];

    for (const file of uploadedFiles) {
      const result = await cloudinary.uploader.upload(file.filepath, { folder: "joelhost" });
      console.log("// joeljamestech - File uploaded:", result.secure_url);
      uploadedUrls.push(result.secure_url);
    }

    return res.status(200).json({ success: true, urls: uploadedUrls });
  });
}
