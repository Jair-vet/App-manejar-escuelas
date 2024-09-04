// import PropTypes from 'prop-types'
// import { useEffect, useState } from 'react'
// import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2'
// import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router'

// import { changeCycle } from '@/Redux/cycleSlice'
// import Button from '@/common/Components/Buttons'
// import LoaderComponent from '@/common/Components/LoaderComponent'
// import Search from '@/common/Components/Search'
// import TableCustom from '@/common/Components/Tables/TableCustom'
// import PageStatus from '@/common/Models/Enums'
// import { lsSchoolId } from '@/common/constants/localStorageConstants'
// import useErrorHandling from '@/common/hooks/useErrorCustom'
// import { routesNamesInstitution } from '@/features/Institution/Routes/routesNames'
// import SchoolsCyclesService from '@/services/schoolsCycles.service'

// export const TableBodyGroupsCycle = ({ items, edit, onViewStudents }) => {
//   const navigate = useNavigate()
//   return (<>
//     {items.length > 0
//       ? <div className='container'>
//         {items && items.map((value, index) => {
//           return (
//             <tr key={index} className='row'>
//               <td className="value with-img">
//                 {value.name}
//               </td>
//               <td className="value with-img">
//                 {value.name_level}
//               </td>
//               <td className="value with-img">
//                 {value.name_section}
//               </td>
//               <td className="value actions">
//                 <HiMiniArrowTopRightOnSquare className="edit actions" onClick={onViewStudents} />
//               </td>
//             </tr>
//           )
//         })}
//       </div>
//       : (<div className='table-not-data-cycle'>
//         <span className='tbl-not-data'>No se contraron grupos</span>
//         <Button size='large' onClick={ () => navigate(routesNamesInstitution.admin)}>Crear nuevo ciclo escolar</Button>
//       </div>
//         )
//     }
//   </>)
// }

// TableBodyGroupsCycle.propTypes = {
//   items: PropTypes.array.isRequired,
//   edit: PropTypes.func.isRequired,
//   onViewStudents: PropTypes.func.isRequired

// }

// const CycleGroupsView = ({ onViewStudents }) => {
//   // ============ SCREEN STATUS ===============
//   const { errorMessage, handleErrors } = useErrorHandling()
//   const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)
//   const dispatch = useDispatch()
//   // ============ SCREEN STATUS ===============
//   const [groups, setGroups] = useState([])
//   const [isSearch, setIsSearch] = useState([])
//   const navigate = useNavigate()
//   // ============ INIT DATA LOADING ===============
//   const init = async () => {
//     try {
//       setPageStatus(PageStatus.LOADING)
//       const idSchool = localStorage.getItem(lsSchoolId)
//       const response = await SchoolsCyclesService.getGroupsActiveCycle(idSchool)
//       setGroups(response.results)
//       if (response.cycle !== undefined) {
//         dispatch(changeCycle(response.cycle))
//       }
//       setPageStatus(PageStatus.SUCCESS)
//     } catch (e) {
//       handleErrors(e)
//       setPageStatus(PageStatus.ERROR)
//     }
//   }
//   useEffect(() => {
//     init()
//   }, [])
//   useEffect(() => {
//   }, [errorMessage])
//   // ============ INIT DATA LOADING ===============
//   const search = async (target) => {
//     setIsSearch(true)
//   }
//   const create = async (target) => {
//     navigate(routesNamesInstitution.admin)
//   }
//   return (
//     <div className='container'>
//       <Search actionButton={create} searchAction={search} showCreateButton={false} />
//       {pageStatus !== PageStatus.SUCCESS && <LoaderComponent status={pageStatus} message={errorMessage} refreshAction={() => init()} />}

//       {pageStatus === PageStatus.SUCCESS &&
//         <TableCustom
//           statusTable={pageStatus}
//           withContainerWhite={false}
//           totalItems={4}
//           heightTable={'calc(100% - 80px)'}
//           titles={['Nombre', 'Grado', 'Seccion', 'Acciones']}>
//           <TableBodyGroupsCycle onViewStudents={onViewStudents} isSearch={isSearch} items={isSearch ? groups : groups} message={errorMessage} tableStatus={pageStatus} ></TableBodyGroupsCycle>
//         </TableCustom>}
//     </div>

//   )
// }
// CycleGroupsView.propTypes = {
//   onViewStudents: PropTypes.func.isRequired
// }
// export default CycleGroupsView
