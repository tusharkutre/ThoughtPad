import { Copy, Delete, EditIcon, Eye, Share, Trash2, ViewIcon } from "lucide-react";
import React, { useCallback } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";

const PasteCard = React.memo(({ paste, handleDelete }) => {
  console.log("pasteCard component re-rendering...");

  //handle copy function
  const handleCopy = (content) => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        console.log("Content copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy content: ", err);
      })
      .finally(() => {
        return toast.success("Content copied to clipboard");
      });
  };

  return (
    <>
      <section>
        <div
          key={paste._id}
          className="bg-slate-200 relative p-4 rounded-2xl shadow-md w-full"
        >
          <div className="buttons justify-end  sm:left-0 right-0 sm:flex flex-wrap sm:gap-5 space-x-1 mask-l-from-green-800  mr-2">
            <button className="px-2 py-1 bg-white rounded-xl">
              <Link to={`/?pasteId=${paste?._id}`}>
              <EditIcon/>
              </Link>
            </button>
            <button className="px-2 py-1 bg-white rounded-xl">
              <Link to={`/pastes/${paste._id}`}>
              <Eye/>
              </Link>
            </button>
            <button
              onClick={() => handleDelete(paste?._id)}
              className="px-2 py-1 bg-white rounded-xl"
            >
              <Trash2/>
            </button>
            <button
              onClick={() => handleCopy(paste.content)}
              className="px-2 py-1 bg-white rounded-xl"
            >
              <Copy/>
            </button>
            {/* pending feature */}
            <button className="px-2 py-1 bg-white rounded-xl">
              <Share/>
            </button>
          </div>
          <h1 className="text-xl font-semibold mb-2">{paste.title}</h1>
          <p className="text-gray-700 mb-3">{paste.content}</p>
          {paste.createdAt && (
            <p className="text-sm text-gray-500">
              Created at: {new Date(paste.createdAt).toLocaleString()}
            </p>
          )}
          {paste.updatedAt && (
            <p className="text-sm text-gray-500">
              Updated at: {new Date(paste.updatedAt).toLocaleString()}
            </p>
          )}
        </div>
      </section>
    </>
  );
});

export default PasteCard;
