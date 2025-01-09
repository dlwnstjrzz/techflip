"use client";

import { useEffect, useRef } from "react";
import html2canvas from "html2canvas";

export default function LogoPage() {
  const logoRef = useRef(null);

  const handleCapture = async () => {
    if (logoRef.current) {
      const canvas = await html2canvas(logoRef.current, {
        backgroundColor: null,
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "moaba-logo.png";
      link.click();
    }
  };

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-[9999]">
      <div
        ref={logoRef}
        className="w-[18.75rem] h-[18.75rem] bg-black flex items-center justify-center"
      >
        <span className="font-kanit text-[4.375rem] text-white mb-[70px]">
          MOABA
        </span>
      </div>
      <button
        onClick={handleCapture}
        className="fixed bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        저장하기
      </button>
    </div>
  );
}
