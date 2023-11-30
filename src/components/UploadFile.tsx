import { useState, useEffect } from 'react';
import ApiSelector from './ApiSelector';
import FileInput from './FileInput';
import DragAndDrop from './DragAndDrop';
import SelectedFiles from './SelectedFiles';
import UploadButton from './UploadButton';
import AlertMessage from './AlertMessage';
import UploadHistory from './UploadHistory';
import LoadingSpinner from './LoadingSpinner';

export default function UploadFile(): React.ReactElement {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [responseText, setResponseText] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isDraggingOverArea, setIsDraggingOverArea] = useState<boolean>(false);
  const [apiUrl, setApiUrl] = useState<string>('sandbox');
  const [showUploadHistory, setShowUploadHistory] = useState<boolean>(false);
  const [uploadHistory, setUploadHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Load upload history from localStorage when the component mounts
    const storedHistory = localStorage.getItem('uploadHistory');
    const history = storedHistory ? JSON.parse(storedHistory) : [];
    setUploadHistory(history);
  }, []);

  useEffect(() => {
    // Clear the messages when isLoading becomes true
    if (isLoading) {
      setErrorMessage('');
      setResponseText('');
    }
  }, [isLoading]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
    setResponseText(''); // Clears the success message
    setErrorMessage(''); // Clears the error message
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOverArea(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOverArea(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOverArea(false);
    setErrorMessage('');
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(files);
    setResponseText('');
  };

  const handleSubmit = async () => {
    if (selectedFiles.length === 0) {
      setErrorMessage('Please select at least one file');
      return;
    }

    setIsLoading(true);

    let url: string, apiKey;

    const headers: Record<string, string> = {
      'Ocp-Apim-Subscription-Key': apiKey || '',
    };

    if (apiUrl === 'sandbox') {
      url = 'http://ndlwebdevcon02:8080/mapsapiproxy/';
      apiKey = 'generic-api-key';
    } else if (apiUrl === 'production') {
      url = 'http://ndlwebdevcon02:8080/mapsapiproxy/';
      apiKey = 'generic-api-key';
    }

    // Local/Dev/Production Environments (keys removed)

    // if(window.location.port === '8080' && window.location.hostname === 'ndlwebdevcon02') {
    //   // Call test API proxy endpoint if the built script is loaded from ndlwebdevcon02 on port 8080 - e.g. at http://ndlwebdevcon02:8080/maps-file-upload/
    //   if (apiUrl === 'sandbox') {
    //     url = 'http://ndlwebdevcon02:8080/mapsapiproxy/';
    //     apiKey = 'generic-api-key';
    //   } else if (apiUrl === 'production') {
    //     url = 'http://ndlwebdevcon02:8080/mapsapiproxy/';
    //     apiKey = 'generic-api-key';
    //   }
    // } else if(window.location.port === '8081' && window.location.hostname === 'localhost') {
    //   // Call test API proxy endpoint if the built script is loaded from localhost on port 8081 - e.g. at http://localhost:8081/maps-file-upload/
    //   if (apiUrl === 'sandbox') {
    //     url = 'http://localhost:8081/mapsapiproxy/';
    //     apiKey = 'generic-api-key';
    //   } else if (apiUrl === 'production') {
    //     url = 'http://localhost:8081/mapsapiproxy/';
    //     apiKey = 'generic-api-key';
    //   }
    // } else if(window.location.hostname === 'localhost') {
    //   // Call endpoints directly if script loaded from dev URL - http://localhost:30000/maps-file-upload/
    //   if (apiUrl === 'sandbox') {
    //     url = 'https://sb1pdpapim.moneyhelper.org.uk/debt-sandbox/FileUpload';
    //     apiKey = 'generic-api-key';
    //   } else if (apiUrl === 'production') {
    //     url = 'https://sb1pdpapim.moneyhelper.org.uk/prod-debtadvisory/FileUpload';
    //     apiKey = 'generic-api-key';
    //   }
    // } else {
    //   // Call live API proxy endpoint if the built script is loaded from live URL - http://ndlwebdevcon02/maps-file-upload/
    //   if (apiUrl === 'sandbox') {
    //     url = 'http://ndlwebdevcon02/mapsapiproxy/';
    //     apiKey = 'generic-api-key';
    //   } else if (apiUrl === 'production') {
    //     url = 'http://ndlwebdevcon02/mapsapiproxy/';
    //     apiKey = 'generic-api-key';
    //   }
    // }

    const formData = new FormData();

    selectedFiles.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    let response;

    try {
      const uploadPromises = selectedFiles.map(async (file, index) => {
        const formData = new FormData();
        formData.append(`file${index}`, file);
    
        response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: formData,
        });
    
        if (!response.ok) {
          const errorMessage = `File upload was unsuccessful: ${response.statusText} - Request ID: ${response.headers.get('request-id')}`;
          throw new Error(errorMessage);
        }
    
        const responseJson = await response.json();
    
        // Handle success for this specific file
        return `${file.name} uploaded successfully - Status: ${response.status} - Request ID: ${response.headers.get('request-id')}`;
      });
    
      const successMessages = await Promise.all(uploadPromises);
    
      // Update history with success messages for each file
      const updatedHistory = [...uploadHistory, ...successMessages];
      setUploadHistory(updatedHistory);
    
      localStorage.setItem('uploadHistory', JSON.stringify(updatedHistory));
    
      // Concatenate all success messages
      setResponseText(successMessages.join('\n'));
    } catch (error: any) {
      console.error('There was a problem with the fetch operation:', error);
      setErrorMessage(`${error.message}`);
    
      // Update history with an error message for each file
      const errorMessages = selectedFiles.map(() => {
        return `File upload was unsuccessful: ${error.message}`;
      });
    
      const updatedHistory = [...uploadHistory, ...errorMessages];
      setUploadHistory(updatedHistory);
    
      localStorage.setItem('uploadHistory', JSON.stringify(updatedHistory));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='api-box container'>
        <ApiSelector apiUrl={apiUrl} handleApiChange={(e) => setApiUrl(e.target.value)} />
        <FileInput handleFileChange={handleFileChange} />
        <DragAndDrop
          isDraggingOverArea={isDraggingOverArea}
          handleDragEnter={handleDragEnter}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          handleDrop={handleDrop}
        />
        <SelectedFiles selectedFiles={selectedFiles} />
        <UploadButton handleSubmit={handleSubmit} />
        {isLoading && <LoadingSpinner />}
        <AlertMessage errorMessage={errorMessage} responseText={responseText} />
      </div>
      <UploadHistory
        showUploadHistory={showUploadHistory}
        uploadHistory={uploadHistory}
        toggleUploadHistory={() => setShowUploadHistory(!showUploadHistory)}
      />
    </>
  );
}
