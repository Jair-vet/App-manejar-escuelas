import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

import { routesNamesDashboard } from '../../Routes/routesNames'

import { changeTitle } from '@/Redux/globalSlice'
import Search from '@/common/Components/Search'
import TableSchools from '@/common/Components/Tables/TablesSchool'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import SchoolsService from '@/services/schools.service'

const SchoolsPage = () => {
  const [page, setPage] = useState(1)
  const [schools, setSchools] = useState([])
  const [schoolsSearch, setSchoolsSearch] = useState([])
  const [isSearch, setIsSearch] = useState(false)

  const { handleErrors } = useErrorHandling()
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const init = async () => {
    try {
      dispatch(changeTitle({
        titleHeader: 'Instituciones'
      }))
      const response = await SchoolsService.getSchools(page)
      if (response.status === 200) {
        console.log(response.data.data.results)
        setSchools(response.data.data.results)
        setPage(3)
      }
    } catch (e) {
      console.log(e)
      handleErrors(e)
    }
  }

  const search = async (target) => {
    const value = target.target.value
    if (value === undefined && value === '') {
      setIsSearch(false)
      setSchoolsSearch([])
      return
    }
    setIsSearch(true)
    const response = await SchoolsService.searchSchools(value)
    setSchoolsSearch(response)
  }
  useEffect(() => {
    init()
  }, [])
  return (
    <>
      <Search searchAction={search} actionButton={() => navigate(routesNamesDashboard.addSchool)}/>
      <Toaster position="top-center" reverseOrder={false} />
      <TableSchools items={isSearch ? schoolsSearch : schools} />

    </>
  )
}

export default SchoolsPage
