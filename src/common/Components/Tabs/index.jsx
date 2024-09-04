import PropTypes from 'prop-types'

import TabStyled, { ContainerItems } from './TabsStyled'

const Tabs = ({ items, onSelect }) => {
  return (
    <TabStyled>
      {items && items.map((value, index) => {
        return (
          <ContainerItems key={index} onClick={ () => onSelect(index, items)} className={value.isSelect ? 'selected' : ''}>
            {value.label}

            {value.subtitle && (<span className='subtitle'>{value.subtitle}</span>) }
          </ContainerItems>
        )
      })}
    </TabStyled>

  )
}

Tabs.propTypes = {
  items: PropTypes.array,
  onSelect: PropTypes.func
}

export default Tabs
