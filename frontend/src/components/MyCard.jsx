import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "lucide-react";

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
        console.log(data.message);
      }
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card className="w-full transition-transform bg-white border border-gray-200 shadow-lg rounded-xl hover:scale-105">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold truncate text-emerald-700">
          {item.title}
        </CardTitle>
        <CardDescription className="text-gray-500">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center py-2">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="object-cover w-56 h-56 border border-gray-100 rounded-lg shadow-sm"
        />
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2 mb-2">
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
        <div className="flex w-full gap-3">
          <button
            onClick={handleView}
            className="flex-1 px-4 py-2 text-sm font-medium text-white transition rounded-lg cursor-pointer bg-emerald-600 hover:bg-emerald-700"
          >
            View
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className={`flex-1 px-4 py-2 cursor-pointer text-sm font-medium text-white transition rounded-lg bg-red-500 hover:bg-red-600 ${
              deleting ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {deleting ? <Loader className="mx-auto animate-spin" /> : "Delete"}
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MyCard;
