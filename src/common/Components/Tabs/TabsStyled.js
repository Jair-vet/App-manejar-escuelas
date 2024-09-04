import styled from 'styled-components'

const TabsStyled = styled.div`
  /* width: 20rem; */
  height: 2rem;
  gap: 2px;
  display: flex;
  font-family: ${props => props.theme.fonts.texts};
  margin-bottom: 20px;
  .selected{
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text_color_hover};
    border: ${props => props.theme.colors.primary};
  }

  @media(max-width:80rem){
    right: 25rem;
    bottom: 10.5rem;
  }
  @media(max-width:48rem){
    right: 13rem;
  }
  
`
export const ContainerItems = styled.div`
  width: auto;
  height: 2rem;
  border: ${props => props.theme.container.border};
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 0.2rem 1rem;
  flex-direction: column;
  margin:3px;
  background-color: ${props => props.theme.colors.background};
  cursor:pointer;
  &:hover{
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text_color_hover};
  }
  .subtitle{
    width:100%;
    font-size: ${props => props.theme.fonts_sizes.extra_small_text};
    font-weight: normal;
  }


`
export default TabsStyled
