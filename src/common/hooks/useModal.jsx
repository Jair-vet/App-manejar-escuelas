import { useState, useEffect } from 'react'

const useOpenModalHandling = () => {
  const [viewModal, setViewModal] = useState(false)

  const openOrClose = () => {
    const newValue = !viewModal
    setViewModal(newValue)
  }

  useEffect(() => {
    // Limpia
    return () => {
      setViewModal(false)
    }
  }, [])

  return {
    viewModal,
    openOrClose
  }
}

export default useOpenModalHandling
