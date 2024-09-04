import { useState, useEffect } from 'react'

import SchoolsService from '@/services/schools.service'

const useInvoicesSchoolHandling = () => {
  const [invoices, setInvoices] = useState([])

  const loadInvoices = async (idSchool) => {
    // console.log(idSchool);
    
    const response = await SchoolsService.getAllInvoices(idSchool)
    setInvoices(response)
  }

  useEffect(() => {
    // Limpia
    return () => {
      setInvoices([])
    }
  }, [])

  return {
    invoices,
    setInvoices,
    loadInvoices
  }
}

export default useInvoicesSchoolHandling
