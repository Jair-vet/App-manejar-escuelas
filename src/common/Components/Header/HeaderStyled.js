import styled from 'styled-components'

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-family: ${props => props.theme.fonts.texts};
  color: ${props => props.theme.colors.title_color};
  height: 3.0rem;
  width: 100%;
  box-sizing: border-box;
  transform: ${({ isExpanded }) => (isExpanded ? 'translateX(13rem)' : 'translateX(0)')}; /* Ajusta la traslación según tu diseño */
  transition: transform 0.3s ease-in-out;
  padding-bottom: 1rem;
  cursor: pointer;
  z-index: 2;
  /* background-color: red; */
  & .container-title{
    display:flex;
    align-items:center;
  }
  & .title{
    font-size: ${props => props.theme.fonts_sizes.large_text};
  }
  & .icon-arrow {
    width: 3rem;
    height: 2rem;
    cursor: pointer;
  }
  & .photo-user {
  width: 2rem; /*345px*/
  height: 2rem;
  border-radius: 50%; 
  overflow: hidden; 
  margin-left: 0.5rem;
  }
& span{
  font-size: ${props => props.theme.fonts_sizes.medium_label};
  color: ${props => props.theme.colors.texts_color};
  cursor: pointer;
  font-weight: bold;

  &:checked{
    border-bottom:1px solid ${props => props.theme.colors.primary};
  }
}
`

export const H3 = styled.h3`
  font-size: ${props => props.theme.fonts_sizes.large_titles};
  margin-right: auto;
  padding-left: 0.5rem;
  color: ${props => props.theme.colors.title_color};
`

export const ContainerUser = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position:relative;
  & .user-container{
    display: flex;
    align-items: center;
  }

`


export const ContainerImage = styled.div`
   display: flex;

   
   flex-direction: column-reverse;
  & .configuration{
    position: relative;
    bottom: 0.8rem;
    left: 1.5rem;
    color: ${props => props.theme.colors.primary} ;
  }
`

export default Header
