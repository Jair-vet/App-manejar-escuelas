import { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import LayoutAdminStyled from './AdminStyled'
import SchoolCyclesView from './views/SchoolCyclesView'
// import SchoolLevelsView from './views/SchoolLevelsView'
import SchoolSectionsView from './views/SchoolSectionsView'
import SchoolSectionsPaysView from './views/SchoolSettingsPaysView'

import { cangeSelectTab } from '@/Redux/adminSlice'
import { changeTitle } from '@/Redux/globalSlice'
import LoaderComponent from '@/common/Components/LoaderComponent'
import Tabs from '@/common/Components/Tabs'
import PageStatus from '@/common/Models/Enums'
import SchoolModel from '@/common/Models/SchoolModel'
import { lsSchoolId } from '@/common/constants/localStorageConstants'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import useTabSelectedHandling from '@/common/hooks/useTabSelect'
import SchoolSettingView from './views/SchoolSettingsView'

const AdminPage = () => {
  // ============ SCREEN STATUS ===============
  const { errorMessage, handleErrors, clearErrorMessage } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)
  // ============ SCREEN STATUS ===============
  const dispatch = useDispatch()
  const initHasRun = useRef(false)
  const adminStore = useSelector((state) => state.admin)
  const [model, setModel] = useState(new SchoolModel())
  const { changedSelectTab, selectTab } = useTabSelectedHandling()
  const [tabs] = useState([
    { label: 'Configuración Secciones', isSelect: true },
    { label: 'Configuración de pagos', isSelect: false },
    { label: 'Ciclos escolares', isSelect: false },
    { label: 'Configuración de escuela ', isSelect: false }
  ])

  // ============ INIT DATA LOADING ===============
  const init = async () => {
    try {
      dispatch(changeTitle({
        titleHeader: 'Administración',
        showArrow: false
      }))
      changedSelectTab(adminStore.tabSelected, tabs)
      setPageStatus(PageStatus.LOADING)
      const id = localStorage.getItem(lsSchoolId)
      const model = new SchoolModel(id, '', '', '', '', '', '', 0)
      setModel(model)
      setPageStatus(PageStatus.SUCCESS)
    } catch (e) {
      handleErrors(e)
      setPageStatus(PageStatus.ERROR)
    }
  }
  useEffect(() => {
    if (!initHasRun.current) {
      init()
    }
  }, [])
  useEffect(() => {
    if (errorMessage !== '') {
      toast.error(errorMessage, {
        style: {
          fontFamily: 'Montserrat',
          fontSize: '17px',
          fontWeight: 'bold'
        }
      })
      clearErrorMessage()
    }
  }, [errorMessage])

  const onSelectTab = (index, items) => {
    dispatch(cangeSelectTab({
      tabSelected: index
    }))
    changedSelectTab(index, items)
  }
  // ============ INIT DATA LOADING ===============

  return (
    <LayoutAdminStyled>
      <Toaster position="top-center" reverseOrder={false} />
      <Tabs items={tabs} onSelect={onSelectTab} />
      {pageStatus !== PageStatus.SUCCESS &&
        <LoaderComponent
        status={pageStatus}
        message={errorMessage}
        refreshAction={() => init()}/>}
      { pageStatus === PageStatus.SUCCESS && (
        selectTab === 0 && (<SchoolSectionsView school={model} />)
      )
      }
      { pageStatus === PageStatus.SUCCESS && (
        selectTab === 1 && (<SchoolSectionsPaysView school={model} />)
      // : (
      //   <SchoolCyclesView school={model} />
      // )
      )
      }
      { pageStatus === PageStatus.SUCCESS && (
        selectTab === 2 && (<SchoolCyclesView school={model} />)
      // : (
      //   <SchoolCyclesView school={model} />
      // )
      )
      }
      { pageStatus === PageStatus.SUCCESS && (
        selectTab === 3 && (<SchoolSettingView school={model} />)
      )
      }

    </LayoutAdminStyled>
  )
}

export default AdminPage
