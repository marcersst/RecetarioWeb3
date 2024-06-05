// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Recetario is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _Recetas;

    constructor() ERC721("Recetario", "RECETA") {}

    struct Receta {
        uint256 idReceta;
        string medicamento;
        address doctor;
        bytes32 hashDIDPaciente;
        string fechaCreacion;
        bool dispensada;
    }

    struct credencialVerificable {
        string context;
        string _type;
        string issuer;
        string issuanceDate;
        string did;
        Receta credentialSubject;
    }

    mapping(uint256 => credencialVerificable) public credenciales;

    function generarRecetaCV(
        string memory medicamento,
        address doctor,
        string memory did,
        string memory fechaActual,
        bool dispensada
    ) public returns (credencialVerificable memory) {
        uint256 idReceta = _Recetas.current();
        _Recetas.increment();
        _safeMint(msg.sender, idReceta);

        bytes32 _hashDIDPaciente = keccak256(abi.encodePacked(did));
        
        Receta memory nuevaReceta = Receta({
            idReceta: idReceta,
            medicamento: medicamento,
            doctor: doctor,
            hashDIDPaciente: _hashDIDPaciente,
            fechaCreacion: fechaActual,
            dispensada: dispensada
        });

        credencialVerificable memory nuevaCredencial = credencialVerificable({
            context: "https://www.w3.org/2018/credentials/v1",
            _type: "VerifiableCredential",
            issuer: "https://hospitalweb3/issuers",
            issuanceDate: fechaActual,
            did: did,
            credentialSubject: nuevaReceta
        });

        credenciales[idReceta] = nuevaCredencial;

        return nuevaCredencial;
    }

    function obtenerRecetaEnCV(uint256 recetaId) public view returns (credencialVerificable memory) {
        return credenciales[recetaId];
    }

    function burn(uint256 _recetaId) public {
        _burn(_recetaId);
        delete credenciales[_recetaId];
    }

}
