import PropTypes from 'prop-types'
import { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
// import { useNavigate } from 'react-router-dom'

import Button from '../Buttons'

import SearchStyled, { InputSearch } from './SearchStyled'

const Search = ({ children, bottom, left, actionButton, searchAction, showCreateButton, height, padding, alignItems, buttonText, width, shadow = true, isViewInputSearch = true }) => {
  const [isInputEmpy, setInputEmpy] = useState(true)

  const handleInputChange = (e) => {
    setInputEmpy(e.target.value === '')
  }
  return (
    <SearchStyled shadow={shadow} width={width} bottom={bottom} left={left} height={height} padding={padding} alignItems={alignItems}>
      {isViewInputSearch === true && <InputSearch isInputEmpy={isInputEmpy}>
        <div className='container-icon-search'>
          <CiSearch className='search-icon' size='1.5rem'/>
          <input type="search" className='input-search' name="search" placeholder='Buscar' onChange={searchAction} onClick={handleInputChange}/>
        </div>
      </InputSearch>}

      {showCreateButton === false ? <></> : <Button className='btn' onClick={actionButton}> {buttonText || 'Agregar'}</Button> }
      { children }
    </SearchStyled>
  )
}
Search.propTypes = {
  children: PropTypes.node,
  bottom: PropTypes.string,
  left: PropTypes.string,
  actionButton: PropTypes.func,
  searchAction: PropTypes.func,
  showCreateButton: PropTypes.bool,
  height: PropTypes.string,
  padding: PropTypes.string,
  alignItems: PropTypes.string,
  buttonText: PropTypes.string,
  isViewInputSearch: PropTypes.bool,
  width: PropTypes.string,
  shadow: PropTypes.bool
}

export default Search
