interface SelectedFilesProps{
  selectedFiles: File[];
}

function SelectedFiles({ selectedFiles }: SelectedFilesProps) {
  return (
    <div className='showFiles'>
      {selectedFiles.length > 0 && (
        <div>
          <p>Selected Files:</p>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SelectedFiles;
