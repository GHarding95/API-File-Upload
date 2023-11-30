import { Button } from 'react-bootstrap';
import { MouseEvent } from 'react';

interface UploadButtonProps{
  handleSubmit: (event: MouseEvent<HTMLButtonElement>) => void;
}

function UploadButton({ handleSubmit }: UploadButtonProps) {
  return (
    <div className='upload-btn-container'>
      <Button variant="primary" onClick={handleSubmit}>
        Upload
      </Button>
    </div>
  );
}

export default UploadButton;
