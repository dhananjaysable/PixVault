import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

const TAG_COLORS = [
  "bg-gradient-to-r from-pink-400 to-purple-400 text-white",
  "bg-gradient-to-r from-purple-400 to-fuchsia-400 text-white",
  "bg-gradient-to-r from-fuchsia-400 to-pink-400 text-white",
];

const MyCard = ({ item, setIsUploaded }) => {
  const navigate = useNavigate();
  const { uploadApi } = useAuth();
  const [deleting, setDeleting] = useState(false);

  let tagsArray = [];
  if (typeof item.tags === "string" && item.tags.trim().length > 0) {
    tagsArray = item.tags
      .split(/[\s,]+/)
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
  } else if (Array.isArray(item.tags)) {
    tagsArray = item.tags.flatMap((tag) =>
      typeof tag === "string"
        ? tag
            .split(/[\s,]+/)
            .map((t) => t.trim())
            .filter((t) => t.length > 0)
        : []
    );
  }

  const handleView = () => {
    navigate(`/image/${item._id}`);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const { data } = await axios.delete(`${uploadApi}/image/${item._id}`);
      if (data.success) {
        setIsUploaded((prev) => !prev);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 bg-white border border-pink-100 shadow-lg rounded-2xl hover:shadow-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text">
          {item.title}
        </CardTitle>
        <CardDescription className="text-purple-700">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative overflow-hidden group">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="object-cover w-full h-48 transition-transform duration-500 sm:h-56 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-end p-4 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-purple-900/50 to-transparent group-hover:opacity-100">
            <div className="flex flex-wrap gap-2">
              {tagsArray.map((tag, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    TAG_COLORS[idx % TAG_COLORS.length]
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <div className="flex gap-3 p-4 pt-4">
        <button
          onClick={handleView}
          className="flex-1 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 rounded-lg shadow cursor-pointer bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 hover:shadow-pink-500/25"
        >
          View
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className={`flex-1 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 bg-red-500 rounded-lg shadow cursor-pointer hover:bg-red-600 hover:shadow-red-500/25 ${
            deleting ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {deleting ? <Loader className="mx-auto animate-spin" /> : "Delete"}
        </button>
      </div>
    </Card>
  );
};

export default MyCard;
