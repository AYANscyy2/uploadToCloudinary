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
        copyclickedcount:
          prev.copyclickedcount == 0
            ? prev.copyclickedcount
              ? prev.copyclickedcount + 1
              : 1
            : 0
      }));
    });
  };

  return (
    <div className="bg-[#2d3142] h-auto min-h-screen w-full flex flex-col gap-20 justify-center items-center">
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
        {({ open }) => {
          return (
            <button
              className="text-[#4f5d75] bg-[#bfc0c0] hover:bg-[#ffffff] text-[25px] focus:outline-none focus:ring-4 focus:ring-gray-300 font-normal rounded-lg px-7 py-3.5 me-3"
              onClick={() => open()}
            >
              {state.uploadCount === 0 ? "Upload File" : "Upload More"}
            </button>
          );
        }}
      </CldUploadWidget>

      {state.isUploaded && (
        <div className="text-[32px] h-auto p-5 w-[95vw] flex flex-col bg-white/[0.1]">
          {state.uploadedfilesUrls?.map((file, index) => (
            <div
              key={index}
              className={`sm:flex justify-between p-5 gap-5 bg-white/[0.2] h-auto w-auto ${
                index === 0 ? "rounded-t-lg" : ""
              } ${
                index === state.uploadedfilesUrls?.length ? "rounded-t-lg" : ""
              }  text-[24px] `}
            >
              <div className="font-normal text-[#14213d]">
                {file.display_name}
              </div>
              <div className="font-normal flex flex-wrap break-words h-auto text-white/50">
                {file.secure_url}
              </div>
              <div
                className={`font-normal ${
                  state.copyclickedcount === 0
                    ? "text-[#004b23]"
                    : "text-[#370617]"
                } cursor-pointer`}
                onClick={() => handleCopy(file.secure_url)}
              >
                Copy
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
