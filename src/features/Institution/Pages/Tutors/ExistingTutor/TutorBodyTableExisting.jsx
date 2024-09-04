/* eslint-disable camelcase */

import { Box } from '@mui/material'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
// import toast from 'react-hot-toast'
import { AiOutlinePlus } from 'react-icons/ai'

import TutorBodyTableStyled from '../TutorsView/Component/TutorBodyTableStyled'

import LoaderComponent from '@/common/Components/LoaderComponent'
import OnlyLoaderComponent from '@/common/Components/LoaderComponent/OnlyLoader'
import theme from '@/common/Global-styles/theme'
import PageStatus from '@/common/Models/Enums'

const TableTutorsExistingBySchool = ({ tutors = [], pageStatus, onAddTutorExisting }) => {
  // const [idTutor, setIdTutor] = useState(undefined)
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
        size: 120
      },
      {
        accessorKey: 'email', // access nested data with dot notation
        id: 'email',
        header: 'Correo',
        size: 120
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
          <AiOutlinePlus className="action" onClick={() => onAddTutorExisting(row.original.id)} />
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
      // isLoading: pageStatus === PageStatus.LOADING,
      // showLoadingOverlay: pageStatus === PageStatus.LOADING
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
  return (
    <TutorBodyTableStyled >
      {
        pageStatus === PageStatus.LOADING && <LoaderComponent message='' status={pageStatus} ></LoaderComponent>
      }
      {
        pageStatus === PageStatus.SUCCESS && <MaterialReactTable table={table} />
      }

      {/* <TableBody>
        {tutors.map((tutor, index) => (
          <tr key={index} className='row'>
            <td className="value">{`${tutor.name} ${tutor.last_name} ${tutor.second_surname}`}</td>
            <td className="value">{tutor.number_phone_movil}</td>
            <td className="value">{tutor.email}</td>
            <td className="value">{tutor.relationship}</td>
            <td className='value actions'>
              <div onClick={() => addTutorExisting(tutor)}>
                <AiOutlinePlus />
              </div>
            </td>
          </tr>
        ))}
      </TableBody> */}
    </TutorBodyTableStyled>
  )
}

TableTutorsExistingBySchool.propTypes = {
  tutors: PropTypes.array.isRequired,
  // detailTutor: PropTypes.func,
  // idTutor: PropTypes.string,
  // idStudent: PropTypes.string,
  onAddTutorExisting: PropTypes.func.isRequired,
  pageStatus: PropTypes.oneOf(Object.values(PageStatus)).isRequired
}

export default TableTutorsExistingBySchool
