# Resumen del Proyecto

Contrato desplegado en la red de  zksync Sepolia Testnet.

link de la dapp: https://main.d3175wwe2xt4iw.amplifyapp.com/registro

El  contrato permite a los usuarios crear recetas médicas en el formato W3C. En esta instancia, el contrato inteligente asociado al proyecto proporciona todas las funciones necesarias como públicas para que los usuarios puedan probar las distintas funcionalidades.

## Funcionamiento

### Llenar el Formulario:

El usuario llena un formulario con la información requerida para la receta médica, que incluye detalles como el medicamento, el doctor, el paciente, las indicaciones, la fecha de vencimiento y si la receta ha sido dispensada.

### Crear la Receta en Formato Credencial Verificable:

Una vez completado el formulario, la información se organiza en un formato de credencial verificable según las especificaciones del W3C.

### Subir a IPFS:

El JSON estructurado de la credencial verificable se sube a la red IPFS (InterPlanetary File System) para su almacenamiento descentralizado.

### Enviar al Contrato:

- El URI generado por la subida a IPFS se envía al contrato inteligente asociado.
- El contrato codifica y guarda el URI encriptado en la blockchain.

### Creación de la Receta como Token NFT:

Se crea una nueva instancia de la receta como un token no fungible (NFT) en el contrato inteligente.

### Buscar y Obtener Recetas:

Los usuarios pueden buscar recetas ingresando el id del token.

### Obtener Receta Completa en Formato Credencial Verificable:

- Se llama a la función del contrato `obtenerUri()` si se cumple el requisito (`CredencialesCifradas[urlHash][msg.sender]`), entonces se devuelve el URI sin encriptar y se puede obtener la credencial verificable asociada a esa receta.

![Imagen Placeholder](https://archivos2.s3.sa-east-1.amazonaws.com/Captura+de+pantalla+(138).png)

