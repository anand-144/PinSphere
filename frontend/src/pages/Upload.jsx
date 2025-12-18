import { useState } from "react";
import { uploadPin } from "../services/pinServices";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    await uploadPin(formData);
    navigate("/");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="space-y-4 w-80">
        <h1 className="text-2xl font-bold">Upload Pin</h1>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <input className="input" placeholder="Title"
          onChange={(e) => setTitle(e.target.value)} />
        <button className="btn" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default Upload;
