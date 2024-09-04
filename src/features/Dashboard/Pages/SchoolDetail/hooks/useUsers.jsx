import { useState, useEffect } from 'react'

import SchoolsService from '@/services/schools.service'

const useUsersSchoolHandling = () => {
  const [users, setUsers] = useState([])

  const loadUsers = async (schoolId) => {
    // console.log(schoolId);
    
    const response = await SchoolsService.getUserBySchool(schoolId)
    setUsers(response)
  }

  useEffect(() => {
    // Limpia
    return () => {
      setUsers([])
    }
  }, [])

  return {
    users,
    setUsers,
    loadUsers
  }
}

export default useUsersSchoolHandling
