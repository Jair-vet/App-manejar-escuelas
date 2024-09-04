import { useState, useEffect } from 'react'

import SchoolsService from '@/services/schools.service'

const useSearchUsersSchoolHandling = () => {
  const [usersSearch, setUsersSearch] = useState([])
  const [isSearch, setIsSearch] = useState(false)

  const search = async (schoolId, value) => {
    if (value === undefined && value === '') {
      setIsSearch(false)
      setUsersSearch([])
      return
    }
    setIsSearch(true)
    const response = await SchoolsService.searchUsersBySchool(schoolId, value)
    setUsersSearch(response)
  }

  useEffect(() => {
    // Limpia
    return () => {
      setUsersSearch([])
      setIsSearch(false)
    }
  }, [])

  return {
    usersSearch,
    setUsersSearch,
    isSearch,
    search
  }
}

export default useSearchUsersSchoolHandling
