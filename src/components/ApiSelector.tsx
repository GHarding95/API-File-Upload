import { ChangeEvent } from "react";

interface ApiSelectorProps{
  apiUrl: string;
  handleApiChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

function ApiSelector({ apiUrl, handleApiChange }: ApiSelectorProps) {
  return (
    <div className='api-container'>
      <label htmlFor='api-selector'>Select API:</label>
      <select id='api-selector' value={apiUrl} onChange={handleApiChange}>
      <option value='sandbox'>Sandbox</option>
        <option value='production'>Production</option>        
      </select>
    </div>
  );
}

export default ApiSelector;
