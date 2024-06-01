import { useState } from "react";
import { useContrato } from "../helpers/context";
import axios from "axios";

export const VerCredencial = () => {
  const [hash, setHash] = useState("");
  const [credencial, setCredencial] = useState(null);
  const [error, setError] = useState(null);
  const { contrato, account } = useContrato();

  const obtenerCredencial = async () => {
    try {
      const uri = await contrato.contract.obtenerUri(hash);
      if (uri) {
        const response = await axios.get(`https://ipfs.io/ipfs/${uri}`);
        setCredencial(response.data);
        setError(null);
      } else {
        setError("No se encontró el URI para el hash especificado.");
        setCredencial(null);
      }
    } catch (error) {
      console.error("Error obteniendo el URI:", error);
      setError("Error obteniendo el URI o la credencial.");
      setCredencial(null);
    }
  };

  const handleInputChange = (event) => {
    setHash(event.target.value);
  };

  const handleSearch = () => {
    if (hash) {
      obtenerCredencial();
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="w-full max-w-xs mb-4">
        <input
          type="text"
          value={hash}
          onChange={handleInputChange}
          placeholder="Ingrese el hash de la credencial"
          className="input input-bordered w-full max-w-xs rounded-md p-2"
        />
        <button onClick={handleSearch} className="btn-primary w-full mt-2 rounded-md p-2 bg-blue-500 hover:bg-blue-600 text-white">
          Ver Receta CV
        </button>
      </div>
      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}
      {credencial && (
        <div className="mx-2 my-2">
          <div className="card bg-white shadow-md rounded-md">
            <div className="card-body p-4">
              <h2 className="card-title text-lg font-semibold mb-2">Credencial Verificable:</h2>
              <pre className="whitespace-pre-wrap break-words">
                {JSON.stringify(credencial, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
