import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { clinica } from "../assets";
import { useContrato } from './context';

export const Navbar = () => {
  const { conectarContrato, account } = useContrato();
  const [wallet, setWallet] = useState("");
  const [desplegar, setDesplegar] = useState(false);

  const Conectar2 = () => {
    conectarContrato();
  };

  useEffect(() => {
    if (account) {
      const walletRecortada = `${account.substring(0, 6).toUpperCase()}...${account.substring(account.length - 4).toUpperCase()}`;
      setWallet(walletRecortada);
    }
  }, [account]);

  return (
    <>
      <nav className="hidden md:block bg-zinc-200 shadow shadow-gray-300">
        <div className="container mx-auto md:h-16 h-28 px-4 flex items-center justify-between flex-wrap md:flex-nowrap">
          <div className="flex items-center">
            <img src={clinica} alt="1" className="h-auto max-h-16"/>
          </div>
          <div className="flex-grow text-gray-500 w-full md:w-auto text-lg">
            <ul className="flex font-semibold justify-center space-x-8">
              <li>
                <NavLink
                  to="/registro"
                  className={({ isActive }) => (isActive ? "text-blue-500" : "text-gray-500")}
                >
                  Registro
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/misrecetas"
                  className={({ isActive }) => (isActive ? "text-blue-500" : "text-gray-500")}
                >
                  Buscar Receta
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/obtenercv"
                  className={({ isActive }) => (isActive ? "text-blue-500" : "text-gray-500")}
                >
                  Obtener RecetaCV
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="order-2">
            <button
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-gray-50 rounded-xl flex items-center"
              onClick={Conectar2}
            >
              {!account ? "Conectar" : wallet}
            </button>
          </div>
        </div>
      </nav>

      <nav className="block md:hidden bg-zinc-200 shadow shadow-gray-300">
        <div className="h-16 mx-auto px-4 container flex items-center justify-between">
          <button
            className="text-gray-500"
            onClick={() => setDesplegar(!desplegar)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        {desplegar && (
          <div className="px-4 pb-4">
            <ul className="flex flex-col space-y-2">
              <li>
                <NavLink
                  to="/registro"
                  className={({ isActive }) => (isActive ? "text-blue-500" : "text-gray-500")}
                >
                  Registro
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/misrecetas"
                  className={({ isActive }) => (isActive ? "text-blue-500" : "text-gray-500")}
                >
                  Buscar Receta
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/obtenercv"
                  className={({ isActive }) => (isActive ? "text-blue-500" : "text-gray-500")}
                >
                  Obtener RecetaCV
                </NavLink>
              </li>
            </ul>
            <div className="mt-4">
              <button
                className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-gray-50 rounded-xl"
                onClick={Conectar2}
              >
                {!account ? "Conectar" : wallet}
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
