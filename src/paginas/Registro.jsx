import Swal from 'sweetalert2';
import "animate.css";
import { useContrato } from '../helpers/context';
import { subirJSON } from '../helpers/subirJSON';
import { useState } from 'react';

export const Registro = () => {
  const [recetaData, setRecetaData] = useState({
    medicamento: "",
    doctor: "",
    did: "",
    fechaActual: "",
    dispensada: false,
    indicaciones: "",
    fechaVencimiento: ""
  });

  const { contrato, account } = useContrato();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRecetaData(prevData => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const generarReceta = async (e) => {
    e.preventDefault();

    if (!contrato || !account) {
      await Swal.fire({
        title: "No estás conectado!",
        icon: "error"
      });
      return;
    }

    Swal.fire({
      title: 'Generando Receta...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const { medicamento, doctor, did, fechaActual, dispensada, fechaVencimiento, indicaciones } = recetaData;

      const CredencialVerificable = {
        "@context": [
          "https://www.w3.org/2018/credentials/v1",
          "https://example.com/healthcare/v1"
        ],
        "type": ["VerifiableCredential", "Receta Medica"],
        "issuer": "http://HospitalWEB3.org", 
        "issuanceDate": new Date().toISOString(),
        "credentialSubject": {
          "id": did, 
          "medicamento": medicamento,
          "indicaciones": indicaciones,
          "dispensada": dispensada,
          "vencimiento": fechaVencimiento
        }
      };

      const uri=subirJSON(CredencialVerificable)
      console.log(uri)



      const result = await contrato.contract.generarRecetaCV( medicamento,doctor,did,fechaActual, dispensada, uri);      
      console.log(result);
      
      Swal.fire("Receta Generada Correctamente!", "", "success");
      
      setRecetaData({
        medicamento: "",
        doctor: "",
        did: "",
        fechaActual: "",
        indicaciones:"",
        fechaVencimiento:"",
        dispensada: false
      });

    } catch (error) {
      console.error("Error al generar la receta:", error);
      Swal.fire('Error', 'Hubo un problema al generar la receta', 'error');
    }
  };

  return (
    <div className="bg-zinc-300 flex items-center justify-center px-10 py-10 animate__animated animate__fadeInDown">
      <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
        <div className="w-full py-10 px-10">
          <div className="text-center mb-10">
            <h1 className="font-bold text-4xl text-gray-900">Generar Receta</h1>
          </div>
          <form onSubmit={generarReceta}>
            <div className="mb-5">
              <label className="text-xs font-semibold px-1">Medicamento*</label>
              <input
                type="text"
                name="medicamento"
                value={recetaData.medicamento}
                required
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-5">
              <label className="text-xs font-semibold px-1">Doctor*</label>
              <input
                type="text"
                name="doctor"
                value={recetaData.doctor}
                required
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-5">
              <label className="text-xs font-semibold px-1">DID*</label>
              <input
                type="text"
                name="did"
                value={recetaData.did}
                required
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-5">
              <label className="text-xs font-semibold px-1">Fecha Actual*</label>
              <input
                type="text"
                name="fechaActual"
                value={recetaData.fechaActual}
                required
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-5">
              <label className="text-xs font-semibold px-1">Indicaciones</label>
              <textarea
                name="indicaciones"
                value={recetaData.indicaciones}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-5">
              <label className="text-xs font-semibold px-1">Fecha de Vencimiento</label>
              <input
                type="text"
                name="fechaVencimiento"
                value={recetaData.fechaVencimiento}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-5">
              <label className="text-xs font-semibold px-1">Dispensada</label>
              <input
                type="checkbox"
                name="dispensada"
                checked={recetaData.dispensada}
                onChange={handleChange}
                className="ml-2"
              />
            </div>
            <div className="mb-5">
              <button type="submit" className="block w-full bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                Generar Receta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};