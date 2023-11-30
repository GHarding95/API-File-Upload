import { ChangeEvent } from "react";

interface FileInputProps{
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function FileInput({ handleFileChange }: FileInputProps) {
  return (
    <input id='file-upload' type='file' onChange={handleFileChange} multiple />
  );
}

export default FileInput;
