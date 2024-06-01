// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PropiedadAutomotor is  ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _AutoIds;
    
    mapping(uint => address) public dniToWallet; 
    mapping(address => uint) public dnideWallet; 
    mapping (uint  => uint) public propietarioAuto;
    mapping(address => bool) public billeteraRegistrada; 


    constructor() ERC721("AutoToken", "AUTO") {}

    function safeMint(uint dni, string memory uri) public returns (uint256) {
        require(dniToWallet[dni]!=address(0) && dniToWallet[dni]==msg.sender,"problemas con la autentificacion del dni");
        _AutoIds.increment();
        uint256 autoId = _AutoIds.current();
        _safeMint(msg.sender, autoId);
        _setTokenURI(autoId, uri);
        propietarioAuto[autoId]=dni;
        return autoId;
    }

    function _transferFrom(address to, uint256 _autoID, uint dni) public {
        require(billeteraRegistrada[to]==true,"la billetera no esta registrada");
        require(dniToWallet[dni]!=msg.sender);
        require(dniToWallet[dni]==to,"la billetera destino no esta registrada con el dni correspondiente");
        require(dniToWallet[dni]!=address(0),"problemas con la autentificacion del dni");
        super.transferFrom(msg.sender, to, _autoID);
        propietarioAuto[_autoID]=dni;
    }

     function _burn(uint256 _autoID)  internal override {
      super._burn(_autoID);
        delete propietarioAuto[_autoID];
    }

    function quemarNFT(uint256 _autoId) public onlyOwner {
        _burn(_autoId);
    }


    function registrardni(uint dni) public {
        require(dniToWallet[dni] == address(0), "Este DNI ya esta registrado.");
        require(!billeteraRegistrada[msg.sender], "esta billetera ya esta registrada");
        dniToWallet[dni] = msg.sender;
        dnideWallet[msg.sender] = dni;
        billeteraRegistrada[msg.sender]=true;
    }

    function transferFrom(address from, address to, uint256 _autoID) public pure override(ERC721) {
    revert("usar funcion del contrato");
}
}
