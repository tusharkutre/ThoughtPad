import { useSelector, useDispatch } from "react-redux";
import { useState , useCallback } from "react";
import { removeFromPastes } from "../redux/pasteSlice";
import PasteCard from "../components/PasteCard";

const Pastes = () => {
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

 const handleDelete = useCallback((id) => {
    dispatch(removeFromPastes(id));
  }, [dispatch]);

  return (
    <>
      <section className="flex flex-col items-center gap-6 p-4">
        <div className="inputField mb-4">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-xl w-80"
            placeholder="Search pastes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="pasteData flex flex-col gap-5 w-full max-w-4xl">
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
            <div className="text-center p-8">
              <p className="text-gray-600">
                No pastes match your search "{searchTerm}"
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Try different keywords or clear the search
              </p>
            </div>
          ) : (
            <div className="text-center p-8">
              <p className="text-gray-600">No pastes found</p>
              <p className="text-sm text-gray-500 mt-2">
                Create your first paste to get started
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Pastes;