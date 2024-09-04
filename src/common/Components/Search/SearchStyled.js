import styled, { css } from 'styled-components'

const Search = styled.div`
  height: ${({ height }) => height ? `${height}` : css`3rem`};
  width: ${({ width }) => width ? `${width}` : css`none`};
  border-radius: 8px;
  box-shadow:${({ shadow }) => shadow ? `${props => props.theme.container.box_shadow}` : css`none`};
  border:${props => props.theme.container.border};
  display: flex;
  justify-content:space-between;
  align-items:${({ alignItems }) => alignItems ? `${alignItems}` : css`center`};
  padding:${({ padding }) => padding ? `${padding}` : css`0px 1rem`};
  margin-bottom:${props => props.bottom || '0.5rem'};
  background-color: ${props => props.theme.colors.background};
  flex-direction:row;
  flex-wrap:${props => props.flexWrap || 'wrap'};
  gap: 1rem
&.btn {
    margin-left: ${props => (props.isSearchOpen ? '30rem' : '0')};
  }

  @media(max-width:80rem){

    &.btn{
      margin-left: 43rem;
    }
  }

  @media (max-width: 48rem){
    display: none;
  }

  & .search{
    border:1px solid red;
    padding-top:1rem;
  }
`

export const InputSearch = styled.div`
  display: flex;

& input{
  border: 0.5px solid ${props => props.theme.colors.primary} ;
  height: 2rem;
  border-radius: 0.5rem; /*  8px*/
  width: 18rem;
  outline: none;
  margin-left: -1.5rem;
  padding: 0rem 0rem 0rem 1.5rem ;
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  
  }
  &:focus {
    border: 2.5px solid ${props => props.theme.colors.hover};
    color: ${props => props.theme.colors.texts_color};
    
  }
}

& .search-icon{
  position: relative;
  top: 1rem;
  left: 0.2rem;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.primary};
  padding-left: 2px;
  opacity: 1;
}

&:focus{
  opacity: 0;
}

& .container-icon-search{
  display: flex;
}


`

export default Search
