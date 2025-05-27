import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Loader, ImagePlus, UploadCloud } from "lucide-react";
import MyCard from "../components/MyCard";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { uploadApi } = useAuth();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const getAllImages = async () => {
    try {
      const { data } = await axios.get(`${uploadApi}/images`);
      if (data.success) {
        setAllImages(data.images);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tags", tags);
      formData.append("file", file);

      const { data } = await axios.post(`${uploadApi}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (data.success) {
        toast.success(data.message);
        setIsUploaded((prev) => !prev);
        setTitle("");
        setDescription("");
        setTags("");
        setFile(null);
        setFileName("");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllImages();
    // eslint-disable-next-line
  }, [isUploaded]);

  return (
    <div className="w-full min-h-screen p-6 bg-gradient-to-br from-pink-50 via-purple-50 to-white">
      <div className="fixed inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_70%)]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="lg:sticky lg:top-6 lg:h-fit">
            <form
              onSubmit={handleSubmit}
              className="p-6 bg-white border border-pink-100 shadow-xl rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-full bg-gradient-to-r from-pink-100 to-purple-100">
                  <UploadCloud className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text">
                  Upload New Image
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-purple-700">
                    Title<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder="Summer Vacation 2023"
                    className="w-full px-4 py-3 text-sm border border-pink-200 rounded-lg bg-pink-50 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-purple-700">
                    Description<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder="Beautiful sunset at the beach"
                    className="w-full px-4 py-3 text-sm border border-pink-200 rounded-lg bg-pink-50 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-purple-700">
                    Tags <span className="text-purple-500">(optional)</span>
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setTags(e.target.value)}
                    value={tags}
                    placeholder="vacation, beach, sunset"
                    className="w-full px-4 py-3 text-sm border border-pink-200 rounded-lg bg-pink-50 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="flex flex-col items-center justify-center w-full p-8 transition-all border-2 border-pink-300 border-dashed rounded-lg cursor-pointer bg-gradient-to-br from-pink-50 to-purple-50 hover:border-pink-400 hover:shadow-sm">
                    <UploadCloud className="w-8 h-8 mb-2 text-purple-500" />
                    <p className="mb-1 text-sm font-medium text-purple-700">
                      {fileName || "Click to upload"}
                    </p>
                    <p className="text-xs text-purple-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!file || loading}
                  className="w-full px-6 py-3 mt-2 font-medium text-white transition-all duration-300 rounded-lg shadow-lg cursor-pointer bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 hover:shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader className="mx-auto animate-spin" />
                  ) : (
                    "Upload Image"
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="flex-1">
            {allImages.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {allImages.map((item) => (
                  <MyCard
                    key={item._id}
                    item={item}
                    setIsUploaded={setIsUploaded}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-pink-100 rounded-2xl">
                <ImagePlus className="w-12 h-12 mb-4 text-purple-400" />
                <h3 className="mb-2 text-xl font-medium text-purple-700">
                  Your gallery is empty
                </h3>
                <p className="max-w-md text-purple-500">
                  Upload your first image to get started. Your memories will
                  appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
