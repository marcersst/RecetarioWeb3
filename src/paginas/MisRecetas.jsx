import { useEffect, useState } from "react";
import { useContrato } from "../helpers/context";
import { SinReceta } from "../helpers/SinReceta";

export const Misrecetas = () => {
  const [receta, setReceta] = useState(null);
  const [recetaId, setRecetaId] = useState("");
  const { contrato, account } = useContrato();

  const obtenerReceta = async (id) => {
    try {
      const result = await contrato.contract.getReceta(id)
      if (result.doctor !=="0x0000000000000000000000000000000000000000") {
        setReceta(result);
      } else {
        console.log("La receta con el ID especificado no existe.");
      }
    } catch (error) {
      console.error("Error obteniendo la receta:", error);
    }
  };

  useEffect(() => {}, [account]);

  const handleInputChange = (event) => {
    setRecetaId(event.target.value);
  };

  const handleSearch = () => {
    if (recetaId) {
      obtenerReceta(recetaId);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="w-full max-w-xs mb-4">
        <input
          type="text"
          value={recetaId}
          onChange={handleInputChange}
          placeholder="Ingrese el ID de la receta"
          className="input input-bordered w-full max-w-xs rounded-md p-2"
        />
        <button onClick={handleSearch} className="btn-primary w-full mt-2 rounded-md p-2 bg-blue-500 hover:bg-blue-600 text-white">
          Buscar Receta
        </button>
      </div>
      {receta!==null  ?  (
        <div className="mx-2 my-2">
          <div className="card bg-white shadow-md rounded-md">
            <div className="card-body p-4">
              <h2 className="card-title text-lg font-semibold mb-2">Receta:</h2>
              <p>Medicamento: {receta.medicamento}</p>
              <p>Doctor: {receta.doctor}</p>
              <p>Hash DID Paciente: {receta.hashDIDPaciente}</p>
              <p>Fecha de Creación: {receta.fechaCreacion}</p>
              <p>Dispensada: {receta.dispensada ? "Sí" : "No"}</p>
              <p>Receta Completa en CV: {receta.recetaCV}</p>

            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <SinReceta />
        </div>
      )}
    </div>
  );
};
