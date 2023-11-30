import { DragEvent } from "react";

interface DragAndDropProps{
  isDraggingOverArea: boolean;
  handleDragEnter: (event: DragEvent<HTMLDivElement>) => void;
  handleDragOver: (event: DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (event: DragEvent<HTMLDivElement>) => void;
  handleDrop: (event: DragEvent<HTMLDivElement>) => void;
}

function DragAndDrop({ isDraggingOverArea, handleDragEnter, handleDragOver, handleDragLeave, handleDrop }: DragAndDropProps) {
  return (
    <label htmlFor='file-upload'>
      <div
        className={`dragdrop ${isDraggingOverArea ? 'drag-over' : ''}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p>DRAG AND DROP YOUR FILES HERE OR BROWSE</p>
      </div>
    </label>
  );
}

export default DragAndDrop;
