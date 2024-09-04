import { useState, useEffect } from 'react'

import SchoolsMattersService from '@/services/schoolsMatters.service'

const useMattersSchoolHandling = () => {
  const [matters, setMatters] = useState([])

  const loadMatters = async (schoolId, level) => {
    const response = await SchoolsMattersService.getMattersBylevel(schoolId, level)
    setMatters(response)
  }

  useEffect(() => {
    // Limpia
    return () => {
      setMatters([])
    }
  }, [])

  return {
    matters,
    setMatters,
    loadMatters
  }
}

export default useMattersSchoolHandling
