import { useState, useEffect } from "react";
import ReactJson from 'react-json-view';

const ModelList = () => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch("/api/models");
        const data = await response.json();
        setModels(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchModels();
  }, []);

  return (
    <div>
      <h3>Models</h3>
      <ReactJson src={models} />
    </div>
  );
};

export default ModelList;
