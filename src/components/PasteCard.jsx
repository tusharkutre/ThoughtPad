import { Copy, Delete, EditIcon, Eye, Share, Trash2, ViewIcon } from "lucide-react";
import React from "react";
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

  // logic to formatDate
  const formatDate = (date) => {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayNum = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${day} ${month} ${dayNum}, ${year}`.toLowerCase();
  };

  return (
    <>
      <section>
        <div
          key={paste._id}
          className="bg-slate-200 relative p-4 border-1 ring-slate-200  rounded-2xl shadow-md w-full"
        >
          <div className="buttons justify-end sm:left-0 right-0 sm:flex flex-wrap sm:gap-5 space-x-1 mask-l-from-green-800  mr-2">
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
              className="px-2 py-1 cursor-pointer bg-white rounded-xl"
            >
              <Trash2/>
            </button>
            <button
              onClick={() => handleCopy(paste.content)}
              className="px-2 py-1 cursor-pointer bg-white rounded-xl"
            >
              <Copy/>
            </button>
            {/* pending feature */}
            <button className="px-2 cursor-pointer py-1 bg-white rounded-xl">
              <Share/>
            </button>
          </div>
          <h1 className="text-xl font-semibold mb-2">{paste.title}</h1>
          <p className="text-gray-700 mb-3">{paste.content}</p>
          {paste.createdAt && (
            <p className="text-sm bg-white p-2 rounded-xl mb-2 w-fit text-gray-500">
              Created at: {formatDate(new Date(paste.createdAt))}
            </p>
          )}
          {paste.updatedAt && (
            <p className="text-sm text-gray-500 bg-white p-2 rounded-xl w-fit">
              Updated at: {formatDate(new Date(paste.updatedAt))}
            </p>
          )}
        </div>
      </section>
    </>
  );
});

export default PasteCard;
