import React, { useEffect, useRef, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import LayoutDetailUserStyled from './DetailUserStyled'
import DataUserView from './views/DataUserView'

import { changeTitle } from '@/Redux/globalSlice'
import LoaderComponent from '@/common/Components/LoaderComponent'
import Tabs from '@/common/Components/Tabs'
import PageStatus from '@/common/Models/Enums'
import UserModel from '@/common/Models/UserModel'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import useTabSelectedHandling from '@/common/hooks/useTabSelect'
import UsersService from '@/services/users.service'

const DetailUserPage = () => {
  const { errorMessage, handleErrors } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)

  const { id } = useParams()
  const initHasRun = useRef(false)
  const dispatch = useDispatch()
  const [user, setUser] = useState(new UserModel())
  const { changedSelectTab, selectTab } = useTabSelectedHandling()
  const [tabs] = useState([
    { label: 'Datos personales', isSelect: true }
  ])

  // ============ INIT DATA LOADING ===============
  const init = async () => {
    try {
      if (id !== undefined) {
        dispatch(
          changeTitle({
            titleHeader: 'Editar usuario',
            showArrow: true
          })
        )

        setPageStatus(PageStatus.LOADING)
        const response = await UsersService.getUser(id)
        setUser(response)
        setPageStatus(PageStatus.SUCCESS)
        initHasRun.current = true
      } else {
        dispatch(
          changeTitle({
            titleHeader: 'Agregar usuario',
            showArrow: true
          })
        )
        setPageStatus(PageStatus.SUCCESS)
      }
    } catch (e) {
      handleErrors(e)
      setPageStatus(PageStatus.ERROR)
      initHasRun.current = true
    }
  }

  useEffect(() => {
    if (!initHasRun.current) {
      init()
    }
  }, [])

  useEffect(() => {
    console.log(errorMessage)
  }, [errorMessage])

  return (
    <>
      <LayoutDetailUserStyled>
        <Toaster position="top-center" reverseOrder={false} />
        <Tabs items={tabs} onSelect={changedSelectTab} />
        {pageStatus !== PageStatus.SUCCESS && (
          <LoaderComponent
            status={pageStatus}
            message={errorMessage}
            refreshAction={() => init()}
          />
        )}
        {pageStatus === PageStatus.SUCCESS && (
          selectTab === 0
            ? <DataUserView user={user} />
            : <></>
        )}
      </LayoutDetailUserStyled>
    </>
  )
}

export default DetailUserPage
