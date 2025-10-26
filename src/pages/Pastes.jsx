import { useSelector, useDispatch } from "react-redux";
import { useState, useCallback } from "react";
import { removeFromPastes } from "../redux/pasteSlice";
import PasteCard from "../components/PasteCard";
import ThoughPadUI from "../components/ThoughPadUI";
import Drawer from "../components/Drawer";
import PasteContext from "../context/PasteContext";

import pasteImg from "../assets/paste.svg"; // Assuming you have a paste image in your assets

// consumer component(child component)
const Pastes = ({isDarkMode}) => {
  // local state to control the shared Drawer/modal
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Get pastes from Redux store with fallback
  const pastes = useSelector((state) => state.pastes.pastes || []);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  // Filter pastes based on search term
  const filteredData = Array.isArray(pastes)
    ? pastes.filter(
        (paste) =>
          paste.title &&
          paste.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleDelete = useCallback(
    (id) => {
      dispatch(removeFromPastes(id));
    },
    [dispatch]
  );

  return (
    <>
      <PasteContext.Provider value={{ isShareModalOpen, setIsShareModalOpen }}>
        <section className="mx-auto max-w-4xl p-4">
          <div className="flex justify-center items-center mt-5 mb-5">
            <img width={300} src={pasteImg} alt="" />
          </div>
          <div className="w-full p-4 rounded-2xl bg-blue-600 flex flex-col items-start mb-4">
            <ThoughPadUI
              heading="Find your pastes here"
              para="Edit and share your fav pastes with friends ❤️"
            />
          </div>

          {/* nested section code comes */}
          <section className="flex flex-col items-center gap-6 p-4">
            <div className="inputField mb-4">
              <input
                type="text"
                className={`p-2 border border-gray-300 text-black rounded-xl w-80 ${isDarkMode ? 'text-blue-100' : ' text-black'}` }
                placeholder="Search pastes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="self-start">
              <h1 className="text-3xl font-semibold">Notes</h1>
            </div>

            <div className="pasteData grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl">
              {/* conditional rendering */}
              {filteredData.length > 0 ? (
                filteredData.map((paste) => (
                  <PasteCard
                    key={paste._id}
                    paste={paste}
                    handleDelete={handleDelete}
                  />
                ))
              ) : pastes.length > 0 ? (
                <div className="text-center p-8 bg-slate-100 rounded-lg shadow-md">
                  <p className="text-gray-600">
                    No pastes match your search "{searchTerm}"
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Try different keywords or clear the search
                  </p>
                </div>
              ) : (
                <div className="text-center flex justify-center p-8 bg-slate-100 rounded-lg shadow-md">
                  <p className="text-gray-600">No pastes found</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Create your first paste to get started
                  </p>
                </div>
              )}
            </div>
          </section>
        </section>

        {/* Drawer lives at page level and reads modal state from context */}
        <Drawer />
      </PasteContext.Provider>
    </>
  );
};

export default Pastes;
