"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

interface IMainProps {
  isUploaded: boolean;
  uploadedfilesUrls?: { secure_url: string; display_name: string }[];
  uploadCount?: number;
  fileName?: string;
}

const initialState: IMainProps = {
  isUploaded: false,
  uploadedfilesUrls: [],
  uploadCount: 0
};

export const Body = () => {
  const [state, setState] = useState(initialState);

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
              uploadCount: prev.uploadCount ? prev.uploadCount + 1 : 1,
              console: console.log("results", resultsInfo.display_name)
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
              className="text-[#4f5d75] bg-[#bfc0c0] hover:bg-[#ffffff] text-[25px] focus:outline-none focus:ring-4 focus:ring-gray-300 font-normal rounded-lg px-7 py-3.5 me-3 "
              onClick={() => open()}
            >
              {state.uploadCount === 0 ? "Upload File" : "Upload More"}
            </button>
          );
        }}
      </CldUploadWidget>

      {state.isUploaded && (
        <div className=" text-[32px] h-auto p-5 w-[95vw] bg-[#bfc0c0]">
          {state.uploadedfilesUrls?.map((file, index) => (
            <div
              key={index}
              className="sm:flex   justify-between p-3 h-auto w-auto text-[24px]  mb-4"
            >
              <div className="font-normal text-[#2d3142]">
                {file.display_name}
              </div>
              <div className="font-normal text-[#4f5d75]">
                {file.secure_url}
              </div>
              <div></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
