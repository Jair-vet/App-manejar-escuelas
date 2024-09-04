import PropTypes from 'prop-types'
import { FiEdit } from 'react-icons/fi'
import { useNavigate } from 'react-router'

import TextButton from '@/common/Components/Buttons/ButtonText/ButtonText'
import { ActiveValueStyled, InactiveValueStyled } from '@/common/Components/Tables/TableCustom/TableCustomStyled'
import { routesNamesInstitution } from '@/features/Institution/Routes/routesNames'

const TableBodyCycles = ({ items, activeCycle }) => {
  const navigate = useNavigate()

  return (<>
    {items.length > 0
      ? <>
        {items && items.map((value, index) => {
          return (
            <tr key={index} className='row'>
              <td className="value with-img">
                Inicio {value.start} - Finaliza {value.end}
              </td>
              <td className="value">
                {value.total_students}
              </td>
              <td className='value'>
                {value.status === 2
                  ? <ActiveValueStyled> {value.status_label} </ActiveValueStyled>
                  : <InactiveValueStyled> {value.status_label} </InactiveValueStyled>}
              </td>
              {activeCycle !== undefined
                ? <td className='value actions'>
                  <>{value.status === 1
                    ? <TextButton width='auto' className='item' onClick={() => activeCycle(value)} >Activar</TextButton>
                    : value.status === 2 ? <TextButton width='auto' className='item' onClick={() => activeCycle(value)}>Concluir</TextButton> : <></>}
                    <FiEdit className="edit actions item" onClick={() => navigate(`${routesNamesInstitution.detailCycleOnlyName}${value.id}`)} />
                  </>
                </td>
                : <td>
                  <FiEdit className="edit actions item" onClick={() => navigate(`${routesNamesInstitution.detailCycleOnlyName}${value.id}`)} />
                </td> }

            </tr>
          )
        })}
      </>
      : <span className='tbl-not-data'>No se contraron ciclos escolares</span>
    }
  </>)
}

TableBodyCycles.propTypes = {
  items: PropTypes.array.isRequired,
  activeCycle: PropTypes.func
}

export default TableBodyCycles
