import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, Loader } from "lucide-react";
import toast from "react-hot-toast";

const TAG_COLORS = [
  "bg-gradient-to-r from-pink-400 to-purple-400 text-white",
  "bg-gradient-to-r from-purple-400 to-fuchsia-400 text-white",
  "bg-gradient-to-r from-fuchsia-400 to-pink-400 text-white",
  "bg-gradient-to-r from-pink-500 to-purple-500 text-white",
  "bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white",
];

const Image = () => {
  const [image, setImage] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const { id } = useParams();
  const { uploadApi } = useAuth();
  const navigate = useNavigate();

  const getImage = async (imageId) => {
    try {
      const { data } = await axios.get(`${uploadApi}/image/${imageId}`);
      if (data.success) {
        setImage(data.image);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      setNotFound(true);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (id) getImage(id);
    // eslint-disable-next-line
  }, [id]);

  let tagsArray = [];
  if (image) {
    if (typeof image.tags === "string" && image.tags.trim().length > 0) {
      tagsArray = image.tags
        .split(/[\s,]+/)
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
    } else if (Array.isArray(image.tags)) {
      tagsArray = image.tags.flatMap((tag) =>
        typeof tag === "string"
          ? tag
              .split(/[\s,]+/)
              .map((t) => t.trim())
              .filter((t) => t.length > 0)
          : []
      );
    }
  }

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const { data } = await axios.delete(`${uploadApi}/image/${id}`);
      if (data.success) {
        toast.success(data.message);
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setDeleting(false);
    }
  };

  if (notFound) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen p-6 bg-gradient-to-br from-pink-50 via-purple-50 to-white">
        <div className="p-8 text-center bg-white border border-pink-100 shadow-lg rounded-2xl">
          <h2 className="mb-2 text-2xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text">
            Image Not Found
          </h2>
          <p className="text-purple-700">
            The image you're looking for doesn't exist or may have been removed.
          </p>
        </div>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen p-6 bg-gradient-to-br from-pink-50 via-purple-50 to-white">
        <div className="flex flex-col items-center">
          <Loader className="w-8 h-8 text-purple-500 animate-spin" />
          <p className="mt-3 text-lg font-medium text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
            Loading your image...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-6 bg-gradient-to-br from-pink-50 via-purple-50 to-white">
      <div className="fixed inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_70%)]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-6 py-3 mb-6 font-medium text-purple-700 transition-all duration-300 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 hover:shadow-lg"
        >
          <ArrowLeft size={18} /> <span>Back to Gallery</span>
        </button>

        <Card className="w-full overflow-hidden transition-all duration-300 bg-white border border-pink-100 shadow-xl rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text">
              {image.title}
            </CardTitle>
            <CardDescription className="text-lg text-purple-700">
              {image.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <div className="relative overflow-hidden group">
              <img
                src={image.imageUrl}
                alt={image.title}
                className="object-contain w-full max-h-[500px] transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-purple-900/30 via-transparent to-transparent group-hover:opacity-100" />
            </div>
          </CardContent>

          <div className="flex flex-col gap-4 p-6 pt-4">
            <div className="flex flex-wrap justify-center gap-2">
              {tagsArray.map((tag, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full ${
                    TAG_COLORS[idx % TAG_COLORS.length]
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className={`w-full px-6 py-3 mt-2 font-medium text-white transition-all duration-300 rounded-lg shadow-lg cursor-pointer bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 hover:shadow-red-500/25 ${
                deleting ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {deleting ? (
                <Loader className="mx-auto animate-spin" />
              ) : (
                "Delete Image"
              )}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Image;
