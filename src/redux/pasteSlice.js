import { createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';

// Helper function to safely get pastes from localStorage
const getPastesFromLocalStorage = () => {
  try {
    const pastes = localStorage.getItem("pastes");
    if (pastes) {
      const parsed = JSON.parse(pastes);
      // Ensure it's an array
      return Array.isArray(parsed) ? parsed : [];
    }
    return [];
  } catch (error) {
    console.error("Error parsing pastes from localStorage:", error);
    return [];
  }
};

// Helper function to safely save pastes to localStorage
const savePastesToLocalStorage = (pastes) => {
  try {
    localStorage.setItem("pastes", JSON.stringify(pastes));
  } catch (error) {
    console.error("Error saving pastes to localStorage:", error);
    toast.error("Failed to save paste to local storage");
  }
};

const initialState = {
  pastes: getPastesFromLocalStorage(),
};

// createSlice is a function that takes a slice of the state and returns an object with reducers and actions
export const pasteSlice = createSlice({
  name: "pastes",
  initialState,
  // all reducers fns are defined here
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      console.log(paste);

      // validation code
      if(!paste.title || !paste.content) {
        toast.error("Title and content are required!");
        return;
      }
      
      // Trim whitespace for consistent validation
      const trimmedTitle = paste.title.trim();
      const trimmedContent = paste.content.trim();
      
      if(!trimmedTitle || !trimmedContent) {
        toast.error("Title and content cannot be empty!");
        return;
      }

      // Check if a paste with the same ID already exists
      const existingPasteById = state.pastes.find(p => p._id === paste._id);
      if (existingPasteById) {
        toast.error("A paste with this ID already exists!");
        return;
      }
      
      // Check if a paste with the same title already exists
      const existingPasteByTitle = state.pastes.find(p => 
        p.title.toLowerCase().trim() === paste.title.toLowerCase().trim()
      );
      if (existingPasteByTitle) {
        toast.error("A paste with this title already exists!");
        return;
      }

      // Create paste with trimmed values
      const newPaste = {
        ...paste,
        title: trimmedTitle,
        content: trimmedContent
      };

      state.pastes.push(newPaste);
      // Update localStorage whenever a new paste is added
      savePastesToLocalStorage(state.pastes);
      // Show a toast notification when a paste is added
      toast.success("Paste added successfully!");
    },
    
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if(index >= 0){
        // validation for update
        if(!paste.title || !paste.content) {
          toast.error("Title and content are required!");
          return;
        }

        const trimmedTitle = paste.title.trim();
        const trimmedContent = paste.content.trim();
        
        if(!trimmedTitle || !trimmedContent) {
          toast.error("Title and content cannot be empty!");
          return;
        }

        // Check if another paste with the same title exists (excluding current paste)
        const existingPasteByTitle = state.pastes.find((p, i) => 
          i !== index && p.title.toLowerCase().trim() === paste.title.toLowerCase().trim()
        );
        if (existingPasteByTitle) {
          toast.error("A paste with this title already exists!");
          return;
        }

        // Update with trimmed values
        state.pastes[index] = {
          ...paste,
          title: trimmedTitle,
          content: trimmedContent
        };
        
        // Update localStorage whenever a paste is updated
        savePastesToLocalStorage(state.pastes);
        // Show a toast notification when a paste is updated
        toast.success("Paste updated successfully!");
      } else {
        toast.error("Paste not found!");
      }
    },
    
    resetAllPastes: (state, action) => {
      state.pastes = [];
      // Clear localStorage when all pastes are reset
      try {
        localStorage.removeItem("pastes");  //remove pastes key from localStorage
        toast.success("All pastes cleared!");
      } catch (error) {
        console.error("Error clearing localStorage:", error);
        toast.error("Failed to clear local storage");
      }
    },
    
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      console.log("paste removed",pasteId);

      const index = state.pastes.findIndex((item) => item._id === pasteId);
      if (index >= 0) {
        state.pastes.splice(index, 1);
        savePastesToLocalStorage(state.pastes);
        toast.success("Paste deleted successfully!");
      } else {
        toast.error("Paste not found!");
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions;

export default pasteSlice.reducer;