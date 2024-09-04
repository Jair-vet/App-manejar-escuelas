import PropTypes from 'prop-types'

import SelectFilterStyled from './SelectFilterStyled'

const SelectFilter = ({ children, label }) => {
  return (<SelectFilterStyled>
    <span className='name'>{label}</span>
    <select className='select' >
      {children}
    </select></SelectFilterStyled>

  )
}
SelectFilter.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string
}

export default SelectFilter
