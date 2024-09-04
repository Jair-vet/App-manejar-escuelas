/* eslint-disable camelcase */
import { Box } from '@mui/material'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'
import PropTypes from 'prop-types'
import React, { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { FiEdit } from 'react-icons/fi'
import { MdMail } from 'react-icons/md'

import DetailsTutorView from '../../TutorsDetailsPage/view/DetailsTutorView'

import TutorBodyTableStyled from './TutorBodyTableStyled'

import OnlyLoaderComponent from '@/common/Components/LoaderComponent/OnlyLoader'
import ModalConfirm, { typeModal } from '@/common/Components/ModalConfirm'
import theme from '@/common/Global-styles/theme'
import PageStatus from '@/common/Models/Enums'
import { lsSchoolId } from '@/common/constants/localStorageConstants'
import useOpenModalHandling from '@/common/hooks/useModal'
import TutorService from '@/services/tutors.service'

// import toast from 'react-hot-toast'
// import { FiEdit } from 'react-icons/fi'
// import { MdMail } from 'react-icons/md'
// import Swal from 'sweetalert2'

// import TutorBodyTableStyled, { TableBody } from './TutorBodyTableStyled'

// import { lsSchoolId } from '@/Common/constants/localStorageConstants'
// import useErrorHandling from '@/Common/hooks/useErrorCustom'
// import TutorService from '@/services/tutors.service'
// import { ToltipStyled } from '@/Common/Components/Sidenav/SidenavStyled'

const TableTutorBySchool = ({ tutors = [], pageStatus, functionCloseModal }) => {
  const { viewModal, openOrClose } = useOpenModalHandling()
  const { viewModal: viewModalQuestionSendEmail, openOrClose: openOrCloseQuestionSendEmail } = useOpenModalHandling()
  const [tutorSelect, setTutorSelect] = useState(undefined)
  const [tutorId, setTutorId] = useState(undefined)
  // const { errorMessage, handleErrors } = useErrorHandling()

  // const { handleErrors } = useErrorHandling()
  // if (!tutors.length) {
  //   return <span className='tbl-not-data'>Sin Tutores</span>
  // }

  // const { getValues } = useForm()

  // const sendEmail = async (tutor) => {
  //   try {
  //     const idSchool = localStorage.getItem(lsSchoolId)
  //     await TutorService.sendEmailAppAccess(idSchool, tutor.id)
  //     toast.success(`Accesos enviados a ${tutor.email}`)
  //   } catch (e) {
  //     handleErrors(e)
  //     toast.error(e.toString())
  //   }
  // }

  // const openSendEmailModal = (tutor) => {
  //   Swal.fire({
  //     fontFamily: 'Montserrat", sans-serif',
  //     title: '¿Quieres enviar los accesos por correo a este tutor?',
  //     icon: 'question',
  //     showCancelButton: true,
  //     confirmButtonText: 'Enviar',
  //     cancelButtonText: 'Cancelar',
  //     customClass: {
  //       container: 'my-swal-container',
  //       title: 'my-swal-title custom-font',
  //       text: 'my-swal-text custom-font',
  //       confirmButton: 'my-swal-confirm-button',
  //       cancelButton: 'my-swal-cancel-button',
  //       icon: 'custom-icon-color'
  //     }
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       await sendEmail(tutor)
  //     }
  //   })
  // }
  // const  = ()=>{}
  const sendEmail = async () => {
    try {
      const idSchool = localStorage.getItem(lsSchoolId)
      await TutorService.sendEmailAppAccess(idSchool, tutorSelect.id)
      openOrCloseQuestionSendEmail()
      toast.success(`Accesos enviados a ${tutorSelect.email}`)
    } catch (e) {
      // handleErrors(e)
      toast.error(e.toString())
    }
  }
  const openModalQuestionSendEmail = (tutor) => {
    setTutorSelect(tutor)
    openOrCloseQuestionSendEmail()
  }
  const viewDetailTutor = (idTutor) => {
    openOrClose()
    setTutorId(idTutor)
  }
  // ==================== TABLE  VIEW  ===========
  const columnsTable = useMemo(
    () => [
      {
        accessorFn: (row) => `${row.name} ${row.last_name} ${row.second_surname}`, // accessorFn used to join multiple data into a single cell
        id: 'name', // accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        header: 'Nombre completo',
        size: 120
      },
      {
        accessorKey: 'number_phone_movil',
        id: 'number_phone_movil', // accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        header: 'Número de cel.',
        size: 60
      },
      {
        accessorKey: 'email',
        id: 'email',
        header: 'Correo',
        size: 300
      },
      {
        accessorKey: 'relationship', // access nested data with dot notation
        id: 'relationship',
        header: 'Parentesco',
        size: 30
      }
    ], []
  )
  const table = useMaterialReactTable({
    columns: columnsTable,
    data: tutors,
    enableRowActions: true,
    positionActionsColumn: 'last',
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: 'Acciones', // change header text
        size: 300 // make actions column wider
      }
    },
    renderRowActions: ({ row }) => {
      return (
        <Box>
          <FiEdit className="action" onClick={() => viewDetailTutor(row.original.id)} />
          <MdMail className="action" onClick={() => openModalQuestionSendEmail(row.original)} />
        </Box>
      )
    },
    // renderToolbarInternalActions: () => (<> <Button onClick={() => openModalMasive()}>Cargar masivamente</Button>
    //   <Button left='10px' onClick={() => navigate(routesNamesInstitution.addstudents)}>Agregar</Button></>

    // ),
    // renderTopToolbarCustomActions: () => (
    //   <Search searchAction={searchTutorSchool}
    //     height='auto'
    //     width='65%'
    //     padding='1rem 0.5rem'
    //     alignItems='center'
    //     showCreateButton={false}>
    //   </Search>
    // ),
    enableColumnActions: true,
    enableColumnFilters: true,
    enablePagination: true,
    enableStickyFooter: true,
    enableDensityToggle: false,
    initialState: { pagination: { pageSize: 15, pageIndex: 0 }, density: 'compact' },
    enableHiding: false,
    enableFullScreenToggle: false,
    enableGlobalFilter: false,
    groupedColumnMode: false,
    state: {
      isLoading: pageStatus === PageStatus.LOADING,
      showLoadingOverlay: pageStatus === PageStatus.LOADING
    },
    muiCircularProgressProps: {
      Component: <OnlyLoaderComponent />
    },
    localization: MRT_Localization_ES,
    muiTableProps: {
      sx: {
        fontFamily: theme.fonts.texts

      }
    },
    muiFilterTextFieldProps: {
      sx: {
        fontFamily: theme.fonts.texts,
        // border: `2.5px solid ${theme.colors.primary}`,
        outline: '0',
        '&:focus': {
          border: `2.5px solid ${theme.colors.primary}`
        }
      }
    },
    muiFilterAutocompleteProps: {
      sx: {
        outline: '0',
        '&:focus': {
          border: `2.5px solid ${theme.colors.primary}`
        }
      }
    },
    muiLinearProgressProps: ({ isTopToolbar }) => ({
      color: 'warning',
      sx: { display: isTopToolbar ? 'block' : 'none' }, // only show top toolbar progress bar
      value: 10 // show precise real progress value if you so desire
    })
  })
  // ==================== TABLE  VIEW  ===========
  return (
    // <></>
    <TutorBodyTableStyled >
      {/* <ContainerTableNewStyled > */}
      <MaterialReactTable table={table} />
      {/* </ContainerTableNewStyled> */}
      {
        viewModalQuestionSendEmail && <ModalConfirm
          handleConfirm={sendEmail}
          title='¿Quieres enviar los accesos por correo a este tutor?'
          handleClose={openOrCloseQuestionSendEmail}
          type={typeModal.QUESTION}
        >
        </ModalConfirm>}
      {
        viewModal && <DetailsTutorView
          idTutor={tutorId}
          modalStatus={PageStatus.SUCCESS}
          onSubmitFunction={functionCloseModal}
          handleCloseProfile={openOrClose} />
      }
    </TutorBodyTableStyled>
  )
}

TableTutorBySchool.propTypes = {
  // tutors: PropTypes.array.isRequired,
  // onInit: PropTypes.func,
  tutors: PropTypes.array.isRequired,
  functionCloseModal: PropTypes.array.isRequired,
  pageStatus: PropTypes.oneOf(Object.values(PageStatus)).isRequired
}

export default TableTutorBySchool
