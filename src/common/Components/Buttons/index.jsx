import PropTypes from 'prop-types'
import React from 'react'

import ButtonStyled, { ButtonLoadingStyled, ButtonSecondaryStyled, ButtonSecondaryLoadingStyled } from '../Buttons/ButtonStyled'

export const StatusButton = Object.freeze({
  Enabled: 'Enabled',
  Disabled: 'Disabled',
  Loading: 'Loading'
})

const Button = ({
  background, size,
  color, top,
  children, bottom,
  position, left,
  type, status,
  onClick, border,
  right, padding,
  fontSize

}) => {
  if (status === StatusButton.Loading) {
    return (
      <ButtonLoadingStyled type={type}
      background={background}
      size={size}
      color={color}
      top={top}
      left={left}
      onClick={onClick}
      position={position}
      bottom={bottom}
      border={border}
      right={right}
      padding={padding}
      >
        {children }
        <span className='load loading' ></span>
      </ButtonLoadingStyled>
    )
  }
  if (status === StatusButton.Disabled) {
    return (
      <ButtonStyled
      type={type}
      background={background}
      size={size}
      color={color}
      top={top}
      left={left}
      onClick={onClick}
      position={position}
      bottom={bottom}
      border={border}
      right={right}
      padding={padding}
      fontSize={fontSize}
      >
        {children }
      </ButtonStyled>
    )
  }
  return (
    <ButtonStyled type={type}
    background={background}
    size={size}
    color={color}
    top={top}
    left={left}
    onClick={onClick}
    position={position}
    bottom={bottom}
    border={border}
    right={right}
    padding={padding}
    fontSize={fontSize}
    >
      {children }
    </ButtonStyled>
  )
}

export const ButtonSecondary = ({ background, size, color, top, children, left, type, status, onClick }) => {
  if (status === StatusButton.Loading) {
    return (
      <ButtonSecondaryLoadingStyled type={type}
      background={background}
      size={size}
      color={color}
      top={top}
      left={left}
      onClick={onClick}
      >
        {children }
        <span className='load loading' ></span>
      </ButtonSecondaryLoadingStyled>
    )
  }
  if (status === StatusButton.Disabled) {
    return (
      <ButtonSecondaryStyled
      type={type}
      background={background}
      size={size}
      color={color}
      top={top}
      left={left}
      onClick={onClick}
      >
        {children }
      </ButtonSecondaryStyled>
    )
  }
  return (
    <ButtonSecondaryStyled
    type={type}
    background={background}
    size={size}
    color={color}
    top={top}
    left={left}
    onClick={onClick}

    >
      {children }
    </ButtonSecondaryStyled>
  )
}

Button.propTypes = {
  background: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  top: PropTypes.string,
  left: PropTypes.string,
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.any,
  status: PropTypes.string,
  position: PropTypes.string,
  pTop: PropTypes.string,
  bottom: PropTypes.string,
  border: PropTypes.string,
  right: PropTypes.string,
  padding: PropTypes.string,
  fontSize: PropTypes.string
}

ButtonSecondary.propTypes = {
  background: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  top: PropTypes.string,
  left: PropTypes.string,
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.any,
  status: PropTypes.string
}

export default Button
