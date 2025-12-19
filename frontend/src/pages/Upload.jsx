import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "sonner";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const inputRef = useRef();
  const navigate = useNavigate();

  const handleFile = (file) => {
    setFile(file);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const submit = async () => {
    if (!file || !title) return toast.error("Missing fields");

    const form = new FormData();
    form.append("image", file);
    form.append("title", title);
    form.append("description", description);

    try {
      await api.post("/pins", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Pin uploaded!");
      navigate("/");
    } catch {
      toast.error("Upload failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create Pin</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div
          onClick={() => inputRef.current.click()}
          className="
            aspect-[3/4] border-2 border-dashed rounded-2xl
            flex items-center justify-center cursor-pointer
            hover:border-red-500
          "
        >
          {preview ? (
            <img src={preview} className="rounded-2xl" />
          ) : (
            <span className="text-neutral-500">Click to upload</span>
          )}
          <input
            ref={inputRef}
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>

        {/* Form */}
        <div className="space-y-4">
          <input
            placeholder="Title"
            className="w-full px-4 py-3 rounded-2xl border bg-neutral-50"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Description"
            rows={4}
            className="w-full px-4 py-3 rounded-2xl border bg-neutral-50"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            onClick={submit}
            className="w-full bg-red-600 text-white py-3 rounded-full font-semibold hover:bg-red-500"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
