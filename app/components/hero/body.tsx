"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

interface IMainProps {
  isUploaded: boolean;
  uploadedfiles?: {
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
  uploadedfiles: [],
  uploadCount: 0,
  copyclickedcount: 0
};

export const Body = () => {
  const [state, setState] = useState(initialState);

  const UpdateIsCopiedState = (url: string) => {
    setState((prev) => ({
      ...prev,
      uploadedfiles: prev.uploadedfiles?.map((file) => {
        if (file.secure_url === url) {
          console.log("file.secure_url", file.secure_url);
          return {
            ...file,
            isCopied: !file.isCopied
          };
        }
        return file;
      })
    }));
  };

  const handleCopy = (url: string) => {
    const notCopied = state.uploadedfiles?.filter((file) => !file.isCopied);
    if (notCopied?.length) {
      navigator.clipboard.writeText(url).then(() => {
        UpdateIsCopiedState(url);
      });
    } else {
      UpdateIsCopiedState(url);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(120deg ,#2d3142 ,black,black,black )",
        backgroundSize: "cover"
      }}
      className="min-h-screen bg-current w-full flex flex-col gap-12 items-center py-10 px-4"
    >
      <CldUploadWidget
        uploadPreset="uploadToCloudinary"
        onSuccess={(results) => {
          const resultsInfo = results.info;
          if (
            resultsInfo &&
            typeof resultsInfo === "object" &&
            typeof resultsInfo.secure_url === "string"
          ) {
            setState((prev) => ({
              ...prev,
              isUploaded: true,
              uploadedfiles: prev.uploadedfiles
                ? [
                    ...prev.uploadedfiles,
                    {
                      secure_url: resultsInfo.secure_url,
                      display_name: resultsInfo.display_name ?? "",
                      isCopied: false
                    }
                  ]
                : [
                    {
                      secure_url: resultsInfo.secure_url,
                      display_name: resultsInfo.display_name ?? "",
                      isCopied: false
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
            className="text-[#14223f] bg-white hover:bg-[#bfc0c0] text-lg sm:text-xl md:text-2xl focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-6 py-3 shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
            onClick={() => open()}
          >
            {state.uploadCount === 0 ? "Upload File" : "Upload More"}
          </button>
        )}
      </CldUploadWidget>

      {state.isUploaded && (
        <div className="w-full max-w-4xl bg-white/[0.1] rounded-lg p-5">
          {state.uploadedfiles?.map(
            (file, index) => (
              console.log(file),
              (
                <div
                  key={index}
                  className={`flex flex-wrap sm:flex-nowrap items-center justify-between gap-5 p-4 border-b ${
                    index === 0 ? "rounded-t-lg" : ""
                  } text-white`}
                >
                  <div className="text-lg sm:text-lg md:text-xl max-md:truncate  font-semibold text-[#4970c5] ">
                    {file.display_name}
                  </div>
                  <div className="text-base sm:text-lg text-white/70 break-words truncate">
                    {file.secure_url}
                  </div>
                  <div
                    className={`text-white  focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-[#274482] dark:focus:ring-gray-700 dark:border-gray-700 cursor-pointer ${
                      file.isCopied && state.copyclickedcount === 1 ? "" : ""
                    }`}
                    onClick={() => handleCopy(file.secure_url)}
                  >
                    {file.isCopied ? "Copied" : "Copy"}
                  </div>
                </div>
              )
            )
          )}
        </div>
      )}
    </div>
  );
};
