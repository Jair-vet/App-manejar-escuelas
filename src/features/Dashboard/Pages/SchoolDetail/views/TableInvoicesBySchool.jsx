import PropTypes from 'prop-types'
import { FiEdit } from 'react-icons/fi'

import styles from './TableInvoicesBySchool.module.css';
import { ActiveValueStyled, InactiveValueStyled } from '@/common/Components/Tables/TableCustom/TableCustomStyled'
import { constantImageUrlUsers } from '@/common/constants/constants'

const formaPagoMapping = {
  '01': 'EFECTIVO',
  '03': 'TRANSFERENCIA ELECTRONICA',
  '04': 'TARJETA DE CREDITO',
  '28': 'TARJETA DE DEBITO',
};

const getFormaPagoName = (formaPago) => {
  return formaPagoMapping[formaPago] || 'DESCONOCIDO'; // Retorna 'DESCONOCIDO' si no coincide
};

const TableInvoicesBySchool = ({ items }) => {

  const openPdf = (rutaPdf) => {
    if (rutaPdf) {
      window.open(rutaPdf, '_blank');
    } else {
      console.error('Ruta PDF no disponible');
    }
  };
  
  return (
  <>
    {items.length > 0
      ? <>
        {items && items.map((value, index) => {
          return (
            <tr key={index} className='row'>
              <th className="value">{value.serie}</th>
              <th className="value">{value.folio}</th>
              <th className="value">{value.metodo_pago}</th>
              <th className="value">{getFormaPagoName(value.forma_pago)}</th> 
              <th className="value">{value.razon_social_emisor}</th>
              <th className="value">${value.total}</th>
              <th className={styles.value}>
                <button onClick={() => openPdf(value.ruta_pdf)} className={styles['btn-open-pdf']}>
                  PDF
                </button>
              </th>
            </tr>
          )
        })}
      </>
      : <span className='tbl-not-data'>Sin coincidencias</span>
    }
  </>)
}

TableInvoicesBySchool.propTypes = {
  items: PropTypes.array.isRequired,
}

export default TableInvoicesBySchool
