
import React, { useContext, useState, useEffect } from 'react';
import PasteContext from '../context/PasteContext';

const Drawer = () => {
  const ctx = useContext(PasteContext);
  const isOpen = ctx?.isShareModalOpen;
  const setIsOpen = ctx?.setIsShareModalOpen;
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to ensure DOM is ready before animation
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      // Wait for animation to complete before removing from DOM
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <>
      {/* Backdrop with fade animation */}
      <div 
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ease-in-out ${
          isAnimating ? 'opacity-40' : 'opacity-0'
        }`} 
        onClick={() => setIsOpen(false)} 
      />
      
      {/* Drawer with slide animation */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-md px-4">
          <div 
            className={`bg-white dark:bg-gray-800 rounded-t-2xl p-4 shadow-lg transition-transform duration-300 ease-out transform ${
              isAnimating ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Share paste</h3>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 px-2 py-1 rounded transition-colors duration-200"
              >
                Close
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Share this paste with others</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Drawer;