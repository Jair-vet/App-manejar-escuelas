import CryptoJS from 'crypto-js'

const decrypt = (value) => {
  const phrase = import.meta.env.VITE_APP_PHRASE_ENCRYPT
  const bytes = CryptoJS.AES.decrypt(value, phrase)
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}

const encrypt = (value) => {
  const phrase = import.meta.env.VITE_APP_PHRASE_ENCRYPT
  const bytes = CryptoJS.AES.encrypt(JSON.stringify(value), phrase).toString()
  return bytes
}
const EncryptTools = {
  decrypt,
  encrypt
}

export default EncryptTools
