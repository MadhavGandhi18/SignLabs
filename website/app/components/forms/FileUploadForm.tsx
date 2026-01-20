"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";

type FileType = "video" | "audio" | "document";

interface FileUploadFormProps {
  defaultType?: FileType;
  onUploadComplete?: (filePath: string) => void;
}

const ALLOWED_MIME_TYPES: Record<FileType, string[]> = {
  video: ["video/mp4", "video/quicktime"],
  audio: ["audio/mpeg", "audio/wav", "audio/x-m4a"],
  document: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ],
};

const MAX_SIZE_BYTES: Record<FileType, number> = {
  video: 100 * 1024 * 1024,
  audio: 50 * 1024 * 1024,
  document: 10 * 1024 * 1024,
};

function acceptFor(type: FileType) {
  if (type === "video") return "video/*";
  if (type === "audio") return "audio/*";
  return "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain";
}

export default function FileUploadForm({
  defaultType = "video",
  onUploadComplete,
}: FileUploadFormProps) {
  const [selectedFileType, setSelectedFileType] =
    useState<FileType>(defaultType);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePickFile = () => {
    setError("");
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const allowed = ALLOWED_MIME_TYPES[selectedFileType];
    if (!allowed.includes(selectedFile.type)) {
      setFile(null);
      setUploadSuccess(false);
      setError(`Invalid file format. Allowed: ${allowed.join(", ")}`);
      return;
    }

    const maxSize = MAX_SIZE_BYTES[selectedFileType];
    if (selectedFile.size > maxSize) {
      setFile(null);
      setUploadSuccess(false);
      setError(`File too large. Max ${(maxSize / (1024 * 1024)).toFixed(0)}MB`);
      return;
    }

    setFile(selectedFile);
    setError("");
    setUploadSuccess(false);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setIsUploading(true);
      setError("");
      setUploadProgress(10);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileType", selectedFileType);

      setUploadProgress(30);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      setUploadProgress(70);

      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Upload failed");

      setUploadProgress(100);
      setUploadSuccess(true);
      if (onUploadComplete && data?.filePath) onUploadComplete(data.filePath);

      setTimeout(() => {
        setFile(null);
        setUploadProgress(0);
        setUploadSuccess(false);
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to upload file. Please try again."
      );
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">
      <div className="flex flex-wrap gap-3 justify-center">
        {(["video", "audio", "document"] as const).map((t) => (
          <button
            key={t}
            onClick={() => {
              setSelectedFileType(t);
              setFile(null);
              setError("");
              setUploadProgress(0);
              setUploadSuccess(false);
            }}
            className={`px-4 py-2 rounded-lg transition ${
              selectedFileType === t
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept={acceptFor(selectedFileType)}
      />

      <div
        role="button"
        tabIndex={0}
        onClick={handlePickFile}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handlePickFile();
        }}
        className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-primary transition"
      >
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p className="mt-2 text-sm text-gray-600">
          Click to select a {selectedFileType} file
        </p>
        <p className="mt-1 text-xs text-gray-500">
          {selectedFileType === "video"
            ? "MP4, MOV up to 100MB"
            : selectedFileType === "audio"
              ? "MP3, WAV, M4A up to 50MB"
              : "PDF, DOC, DOCX, TXT up to 10MB"}
        </p>
      </div>

      {file && (
        <div className="text-sm text-gray-700 text-center">
          Selected: <span className="font-medium">{file.name}</span> (
          {(file.size / (1024 * 1024)).toFixed(2)}MB)
        </div>
      )}

      {error && <div className="text-red-500 text-sm text-center">{error}</div>}

      {file && !isUploading && !uploadSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <Button onClick={handleUpload} variant="primary">
            Upload {selectedFileType}
          </Button>
        </motion.div>
      )}

      {isUploading && (
        <div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 text-center mt-2">
            Uploading... {uploadProgress}%
          </p>
        </div>
      )}

      {uploadSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-green-500 text-center"
        >
          <svg
            className="w-6 h-6 mx-auto text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <p>Upload successful!</p>
        </motion.div>
      )}
    </div>
  );
}
