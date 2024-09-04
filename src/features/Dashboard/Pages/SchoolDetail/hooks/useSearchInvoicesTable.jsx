import { useState, useEffect } from 'react'

import SchoolsService from '@/services/schools.service'

const useSearchInvoicesSchoolHandling = () => {
  const [invoicesSearch, setInvoicesSearch] = useState([])
  const [isSearch, setIsSearch] = useState(false)

  const search = async (schoolId, value) => {
    // console.log(value);
    
    if (value === undefined || value === '') {
      setIsSearch(false)
      setInvoicesSearch([])
      return
    }
    setIsSearch(true)
    const response = await SchoolsService.searchInvoicesBySchool(schoolId, value)
    setInvoicesSearch(response)
    console.log(invoicesSearch);
    
  }

  useEffect(() => {
    // Limpia
    return () => {
      setInvoicesSearch([])
      setIsSearch(false)
    }
  }, [])

  return {
    invoicesSearch,
    setInvoicesSearch,
    isSearch,
    search
  }
}

export default useSearchInvoicesSchoolHandling
