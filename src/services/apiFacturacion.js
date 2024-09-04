import { AxiosError} from 'axios'
import instance from './baseApi'

const addClient = async (rfc, nombreCliente, nombreEmpresa) => {
    try {
      const clientData = {
        rfc,
        nombreCliente,
        nombreEmpresa
      }
      const clientResponse = await axios.post(
        'https://binteapi.com:8085/src/panel-multifacturas/add_client.php',
        clientData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      if (clientResponse.status !== 200) {
        throw new Error('Error al sincronizar con la API de facturación');
      }
    } catch (error) {
      console.error('Error en la sincronización con la API de facturación:', error);
      throw error;
    }
  };
  
  const getDataApiSsusy =async (schoolData) => {
    const { rfc, name, razon_sat } = schoolData;
  
    try {
      await addClient(rfc, razon_sat, name);
    } catch (error) {
      console.error('Error sincronizando con APIs:', error);
    }
  };
  
  export { getDataApiSsusy };