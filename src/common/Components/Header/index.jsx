import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
// import { FaGear } from 'react-icons/fa6'
import { GoGear } from 'react-icons/go'
import { IoIosArrowBack } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import user from '../../../Assets/user.svg'
import HeaderStyled, { H3, ContainerUser, ContainerImage } from '../Header/HeaderStyled'

import { constantImageUrlUsers } from '@/common/constants/constants'
import { lsUserName, lsProfilePhoto } from '@/common/constants/localStorageConstants'
import { Overlay } from '@/features/Dashboard/Pages/DashBoardLayout/DashboardLayoutStyled'
import SignOff from '@/features/authentication/Pages/SingOff'

const Header = ({ children, position, left, userName }) => {
  const globalState = useSelector((state) => state.global)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isUser, setIsUser] = useState(false)
  const [imageUser, setImageUser] = useState(user)

  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }
  const toggleClick = () => {
    setIsClicked(!isClicked)
    toggleMenu()
  }

  const username = localStorage.getItem(lsUserName)
  const showArrow = globalState.showArrow

  useEffect(() => {
    const profilePhoto = localStorage.getItem(lsProfilePhoto)
    const validatePhoto = profilePhoto.includes('https') ? profilePhoto : constantImageUrlUsers + profilePhoto
    setImageUser(validatePhoto)
  }, [])

  return (
    <>
      {isMenuOpen && <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ ease: 'easeOut', duration: 0.1 }} exit={{ opacity: 0 }}> <Overlay onClick={closeMenu}></Overlay></motion.div>}
      <HeaderStyled position={position} left={left} userName={userName}>
        <div className="container-title">
          {showArrow && (
          <IoIosArrowBack size="2rem" className="icon-arrow" onClick={goBack} />
          )}
          <span className='title'>{globalState.titleHeader}</span>
        </div>
        <ContainerUser onClick={toggleClick}>
          <div className='user-container'>
            <span>{username}</span>
            <ContainerImage>
              <GoGear className='configuration'/>
              <img src={imageUser} alt="user" id="user" className="photo-user" />
            </ContainerImage>

          </div>
          {isMenuOpen && <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ ease: 'easeOut', duration: 0.5 }} exit={{ opacity: 0 }}>
            <SignOff />
            </motion.div>}
        </ContainerUser>
        {children}
      </HeaderStyled>
    </>

  )
}

Header.propTypes = {
  children: PropTypes.node,
  position: PropTypes.string,
  left: PropTypes.string,
  userName: PropTypes.string

}

export default Header
