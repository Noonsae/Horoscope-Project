"use client";

import { useState, useEffect } from "react";
import { GoMoveToTop } from "react-icons/go";

const GoMoveToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const moveToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={moveToTop}
          className="fixed bottom-8 right-8 p-3 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-800 focus:outline-none"
        >
          <GoMoveToTop />
        </button>
      )}
    </>
  );
};

export default GoMoveToTopButton;
