import { Button } from 'react-bootstrap';

interface UploadHistoryProps{
  showUploadHistory: boolean;
  uploadHistory: string[];
  toggleUploadHistory: () => void;
}

function UploadHistory({ showUploadHistory, uploadHistory, toggleUploadHistory }: UploadHistoryProps) {
  return (
    <div className='container history-container tc'>
      <Button variant='secondary' onClick={toggleUploadHistory}>
        View History
      </Button>
      {showUploadHistory && (
        <div className='upload-history'>
          {uploadHistory.length > 0 ? (
            <ul>
              {uploadHistory.slice().reverse().map((historyItem, index) => (
                <li key={index}>{historyItem}</li>
              ))}
            </ul>
          ) : (
            <p>No Upload History</p>
          )}
        </div>
      )}
    </div>
  );
}

export default UploadHistory;
