/* eslint-disable camelcase */
import { MenuItem } from '@mui/material'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

import OnlyLoaderComponent from '@/common/Components/LoaderComponent/OnlyLoader'
import theme from '@/common/Global-styles/theme'
import PageStatus from '@/common/Models/Enums'
import { formatAmountMxn } from '@/common/utils/format_amount'

const PaymentsTable = ({ payments = [], pageStatus }) => {
  const columnsTable = useMemo(
    () => [
      {
        accessorKey: 'description',
        id: 'description',
        header: 'Descripción',
        size: 120
      },
      {
        accessorKey: 'month',
        id: 'month',
        header: 'Mes del pago',
        size: 20
      },
      {
        accessorFn: (row) => `${formatAmountMxn.format(row.amount)}`,
        id: 'amount',
        header: 'Monto',
        size: 40
      },
      {
        accessorFn: (row) => `${formatAmountMxn.format(row.amount_paid)}`,
        id: 'amount_paid',
        header: 'Monto pagado',
        size: 40
      },
      {
        accessorKey: 'status_payment_label',
        id: 'status_payment_label',
        header: 'Estado',
        size: 80
      },
      {
        accessorKey: 'date_paid_success',
        id: 'date_paid_success',
        header: 'Fecha de pago',
        size: 80
      }
    ], []
  )

  const table = useMaterialReactTable({
    columns: columnsTable,
    data: payments,
    enableRowActions: true,
    renderRowActionMenuItems: ({ row }) => {
      if (row.original.status_payment === 1) {
        return [
          <MenuItem key="download" onClick={() => console.info('Edit')}>
            Pago en ventanilla
          </MenuItem>,
          <MenuItem key="pay" onClick={() => console.info('Delete')}>
            Pagar
          </MenuItem>]
      } else if (row.original.status_payment === 2) {
        return [
          <MenuItem key="invoice" onClick={() => console.info('Delete')}>
            Facturar
          </MenuItem>
        ]
      }
    },
    positionActionsColumn: 'last',
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: 'Acciones', // change header text
        size: 300 // make actions column wider
      }
    },
    // renderRowActions: ({ row }) => {
    //   return (
    //     <Box>
    //       <AiFillEye className="action-icon"/>
    //     </Box>
    //   )
    // },
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
  return (
    <>
      {
        <MaterialReactTable table={table} />
      }
    </>
  )
}
PaymentsTable.propTypes = {
  payments: PropTypes.array.isRequired,
  pageStatus: PropTypes.oneOf(Object.values(PageStatus)).isRequired
}
export default PaymentsTable
