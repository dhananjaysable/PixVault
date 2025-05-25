import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Loader } from "lucide-react";
import MyCard from "../components/MyCard";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { loading, setLoading, uploadApi } = useAuth();
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
      console.log(error?.response?.data?.message || error.message);
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
    <div className="flex items-start justify-between w-full mt-6">
      <div className="grid w-full h-full grid-cols-4 gap-4 p-4 border-r md:grid-cols-2 border-gray-300/50">
        {allImages && allImages.length > 0 ? (
          allImages.map((item, index) => (
            <MyCard
              item={item}
              index={index}
              key={item._id || index}
              setIsUploaded={setIsUploaded}
            />
          ))
        ) : (
          <p className="text-gray-400">No images uploaded yet.</p>
        )}
      </div>
      <form
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="flex flex-col items-start justify-center w-1/3 gap-3 px-5 py-2 bg-white shadow-m rounded-xl"
      >
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          className="w-full px-6 py-3 text-sm border border-gray-200 rounded-full bg-gray-50"
          value={title}
          placeholder="Enter Title"
        />
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          className="w-full px-6 py-3 text-sm border border-gray-200 rounded-full bg-gray-50"
          value={description}
          placeholder="Enter Description"
        />
        <input
          type="text"
          onChange={(e) => setTags(e.target.value)}
          name="tags"
          className="w-full px-6 py-3 text-sm border border-gray-200 rounded-full bg-gray-50"
          value={tags}
          placeholder="Enter Tags"
        />
        <input
          type="file"
          name="file"
          className="w-full px-6 py-3 text-sm border border-gray-200 rounded-full cursor-pointer bg-gray-50"
          onChange={handleFileChange}
        />
        {fileName && (
          <p className="text-sm text-center text-emerald-700">
            Selected file: <strong>{fileName}</strong>
          </p>
        )}
        <button
          type="submit"
          className="w-full px-5 py-2 text-white transition rounded-full cursor-pointer bg-emerald-700 hover:bg-emerald-600"
        >
          {loading ? <Loader className="mx-auto animate-spin" /> : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
