import styled, { css, keyframes } from 'styled-components'

export const FormGlobal = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 0.75rem;
  width: ${props => props.width};
  padding-bottom: ${props => props.bottom};
  background: ${props => props.theme.colors.grey_hint};
  flex-direction: ${props => props.direction || 'row'};
  flex-wrap: wrap;
  padding: ${({ padding }) => padding ? `${padding}` : css`none`};
  
  & .container-button{
    width: 70%;
    display:flex;
    justify-content:end;
    align-items:end;
    padding: 2rem 0 3rem 0;
  }

  & .container-fileds{
    justify-content: space-evenly;
    padding: 1.5rem 0rem
  }
`

export const Form = styled.form`
  display: flex;
  width:100%;
  /* height:100%; */
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 0.75rem;
  background: ${props => props.theme.colors.grey_hint};
  padding: 20px 0px 20px 0px;
  
  /* padding-top: 10px; */


  @media (max-width: 48rem) /* 768px */ {
    height:100%;
  }
`

export const ContainerForm = styled.div`
  display:flex;
  padding:20px 10px 20px 10px;
  justify-content: center;
  align-content:center;
  align-items:center;
  flex-direction:column;
  width: 50%;
  height:100%;

  @media (max-width: 37rem) /* 600 */ {
    overflow:auto;
    width: 95%;
  }
`
export const InputGroup = styled.div`
  width:${props => props.width || '100%'};
  height: ${props => props.heigt};
  /* background-color:yellow; */
  /* padding:0px 10px; */
  margin-top: 0.25rem;
  /* font-size: ${props => props.theme.fonts.links}; */
  font-family:  ${props => props.theme.texts};
  line-height: 1.25rem;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:start;

  &.container-remember{
    display:flex;
    width:20.81rem; /* 333px */
  }
  & .position-password{
    width:100%;
    position:relative;
  }
  & .see-password{
    position: absolute;
    right:1px;
    top:15px;
    bottom:0px;
    cursor: pointer;
    /* background-color:red; */
  
}
  & .personal-files{
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    border-radius: 8px;
    padding: 0.5rem 0;
    border: 1px solid ${props => props.theme.colors.primary};

  }


& .upload-image {
  border: 1px solid ${props => props.theme.colors.primary};
  width: ${props => props.with || '92.5%'};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  gap: 0.5rem;
  padding: 0.85rem 0.8rem 0.85rem 0.8rem ;
  border-radius: 8px;
}

&.item-checkbox{
        width:40%;
        padding-left: 10px;
    }
`

export const InputLabel = styled.label`
  display: ${props => props.display || 'block'};
  align-items: center;
  padding:3px;
  width: ${props => props.white || '92%'};
  color: ${props => props.theme.colors.title_color};
  font-size: ${props => props.fontSize || props.theme.fonts_sizes.medium_texts};
  text-align:start;
  font-weight: ${props => props.weight};
  font-family: ${props => props.theme.fonts.texts} ;


  &.l-remember{
    font-size: 0.62rem;/* 10x */
    display: flex;
    font-weight: bold;
    align-items: center;
    color: ${props => props.theme.colors.primary};
    font-size: ${props => props.theme.fonts_sizes.links};
  }
`

export const Input = styled.input`
  width: ${props => props.width || '92%'}; 
  border-radius: 0.625rem;
  border: 0.5px solid ${props => props.theme.colors.primary};
  color:${props => props.theme.colors.title_color};
  font-family: ${props => props.theme.fonts.texts} ;
  font-size: ${props => props.fontSize || props.theme.fonts_sizes.medium_texts};
  letter-spacing: 0.5px;
  outline: 0; 
  padding: ${props => props.padding || '0.7rem 1rem'};
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &.btn-file{
    width: 96%;
    padding: 0.5rem;
  }

  &.files{
    width: 20%;
    height: 1rem;
    
  }

  &:focus {
    border:2.5px solid ${props => props.theme.colors.primary} ;
    color: ${props => props.theme.colors.title_color};
    transition: all 100ms ease-in-out;
  }
  &:disabled{
    background-color:${props => props.theme.colors.text_color_hover} ;
    border:2.5px solid ${props => props.theme.colors.hover} ;
    color: ${props => props.theme.colors.texts_color};
  }

  &.remember{
    width:21px;

  & :checked {
    color: white;
    background-color: ${props => props.theme.colors.primary};
  } 
}`

export const InputWithoutBorder = styled.input`
  /* border-radius: 0.625rem; */
  border:none;
  border-bottom: 0.5px solid ${props => props.theme.colors.primary};
  text-transform: ${props => props.textTransform || 'none'};;
  color:${props => props.theme.colors.title_color};
  font-family: ${props => props.theme.fonts.texts} ;
  letter-spacing: 0.5px;
  background-color:${props => props.theme.colors.grey_hint};
  outline: 0; 
  padding: ${props => props.padding || '0.7rem 1rem'};
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export const InputErrorStyled = styled.p`
    color: ${props => props.theme.colors.error};
    font-size: 12px;
    font-weight: bold;
    margin:2px 0px 0px 10px;

`

