export const subirJSON = async (metadata) => {
    const JWT= process.env.VITE_PINATA_JWT
    
      try {
        const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${JWT}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(metadata),
        });
        const resData = await res.json();
        console.log(resData);
        return resData.IpfsHash;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    