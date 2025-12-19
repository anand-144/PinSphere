import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const fileRef = useRef();

  const handleUpload = async () => {
    if (!file || !title) return toast.error("Missing fields");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const res = await fetch("http://localhost:5000/api/pins", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Pin uploaded!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <Helmet><title>Create Pin</title></Helmet>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <input type="file" ref={fileRef} onChange={(e) => setFile(e.target.files[0])} />
        <input className="input-field mt-4" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <textarea className="input-field mt-4" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
        <button onClick={handleUpload} className="btn-primary mt-6">Publish</button>
      </div>
    </>
  );
};

export default Upload;
