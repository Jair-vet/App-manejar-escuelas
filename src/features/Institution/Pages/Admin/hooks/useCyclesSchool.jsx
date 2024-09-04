import { useState, useEffect } from 'react'

import SchoolsCyclesService from '@/services/schoolsCycles.service'

const useCyclesSchoolHandling = () => {
  const [cycles, setCycles] = useState([])

  const load = async (schoolId, page) => {
    const response = await SchoolsCyclesService.getCycles(schoolId, page, [1, 2, 3])
    setCycles(response)
  }

  useEffect(() => {
    // Limpia
    return () => {
      setCycles([])
    }
  }, [])

  return {
    cycles,
    setCycles,
    load
  }
}

export default useCyclesSchoolHandling
