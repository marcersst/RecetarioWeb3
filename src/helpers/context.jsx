import { useState, createContext, useContext } from 'react';
import { ethers } from 'ethers';
import Swal from 'sweetalert2';
import abi from './abi.json';

const Context = createContext();

const ContratoProvider = ({ children }) => {
    const [contrato, setContrato] = useState(null);
    const [account, setAccount] = useState(null);


    const conectarContrato = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                throw new Error('MetaMask no está instalado o no se detecta.');
            }

            const networkId = await ethereum.request({ method: 'eth_chainId' });
            const supportedNetwork = networkId === "0x12c";
            if (!supportedNetwork) {
                Swal.fire("Por favor conectate a la red Sksync!");
                return;
            }

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts.length === 0) {
                throw new Error('No se encontraron cuentas en MetaMask.');
            }
            setAccount(accounts[0]);

            const contractAddress = '0x4943A6CF0423882d0aBf04A045144e1899bcfBE4';
            const contractABI = abi;

            ethereum.on('accountsChanged', (newAccounts) => {
                if (newAccounts.length > 0) {
                    setAccount(newAccounts[0]);
                } else {
                    setAccount(null);
                }
            });

                const provider = new ethers.BrowserProvider(ethereum)
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(contractAddress, contractABI, signer);

                setContrato({ provider, signer, contract });
                
                

        } catch (error) {
            Swal.fire('Error al conectar con MetaMask', error.message, 'error');
        }
    };

    return (
        <Context.Provider value={{ conectarContrato, account, contrato }}>
            {children}
        </Context.Provider>
    );
};

const useContrato = () => useContext(Context);

export { ContratoProvider, useContrato };
