import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Upload as UploadIcon, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast.error("Please select an image");
      return;
    }

    if (!title.trim()) {
      toast.error("Please add a title");
      return;
    }

    setLoading(true);

    // Simulate upload
    setTimeout(() => {
      toast.success("Pin uploaded successfully!");
      navigate("/");
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Create Pin | PinSphere</title>
        <meta
          name="description"
          content="Upload and share your creative ideas on PinSphere."
        />
      </Helmet>

      <div className="min-h-[calc(100vh-80px)] py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 animate-fade-up">
            Create Pin
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Upload Area */}
            <div className="animate-fade-up stagger-1">
              {!preview ? (
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`aspect-[3/4] rounded-2xl border-2 border-dashed cursor-pointer
                    flex flex-col items-center justify-center gap-4 transition-all duration-200
                    ${
                      dragActive
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-secondary/50"
                    }`}
                >
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                    <UploadIcon className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">Click to upload</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full rounded-2xl"
                  />
                  <button
                    onClick={clearFile}
                    className="absolute top-3 right-3 w-10 h-10 bg-background/90 hover:bg-background 
                               rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Form */}
            <div className="space-y-6 animate-fade-up stagger-2">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Add a title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Tell everyone what your Pin is about"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="input-field resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Board
                </label>
                <select className="input-field">
                  <option value="">Choose a board</option>
                  <option value="inspiration">Inspiration</option>
                  <option value="travel">Travel</option>
                  <option value="food">Food & Recipes</option>
                  <option value="diy">DIY & Crafts</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  placeholder="Add tags (comma separated)"
                  className="input-field"
                />
              </div>

              <button
                onClick={handleUpload}
                disabled={loading || !file}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Publishing...
                  </span>
                ) : (
                  "Publish"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upload;
