import styled, { keyframes } from 'styled-components'

const buttonSize = {
  small: '6.15rem', /* 80px */
  mediumSmall: '8.5rem', /* 136px */
  medium: '9.37', /* 150px */
  mediumM: '11rem', /* 180px */
  semiMedium: '12rem', /* 200px */
  large: '15rem', /* 250px */
  extraLarge: '20.81rem'/* 333px */
}

const Button = styled.button`
  display: flex;
  justify-content:center;
  height: 1.87rem; /* 30px */
  width: ${props => buttonSize[props.size]};
  height: ${props => props.height || '2.56'}; /* 41px */
  background-color: ${props => props.background || props.theme.colors.primary};
  align-items: center;
  border: ${props => props.border || '1px solid transparent'} ;
  border-radius: 0.37rem; /* 6px */
  font-family: ${props => props.theme.fonts.texts};
  transition:all 0.15s linear;
  cursor: pointer;
  font-size: ${props => props.fontSize || props.theme.fonts_sizes.small_text};
  margin-top: ${props => props.top};
  margin-left: ${props => props.left};
  margin-bottom: ${props => props.bottom};
  margin-right: ${props => props.right};
  padding: ${props => props.padding || '1rem'};
  color:${props => props.color || props.theme.colors.text_color_hover};
  
  &:hover{
    background-color: ${props => props.theme.colors.hover};
    color: ${props => props.theme.colors.text_color_hover};
  }

  

  @media(max-width:80rem){
      /* margin-left: 44rem; */

      & .btn-save{
        /* margin-left:auto; */
        /* margin-bottom: 2rem; */
      }
    }
`
export const ButtonSecondaryStyled = styled.button`
  display: flex;
  justify-content:center;
  height: 1.87rem; /* 30px */
  width: ${props => buttonSize[props.size]};
  height: ${props => props.height || '2.56'}; /* 41px */
  margin-left: ${props => props.left};
  background-color: ${props => props.background || props.theme.colors.text_color_hover};
  color: ${props => props.theme.colors.color_text || 'black'};
  align-items: center;
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 0.37rem; /* 6px */
  font-family: ${props => props.theme.fonts.texts};
  transition:all 0.15s linear;
  cursor: pointer;
  font-size: ${props => props.theme.fonts_sizes.small_text};
  margin-top: ${props => props.top};
  padding: 1rem;
  color:${props => props.theme.colors.primary};
  
  &:hover{
    background-color: ${props => props.theme.colors.hover};
    color: ${props => props.theme.colors.text_color_hover};
  }
`

const loading1 = keyframes`
  0% {
      transform: rotate(0deg)
  }

  100% {
      transform: rotate(360deg)
  }
`
export const ButtonLoadingStyled = styled.button`
  display: flex;
  justify-content:center;
  height: 1.87rem; /* 30px */
  width: ${props => buttonSize[props.size]};
  height: ${props => props.height || '2.56'}; /* 41px */
  margin-left: ${props => props.left};
  background-color: ${props => props.background || props.theme.colors.primary};
  color: ${props => props.theme.colors.color_text || 'black'};
  align-items: center;
  border: 1px solid transparent;
  border-radius: 0.37rem; /* 6px */
  font-family: ${props => props.theme.fonts.texts};
  transition:all 0.15s linear;
  cursor: pointer;
  font-size: ${props => props.theme.fonts_sizes.small_text};
  margin-top: ${props => props.top};
  padding: 1rem;
  color:${props => props.theme.colors.text_color_hover};
  
  &:hover{
    background-color: ${props => props.theme.colors.hover};
    color: ${props => props.theme.colors.text_color_hover};
  }
  & .load {
    left: 0px;
    top: 0px;
    margin-left: 30px;
    width: ${props => props.height || '2.56'};
    height: ${props => props.height || '2.56'};
    background: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: inherit;
    
    &:after {
        content: '';
        position: absolute;
        border-radius: 50%;
        border: 3px solid #fff;
        width: 30px;
        height: 30px;
        border-left: 3px solid transparent;
        border-bottom: 3px solid transparent;
        animation: ${loading1} 1s ease infinite;
        z-index: 10
    }

    &:before {
    content: '';
    position: absolute;
    border-radius: 50%;
    border: 3px dashed #fff;
    width: 30px;
    height: 30px;
    border-left: 3px solid transparent;
    border-bottom: 3px solid transparent;
    animation: ${loading1} 2s linear infinite;
    z-index: 5
}
}

  & .loader{
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: inherit
  }
`

export const ButtonSecondaryLoadingStyled = styled.button`
  display: flex;
  justify-content:center;
  height: 1.87rem; /* 30px */
  width: ${props => buttonSize[props.size]};
  height: ${props => props.height || '2.56'}; /* 41px */
  margin-left: ${props => props.left};
  background-color: ${props => props.background || props.theme.colors.text_color_hover};
  align-items: center;
  border: 1px solid transparent;
  border-radius: 0.37rem; /* 6px */
  font-family: ${props => props.theme.fonts.texts};
  transition:all 0.15s linear;
  cursor: pointer;
  font-size: ${props => props.theme.fonts_sizes.small_text};
  margin-top: ${props => props.top};
  padding: 1rem;
  color:${props => props.theme.colors.primary};
  
  &:hover{
    background-color: ${props => props.theme.colors.hover};
    color: ${props => props.theme.colors.text_color_hover};
  }
  & .load {
    left: 0px;
    top: 0px;
    margin-left: 30px;
    width: ${props => props.height || '2.56'};
    height: ${props => props.height || '2.56'};
    background: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: inherit;
    
    &:after {
        content: '';
        position: absolute;
        border-radius: 50%;
        border: 3px solid #fff;
        width: 30px;
        height: 30px;
        border-left: 3px solid transparent;
        border-bottom: 3px solid transparent;
        animation: ${loading1} 1s ease infinite;
        z-index: 10
    }

    &:before {
    content: '';
    position: absolute;
    border-radius: 50%;
    border: 3px dashed #fff;
    width: 30px;
    height: 30px;
    border-left: 3px solid transparent;
    border-bottom: 3px solid transparent;
    animation: ${loading1} 2s linear infinite;
    z-index: 5
}
}

  & .loader{
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: inherit
  }
`

export default Button
