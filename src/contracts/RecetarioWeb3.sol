// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract RecetarioWeb3 is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _Recetas;

    constructor() ERC721("Recetario", "RECETA") {
    _Recetas.increment();
    }

    struct Receta {
        uint256 idReceta;
        string medicamento;
        address doctor;
        bytes32 hashDIDPaciente;
        string fechaCreacion;
        bool dispensada;
        bytes32 recetaCV;
    }

    mapping(bytes32 => mapping(address => string)) private CredencialesCifradas;
    mapping(uint256 => Receta) public recetas;

    function cifrarUri(string memory url) internal returns (bytes32) {
        bytes32 uriHash = sha256(abi.encodePacked(url));
        CredencialesCifradas[uriHash][msg.sender] = url;
        return uriHash;
    }

    function obtenerUri(bytes32 urlHash) public view returns (string memory) {
        return CredencialesCifradas[urlHash][msg.sender];
    }

    function generarRecetaCV(
        string memory medicamento,
        address doctor,
        string memory did,
        string memory fechaActual,
        bool dispensada,
        string memory uri
    ) public returns (uint256) {
        uint256 idReceta = _Recetas.current();
        _safeMint(msg.sender, idReceta);
        _Recetas.increment();


        bytes32 hashDIDPaciente = sha256(abi.encodePacked(did));
        bytes32 recetaCV= cifrarUri(uri);

        recetas[idReceta] = Receta({
            idReceta: idReceta,
            medicamento: medicamento,
            doctor: doctor,
            hashDIDPaciente: hashDIDPaciente,
            fechaCreacion: fechaActual,
            dispensada: dispensada,
            recetaCV: recetaCV
        });

        return idReceta;
    }

    function burn(uint256 _recetaId) public {
        _burn(_recetaId);
        delete recetas[_recetaId];
    }

    function getReceta(uint256 recetaId) public view returns (
        uint256 id,
        string memory medicamento,
        address doctor,
        bytes32 hashDIDPaciente,
        string memory fechaCreacion,
        bool dispensada,
        bytes32 recetaCV
    ) {
        Receta memory respuesta = recetas[recetaId];
        return (
            respuesta.idReceta,
            respuesta.medicamento,
            respuesta.doctor,
            respuesta.hashDIDPaciente,
            respuesta.fechaCreacion,
            respuesta.dispensada,
            respuesta.recetaCV
        );
    }

    function dispensarReceta(uint256 recetaId) public {
        recetas[recetaId].dispensada = true;
    }
}
