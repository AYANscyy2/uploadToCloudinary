"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

interface IMainProps {
  isUploaded: boolean;
  uploadedfilesUrls?: {
    secure_url: string;
    display_name: string;
    isCopied?: boolean;
  }[];
  uploadCount?: number;
  copyclickedcount?: number;
  fileName?: string;
}

const initialState: IMainProps = {
  isUploaded: false,
  uploadedfilesUrls: [],
  uploadCount: 0,
  copyclickedcount: 0
};

export const Body = () => {
  const [state, setState] = useState(initialState);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setState((prev) => ({
        ...prev,
        copyclickedcount: prev.copyclickedcount == 0 ? 1 : 0,
        uploadedfilesUrls: prev.uploadedfilesUrls?.map((file) => {
          if (file.secure_url === url) {
            return {
              ...file,
              isCopied: true
            };
          }
          return file;
        })
      }));
    });
  };

  return (
    <div className="bg-[#2d3142] min-h-screen w-full flex flex-col gap-12 items-center py-10 px-4">
      <CldUploadWidget
        uploadPreset="uploadToCloudinary"
        onSuccess={(results) => {
          console.log("results", results);
          const resultsInfo = results.info;
          if (
            resultsInfo &&
            typeof resultsInfo === "object" &&
            typeof resultsInfo.secure_url === "string"
          ) {
            setState((prev) => ({
              ...prev,
              isUploaded: true,
              uploadedfilesUrls: prev.uploadedfilesUrls
                ? [
                    ...prev.uploadedfilesUrls,
                    {
                      secure_url: resultsInfo.secure_url,
                      display_name: resultsInfo.display_name ?? ""
                    }
                  ]
                : [
                    {
                      secure_url: resultsInfo.secure_url,
                      display_name: resultsInfo.display_name ?? ""
                    }
                  ],
              uploadCount: prev.uploadCount ? prev.uploadCount + 1 : 1
            }));
          } else {
            console.error(
              "Unexpected type or missing info:",
              results.info ?? "undefined"
            );
          }
        }}
      >
        {({ open }) => (
          <button
            className="text-[#4f5d75] bg-[#bfc0c0] hover:bg-[#ffffff] text-lg sm:text-xl md:text-2xl focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-6 py-3 shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
            onClick={() => open()}
          >
            {state.uploadCount === 0 ? "Upload File" : "Upload More"}
          </button>
        )}
      </CldUploadWidget>

      {state.isUploaded && (
        <div className="w-full max-w-4xl bg-white/[0.1] rounded-lg p-5">
          {state.uploadedfilesUrls?.map((file, index) => (
            <div
              key={index}
              className={`flex flex-wrap sm:flex-nowrap items-center justify-between gap-5 p-4 border-b ${
                index === 0 ? "rounded-t-lg" : ""
              } text-white`}
            >
              <div className="text-lg sm:text-xl md:text-2xl font-semibold text-[#14213d] ">
                {file.display_name}
              </div>
              <div className="text-sm sm:text-base text-white/70 break-words truncate">
                {file.secure_url}
              </div>
              <div
                className={`text-white  focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800  dark:focus:ring-gray-700 dark:border-gray-700 cursor-pointer ${
                  file.isCopied && state.copyclickedcount === 1 ? "" : ""
                }`}
                onClick={() => handleCopy(file.secure_url)}
              >
                {file.isCopied && state.copyclickedcount === 1
                  ? "Copied"
                  : "Copy"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
