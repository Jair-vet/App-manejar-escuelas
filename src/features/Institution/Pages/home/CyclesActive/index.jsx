import { useEffect, useRef, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import TableBodyCycles from '../../Admin/Components/CyclesBodyTable'
import CycleStudentsView from '../CycleDetail/views/CycleStudentsView'

import HomeInstitutionStyled from './HomeInstitutionStyled'

import { lsSchoolId } from '@/Common/constants/localStorageConstants'
import { changeTitle } from '@/Redux/globalSlice'
import LoaderComponent from '@/common/Components/LoaderComponent'
import TableCustom from '@/common/Components/Tables/TableCustom'
import Tabs from '@/common/Components/Tabs'
import PageStatus from '@/common/Models/Enums'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import useTabSelectedHandling from '@/common/hooks/useTabSelect'
import { routesNamesInstitution } from '@/features/Institution/Routes/routesNames'
import SchoolsCyclesService from '@/services/schoolsCycles.service'

const HomeSchoolPage = () => {
  // ============ SCREEN STATUS ===============
  const { errorMessage, handleErrors } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initHasRun = useRef(false)
  const cycleStore = useSelector((state) => state.cycle)
  const idSchool = localStorage.getItem(lsSchoolId)
  // ============ SCREEN STATUS ===============

  const { changedSelectTab, selectTab } = useTabSelectedHandling()
  const [tabs] = useState([
    { label: 'Alumnos inscritos', isSelect: true }
    // { label: 'Alumnos', isSelect: false }
  ])
  const [cycles, setCycles] = useState(PageStatus.LOADING)

  // ========== DATA ==============
  // ========== DATA ==============

  // ============ INIT DATA LOADING ===============
  const init = async () => {
    try {
      dispatch(changeTitle({
        titleHeader: 'Ciclos escolares activos',
        showArrow: false
      }))
      const cyclesActive = await SchoolsCyclesService.getCycles(idSchool, 1, [2])
      // setPageStatus(PageStatus.LOADING)
      // setGroups(response)
      // dispatch(changeCycle(response))

      setCycles(cyclesActive)
      if (cyclesActive.length === 1) {
        // dispatch(changeCycle(cyclesActive[0]))
        // dispatch(changeTitle({
        //   titleHeader: 'Ciclo escolar activo',
        //   showArrow: false
        // }))
        navigate(`${routesNamesInstitution.detailCycleOnlyName}${cyclesActive[0].id}`)
      } else {
        setCycles(cyclesActive)
      }

      setPageStatus(PageStatus.SUCCESS)
      initHasRun.current = true
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
  // ============ INIT DATA LOADING ===============

  const selectedGroup = () => {
    changedSelectTab(1, tabs)
  }
  return (
    <HomeInstitutionStyled>
      <Toaster position="top-center" reverseOrder={false} />
      {
        cycles.length === 1
          ? (
            <><div className='cycle'>
              <span>Datos de ciclo escolar activo</span>
              <span>Inicio: {cycleStore.start !== undefined ? cycleStore.start : ''} / Término: {cycleStore.end !== undefined ? cycleStore.end : ''}</span>
            </div><Tabs items={tabs} onSelect={changedSelectTab} />
              {pageStatus === PageStatus.SUCCESS && (selectTab === 0 ? <CycleStudentsView onViewStudents = {() => selectedGroup()} ></CycleStudentsView> : <></>)}
            </>

            )
          : (
            <TableCustom
          statusTable={pageStatus}
          withContainerWhite={false}
          totalItems={3}
          heightTable={'calc(100% - 80px)'}
          titles={['Ciclo Escolar', 'Estatus', 'Acciones']}>
              <TableBodyCycles items={cycles} message={errorMessage} tableStatus={pageStatus} ></TableBodyCycles>
            </TableCustom>
            )
      }

      {pageStatus !== PageStatus.SUCCESS &&
        <LoaderComponent
          status={pageStatus}
          message={errorMessage}
          refreshAction={() => init()}/>}

    </HomeInstitutionStyled>)
}

export default HomeSchoolPage