export const Select = styled.select`
  width: 100%; 
  border-radius: 0.625rem;
  border: 0.5px solid ${props => props.theme.colors.primary};
  color:${props => props.theme.colors.title_color};
  font-family: ${props => props.theme.fonts.texts} ;
  font-size: ${props => props.fontSize || props.theme.fonts_sizes.medium_texts};
  letter-spacing: 0.5px;
  outline: 0; 
  padding: 0.7rem 1rem;
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;

  }

  &:focus {
    border: 2.5px solid ${props => props.theme.colors.primary} ;
    color: ${props => props.theme.colors.title_color};
  }

  &.remember{
    width:21px;

  &:checked {
    color: white;
    background-color: ${props => props.theme.colors.primary};
  }
}
`
export const Forgot = styled.div`
  display: flex;
  justify-content: flex-end;
  line-height: 1rem;
  color: ${props => props.theme.colors.primary};
  margin: 0.62rem 0 0.87rem 8rem; /* 10px 0px 14px 128px */
`

export const StyledLink = styled.a`
  font-weight: bold;
  color: ${props => props.theme.colors.primary} ;
  text-decoration: none;
  font-size: ${props => props.theme.fonts_sizes.links};
  text-align:center;
`

export const TitleFormStyled = styled.a`
  font-family: ${props => props.theme.fonts.texts};
  font-size: ${props => props.theme.fonts_sizes.titles};
  color: ${props => props.theme.colors.primary};
  font-weight:bold;
`
export default Form

export const ContainerDate = styled.div`
  width: 10rem;
`

export const InputCheck = styled.input`
  height: 0;
  width: 0;
  opacity: 0;
  z-index: -1;
`
export const CheckBoxStyled = styled.div`
  min-width:100%;
`

export const LabelCheck = styled.label`
  /* width:100%; */
  position: relative;
  display: inline-block;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  margin: 0.6em 1em;
`

export const rotate = keyframes`
  from {
    opacity: 0;
    transform: rotate(0deg);
  }
  to {
    opacity: 1;
    transform: rotate(45deg);
  }
`
export const Indicator = styled.div`
  width: 1.2em;
  height: 1.2em;
  background: ${props => props.theme.colors.text_color_hover};
  position: absolute;
  top: 0em;
  left: ${props => props.left || '-1.6em'} ;
  border:solid 1px ${props => props.theme.colors.primary};
  border-radius: 0.2em;

  ${InputCheck}:not(:disabled):checked & {
    background: #${props => props.theme.colors.hover};
  }

  ${LabelCheck}:hover & {
    background: #${props => props.theme.colors.hover};
  }

  &::after {
    content: "";
    position: absolute;
    display: none;
  }

  ${InputCheck}:checked + &::after {
    display: block;
    top: 0.1em;
    left: 0.35em;
    width: 35%;
    height: 70%;
    border: solid ${props => props.theme.colors.primary};
    border-width: 0 0.2em 0.2em 0;
    animation-name: ${rotate};
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
  }

  &::disabled {
    cursor: not-allowed;
  }
`

export const Divider = styled.div`
  width: ${({ width }) => width ? `${width}` : css`100%`};
  height: 1px;
  margin:2px 0px 2px 0px;
  background-color:${props => props.theme.colors.primary};
`

export const TitleSection = styled.span`
  width: ${({ width }) => width ? `${width}` : css`100%`};
  font-weight: bold;
  font-size: ${props => props.theme.fonts_sizes.medium_texts};
  color: ${props => props.theme.colors.title_color};

`
