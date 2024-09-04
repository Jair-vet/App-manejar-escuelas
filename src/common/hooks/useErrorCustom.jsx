import { useState } from 'react'
// import toast from 'react-hot-toast'

// import { ApiError, ConnectionError } from '../erros/errors'

const useErrorHandling = () => {
  const [errorMessage, setErrorMessage] = useState('')

  const handleErrors = (error) => {
    setErrorMessage(error.message.toString())

    // if (error instanceof ConnectionError) {
    //   setErrorMessage('' + error.message.toString())
    //   // toast.error('Error de conexión: ' + error.message.toString())
    // } else if (error instanceof ApiError) {
    //   // toast.error('Respuesta de server:' + error.message.toString())
    //   setErrorMessage('' + error.message.toString())
    //   // if (error.statusCode === 404) {
    //   //   setErrorMessage('Usuario no encontrado: ' + error.message.toString())
    //   // } else if (error.statusCode === 500) {
    //   //   setErrorMessage('Error de servidor: ' + error.message.toString())
    //   // } else {
    //   //   setErrorMessage('Error de servicio: ' + error.message.toString())
    //   // }
    // } else {
    //   setErrorMessage(error.message.toString())
    // }
  }
  // useEffect(() => {
  //   // Limpia el mensaje de error cuando el componente se desmonta
  //   return () => {
  //     setErrorMessage('')
  //   }
  // }, [])
  const clearErrorMessage = () => {
    setErrorMessage('')
  }

  return {
    errorMessage,
    handleErrors,
    clearErrorMessage
  }
}

export default useErrorHandling
