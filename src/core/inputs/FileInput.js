import React, { useEffect, useMemo, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { prepareImagePath } from "@/helpers/functions";
import { Clear } from "@mui/icons-material";

const allowedTypes = ["png", "jpg", "jpeg", "svg", "webp"];

const FileInput = ({
  label,
  image,
  handleChange,
  allowPreviewImage,
  previousImage,
  error,
}) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const displayAllowedTypes = useMemo(() => {
    let concatTypes = "";
    allowedTypes.forEach((type) => {
      concatTypes += `.${type}, `;
    });
    return concatTypes.slice(0, -2);
  }, []);

  const onDelete = () => {
    setPreviewImage(null);
    setFileName("");
    if (handleChange) {
      handleChange(null);
    }
  };

  const onChange = async (file) => {
    setFileName(file.name);
    setPreviewImage(URL.createObjectURL(file));
    if (handleChange) {
      // const convertedFile = await fileToBase64(file);
      handleChange(file);
    }
  };

  useEffect(() => {
    if (!!previousImage && !previewImage) {
      setPreviewImage(prepareImagePath(previousImage));
    }
  }, [previousImage]);

  useEffect(() => {
    if (!image) {
      setPreviewImage(null);
    }
  }, [image]);

  return (
    <div className="flex flex-col flex-1 justify-center">
      <FileUploader
        name="file"
        types={allowedTypes}
        handleChange={onChange}
        multiple={false}
      >
        <div className="relative flex border rounded-md border-gray-300 border-dashed border-2 bg-gray-100 hover:opacity-75 hover:border-gray-400 justify-center cursor-pointer">
          <div className="flex my-5">
            <div className="text-cyan-900">{label}</div>
          </div>
        </div>
      </FileUploader>
      {!!error && <span className="text-red-600 text-sm py-1">{error}</span>}
      {!!previewImage && (
        <div className="relative flex border p-5 bg-gray-100 mt-3 rounded-md">
          {allowPreviewImage ? (
            <div>
              <div className="flex h-12 justify-center mb-1">
                <img
                  className="shadow-md hover:scale-110"
                  src={previewImage}
                  alt="logo"
                />
              </div>
              <div className="items-center px-5 text-xs break-words">
                {fileName}
              </div>
            </div>
          ) : (
            <div className="px-5 text-xs break-words">{fileName}</div>
          )}
          <div className="absolute top-2 right-2">
            <Clear
              className="h-5 text-gray-500 hover:cursor-pointer rounded-full hover:text-primary-600 hover:bg-gray-200"
              onClick={onDelete}
            />
          </div>
        </div>
      )}
      {!previewImage && (
        <div className="flex justify-end text-xs text-gray-500 text-justify font-normal leading-5 mb-4 mt-1">
          Allowed formats
          <span className="text-primary-700 ml-1"> {displayAllowedTypes}.</span>
        </div>
      )}
    </div>
  );
};

export default FileInput;
