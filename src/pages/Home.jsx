import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

import { Copy, PlusCircle } from "lucide-react";

import home from "../assets/home.svg"; // Assuming you have a home icon in your assets

const Home = () => {
  const dispatch = useDispatch(); //extracting out the reducers(functions) from the store.js

  const [title, setTitle] = useState();
  const [value, setValue] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  // Using useSearchParams to access the URL search parameters
  // Extracting pasteId from the URL search parameters
  const pasteId = searchParams.get("pasteId");

  const [clearALl, setClearAll] = useState(false);

  // Using useSelector to get pastes from the Redux store, with a fallback to an empty array
  const [allPastes, setAllPastes] = useSelector((state) => state.pastes.pastes);

  const handleClearAll = () => {
    setTitle("");
    setValue("");
    setClearAll(true);
  };

  // useEffect to set the title and value based on the pasteId from the URL
  useEffect(() => {
    const paste = allPastes?.find?.((paste) => paste._id === pasteId);
    if (pasteId && paste) {
      setTitle(paste.title);
      setValue(paste.content);
    } else {
      setTitle("");
      setValue("");
    }
  }, [pasteId, allPastes]);

  // Function to create or update a paste
  const createPaste = () => {
    // Logic to create a new paste
    const paste = {
      title: title,
      content: value,
      _id:
        pasteId ||
        Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toLocaleDateString("en-US"),
    };

    console.log(paste.createdAt); // Example output: "June 13 2025"

    //providing pasteData to the store
    if (pasteId) {
      // Logic to update an existing paste
      console.log("Updating paste:", paste);
      // Here you would typically dispatch an action to update the paste in the store
      dispatch(updateToPastes(paste));
    } else {
      // Logic to create a new paste
      console.log("Creating new paste:", paste);
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({}); // Clear the search parameters after creating or updating a paste
    setClearAll(false); // Reset clearAll state
  };

  return (
    <>
      <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
        <div className="flex flex-col gap-y-5 items-start">
          <div className="flex mx-auto mb-4">
            <img width={300} src={home} alt="" />
          </div>
          <div className="w-full flex flex-row gap-x-4 justify-between items-center">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              // Dynamic width based on whether pasteId is present
              className={`${
                pasteId ? "w-[80%]" : "w-[85%]"
              } text-black border border-input rounded-md p-2`}
            />
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={createPaste}
            >
              {pasteId ? "Update Paste" : "Create Paste"}
            </button>

            {pasteId && (
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                onClick={handleClearAll}
              >
                <PlusCircle size={20} />
              </button>
            )}
          </div>

          <div
            className={`w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}
          >
            <div
              className={`w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]`}
            >
              <div className="w-full flex gap-x-[6px] items-center select-none group">
                <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />

                <div
                  className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]`}
                />

                <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
              </div>
              {/* Circle and copy btn */}
              <div
                className={`w-fit rounded-t flex items-center justify-between gap-x-4 px-4`}
              >
                {/*Copy  button */}
                <button
                  className={`flex justify-center items-center  transition-all duration-300 ease-in-out group`}
                  onClick={() => {
                    navigator.clipboard.writeText(value);
                    toast.success("Copied to Clipboard", {
                      position: "top-right",
                    });
                  }}
                >
                  <Copy className="group-hover:text-sucess-500" size={20} />
                </button>
              </div>
            </div>

            {/* TextArea */}
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Write Your Content Here...."
              className="w-full p-3  focus-visible:ring-0"
              style={{
                caretColor: "#000",
              }}
              rows={20}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

// After creating a new paste, you can reset the form
