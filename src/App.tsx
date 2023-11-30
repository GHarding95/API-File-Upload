import UploadFile from './components/UploadFile';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <div className='content-container'>      
        <h1 className='tc'>API File Upload</h1>    
          <UploadFile/>
        </div>
      </ChakraProvider>
    </div>
  );
}

export default App;
