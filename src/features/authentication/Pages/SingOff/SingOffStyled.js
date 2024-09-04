import styled from 'styled-components'

const SignOff = styled.div`
  position: absolute;
  top: 2.4rem;
  left:10;
  max-width: 180px;
  right:0;
  /* width:auto; */
  box-shadow: 0px 0px 0px ${props => props.theme.colors.primary};
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.primary};
  display: flex;
  flex-direction: column;
  background-color:${props => props.theme.colors.text_color_hover};
  box-shadow: 10px 20px 20px 0px rgba(231, 229, 229, 0.65); 
  z-index:2;

  & .custom-font{
    font-family: ${props => props.theme.fonts.texts};
  }
  & .container-button{
    display: flex;
    justify-content: center;
    margin-bottom: 0.5rem;
    margin: 1rem;
    }

    & ul{
      padding: 0px 1rem;
    }
    
`

export const SignOffOption = styled.div`
  & li {
    font-family: ${props => props.theme.fonts.texts};
    list-style: none;
    padding: 0.5rem 0.3rem;
    color: ${props => props.theme.colors.text};
    width: 100%;
    height: 1rem;
    border-radius: 8px;
    &:hover{
      cursor: pointer;
      color: white;
      background-color: ${props => props.theme.colors.primary};
    }
  }
  
`

export default SignOff
