import React from 'react';

interface FileUploadFormProps {
  onFileChange: (file: File) => void;
  onUpload: () => void;
}

const FileUploadForm: React.FC<FileUploadFormProps> = ({ onFileChange, onUpload }) => {
  return (
    <div className="p-4 border rounded max-w-md mx-auto mt-4">
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            onFileChange(e.target.files[0]);
          }
        }}
        className="mb-2 block w-full"
      />
      <button onClick={onUpload} className="bg-blue-500 text-white p-2 rounded w-full">
        Upload
      </button>
    </div>
  );
};

export default FileUploadForm;
