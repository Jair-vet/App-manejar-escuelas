// import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
// import { FiEdit } from 'react-icons/fi'
// import { useNavigate } from 'react-router-dom'

import { ButtonSecondary } from '../../Buttons'
import LoaderComponent from '../../LoaderComponent'
// import OnlyLoaderComponent from '../../LoaderComponent/OnlyLoader'

import TableCustomStyled, { AnimatedStyled } from './TableCustomStyled'

import PageStatus from '@/common/Models/Enums'

// import { routesNamesDashboard } from '@/features/Dashboard/Routes/routesNames'

/**
 * Componente Tabla de forma mas dinamica.
 * @param {array} props.titles -  Titulos de tabla, array de cadenas ['titulo1','titulo2' ...]
 * @param {boolean} props.withContainerWhite - Establece si va a tener bordes y sombra.
 * @param {string} props.heightTable - Establece el alto de tabla pasar como propiedas css  calc(100 % - 100px).
 * @param {node} props.children - Filas de tabla
 * @param {func} props.refreshAction - Funcion a ejecutar para refrescar contenido de tabla
 * @param {number} props.totalItems - con este parametro se calcula cuanto debe medir cada fila
 * @param {PageStatus} props.statusTable - Estado de tabla, LOADING, SUCCESS, ERROR
 *
 */

const TableCustom = ({ children, totalItems, refreshAction, titles, withContainerWhite, heightTable, statusTable, columnWidths = [] }) => {
  return (
    <>
      <TableCustomStyled
        statusTable={statusTable}
        heightTable={heightTable}
        withContainerWhite={withContainerWhite}
        totalItems={totalItems}
        // columnWidths={columnWidths}
      >
        <table className='container-tables'>
          {<thead className='header-table'>
            <tr className='row'>
              {titles && titles.map((value, index) => (
                <th key={index} className='items' style={{ width: columnWidths.length > 0 ? columnWidths[index] : columnWidths }}>{value}</th>
              ))}
            </tr>
          </thead>}
          <tbody className='container-values' >
            {statusTable === PageStatus.SUCCESS ? <AnimatedStyled className={`${statusTable === PageStatus.SUCCESS ? 'active' : ''}`}>{children} </AnimatedStyled> : (<div className='loader-table'> <LoaderComponent message='' status={statusTable}></LoaderComponent></div>)}
            {statusTable === PageStatus.ERROR && <ButtonSecondary onClick={() => refreshAction()}>Reintentar</ButtonSecondary>}
          </tbody>

        </table>
      </TableCustomStyled>
    </>

  )
}

TableCustom.propTypes = {
  titles: PropTypes.array,
  withContainerWhite: PropTypes.bool.isRequired,
  heightTable: PropTypes.string.isRequired,
  refreshAction: PropTypes.func,
  totalItems: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  statusTable: PropTypes.oneOf(Object.values(PageStatus)),
  withScroll: PropTypes.bool,
  columnWidths: PropTypes.array
}
export default TableCustom
