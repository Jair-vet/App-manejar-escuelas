import PropTypes from 'prop-types'
// import { useState } from 'react'
// import { CiSearch } from 'react-icons/ci'

import { Checkbox } from '@/common/Components/Form/checkbox'
import LoaderComponent from '@/common/Components/LoaderComponent'
// import { InputSearch } from '@/common/Components/Search/SearchStyled'
import TableCustomStyled, { AnimatedStyled } from '@/common/Components/Tables/TableCustom/TableCustomStyled'
import PageStatus from '@/common/Models/Enums'

/**
 * Componente Tabla de forma mas dinamica.
 * @param {array} props.titles -  Titulos de tabla, array de cadenas ['titulo1','titulo2' ...]
 * @param {boolean} props.withContainerWhite - Establece si va a tener bordes y sombra.
 * @param {string} props.heightTable - Establece el alto de tabla pasar como propiedas css  calc(100 % - 100px).
 * @param {node} props.children - Filas de tabla
 * @param {number} props.totalItems - con este parametro se calcula cuanto debe medir cada fila
 * @param {PageStatus} props.statusTable - Estado de tabla, LOADING, SUCCESS, ERROR
 * @param {PageStatus} props.selectAllAction - Funcion que es utilizada para seleccionar o deseleccionar todos los elementos de la tabla
 * @param {PageStatus} props.valueAllCheckBox - valor del checkbox en el header

 */

const TableItemsCreateCycle = ({ children, totalItems, titles, withContainerWhite, heightTable, statusTable, selectAllAction, valueAllCheckBox }) => {
  return (
    <>
      <TableCustomStyled
        statusTable={statusTable}
        heightTable={heightTable}
        withContainerWhite={withContainerWhite}
        totalItems={totalItems + 1}
      >
        <table className='container-tables'>
          <thead className='header-table'>
            <tr className='row'>
              <th className='items'><Checkbox
                label='Seleccionar todos'
                value={valueAllCheckBox}
                checked={valueAllCheckBox}
                onChange={({ target }) => selectAllAction()}
              /></th>
              {titles && titles.map((value, index) => {
                return (
                  <th key={index} className='items'>{value}</th>
                )
              })}
            </tr>
          </thead>
          <tbody className='container-values' >
            {statusTable === PageStatus.SUCCESS ? <AnimatedStyled className={`${statusTable === PageStatus.SUCCESS ? 'active' : ''}`}>{children} </AnimatedStyled> : (<div className='loader-table'> <LoaderComponent message='' status={statusTable}></LoaderComponent></div>)}
          </tbody>

        </table>
      </TableCustomStyled>
    </>

  )
}

TableItemsCreateCycle.propTypes = {
  titles: PropTypes.array,
  withContainerWhite: PropTypes.bool.isRequired,
  heightTable: PropTypes.string.isRequired,
  totalItems: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  statusTable: PropTypes.instanceOf(PageStatus),
  selectAllAction: PropTypes.func,
  valueAllCheckBox: PropTypes.bool.isRequired
}
export default TableItemsCreateCycle
