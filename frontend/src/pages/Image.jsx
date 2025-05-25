import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, Loader } from "lucide-react";

const TAG_COLORS = [
  "bg-emerald-100 text-emerald-700",
  "bg-blue-100 text-blue-700",
  "bg-yellow-100 text-yellow-700",
  "bg-pink-100 text-pink-700",
  "bg-purple-100 text-purple-700",
  "bg-orange-100 text-orange-700",
  "bg-cyan-100 text-cyan-700",
  "bg-red-100 text-red-700",
];

const Image = () => {
  const [image, setImage] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const { id } = useParams();
  const { uploadApi } = useAuth();
  const navigate = useNavigate();

  const getImage = async (imageId) => {
    try {
      const { data } = await axios.get(`${uploadApi}/image/${imageId}`);
      if (data.success) {
        setImage(data.image);
      }
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
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
        console.log(data.message);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
    } finally {
      setDeleting(false);
    }
  };

  if (!image) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <p className="text-gray-400">Image not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full mt-6">
      <button
        onClick={() => navigate(-1)}
        className="flex gap-1 px-4 py-2 mb-4 font-medium text-gray-700 transition bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
      >
        <ArrowLeft className="text-xs" /> <span>Back</span>
      </button>
      <Card className="w-full max-w-lg transition-transform bg-white border border-gray-200 shadow-lg rounded-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold truncate text-emerald-700">
            {image.title}
          </CardTitle>
          <CardDescription className="text-gray-500">
            {image.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-2">
          <img
            src={image.imageUrl}
            alt={image.title}
            className="object-cover border border-gray-100 rounded-lg shadow-sm w-80 h-80"
          />
        </CardContent>
        <CardFooter className="flex flex-col flex-wrap items-center gap-2">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            {tagsArray.map((tag, idx) => (
              <span
                key={idx}
                className={`px-2 py-1 text-xs rounded-full ${
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
            className={`flex-1 w-full px-4 py-2 cursor-pointer text-sm font-medium text-white transition rounded-lg bg-red-500 hover:bg-red-600 ${
              deleting ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {deleting ? <Loader className="mx-auto animate-spin" /> : "Delete"}
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Image;
