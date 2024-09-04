import { useEffect, useRef, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'

import SchoolCyclesView from '../../Admin/views/SchoolCyclesView'
import SchoolSectionsPaysView from '../../Admin/views/SchoolSettingsPaysView'

import CycleDetailInstitutionStyled from './cycleDetailStyled'
import CycleSchoolSectionsView from './views/CycleSchoolSectionsView'
import CycleSettingsPaymentsView from './views/CycleSettingsPayments'
import CycleStudentsView from './views/CycleStudentsView'
import CycleScholarShipsView from './views/ScholarShipsView'

import { changeTitle } from '@/Redux/globalSlice'
import LoaderComponent from '@/common/Components/LoaderComponent'
import Tabs from '@/common/Components/Tabs'
import PageStatus from '@/common/Models/Enums'
import SchoolModel from '@/common/Models/SchoolModel'
import { lsSchoolId } from '@/common/constants/localStorageConstants'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import useTabSelectedHandling from '@/common/hooks/useTabSelect'
import SchoolsCyclesService from '@/services/schoolsCycles.service'

const CycleDetailPage = () => {
  // ============ SCREEN STATUS ===============
  const { errorMessage, handleErrors } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)
  const dispatch = useDispatch()
  const initHasRun = useRef(false)
  const idSchool = localStorage.getItem(lsSchoolId)
  const { id } = useParams()
  const [model, setModel] = useState(new SchoolModel())

  // ============ SCREEN STATUS ===============

  const { changedSelectTab, selectTab } = useTabSelectedHandling()
  const [tabs] = useState([
    { label: 'Alumnos inscritos', isSelect: true },
    { label: 'Secciones', isSelect: false },
    { label: 'Configuración de pagos', isSelect: false },
    { label: 'Becas', isSelect: false }

    // { label: 'Alumnos', isSelect: false }
  ])
  const [cycle, setCycle] = useState({})

  // ========== DATA ==============
  // ========== DATA ==============

  // ============ INIT DATA LOADING ===============
  const init = async () => {
    try {
      let title = 'Ciclo escolar'
      setPageStatus(PageStatus.LOADING)
      dispatch(changeTitle({
        titleHeader: title,
        showArrow: false
      }))
      const model = new SchoolModel(id, '', '', '', '', '', '', 0)
      setModel(model)
      const cycleResponse = await SchoolsCyclesService.getCycle(idSchool, id)

      setCycle(cycleResponse)
      title = 'Ciclo escolar ' + cycleResponse.status_label.toLowerCase()
      dispatch(changeTitle({
        titleHeader: title,
        showArrow: true
      }))

      setPageStatus(PageStatus.SUCCESS)
      initHasRun.current = true
    } catch (e) {
      initHasRun.current = true
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
    console.log(errorMessage)
  }, [errorMessage])
  // ============ INIT DATA LOADING ===============

  const selectedGroup = () => {
    changedSelectTab(1, tabs)
  }

  return (
    <CycleDetailInstitutionStyled>
      <Toaster position="top-center" reverseOrder={false} />
      <div className='cycle'>
        <span>Datos de ciclo escolar</span>
        <span className='dates'>Inicio: {cycle.start !== undefined ? cycle.start : ''} / Término: {cycle.end !== undefined ? cycle.end : ''}</span>
      </div><Tabs items={tabs} onSelect={changedSelectTab} />
      {pageStatus === PageStatus.SUCCESS && (selectTab === 0 ? <CycleStudentsView cycle={cycle} onViewStudents = {() => selectedGroup()} ></CycleStudentsView> : <></>)}
      {pageStatus === PageStatus.SUCCESS && (selectTab === 1 ? <CycleSchoolSectionsView ></CycleSchoolSectionsView> : <></>)}
      {pageStatus === PageStatus.SUCCESS && (selectTab === 2 && (<CycleSettingsPaymentsView />))}
      {pageStatus === PageStatus.SUCCESS && (selectTab === 3 ? <CycleScholarShipsView ></CycleScholarShipsView> : <></>)}

      {pageStatus !== PageStatus.SUCCESS &&
        <LoaderComponent
          status={pageStatus}
          message={errorMessage}
          refreshAction={() => init()}/>}

    </CycleDetailInstitutionStyled>)
}

export default CycleDetailPage
