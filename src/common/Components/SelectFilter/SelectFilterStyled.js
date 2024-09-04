import styled from 'styled-components'

const SelectFilterStyled = styled.div`
font-family: ${props => props.theme.fonts.texts} ;
font-size: ${props => props.fontSize || props.theme.fonts_sizes.small_text};
display:flex;
align-items:start;
flex-direction: column;
// margin-left: 10px;
/* width:40%; */
& .name{
  margin-right:10px;
  margin-left: 5px;
}
& .select {
  min-width: 200px;
  border-radius: 0.625rem;
  border: 0.5px solid ${props => props.theme.colors.primary};
  color:${props => props.theme.colors.title_color};
  font-family: ${props => props.theme.fonts.texts} ;
  font-size: ${props => props.fontSize || props.theme.fonts_sizes.medium_texts};
  letter-spacing: 0.5px;
  outline: 0; 
  padding:2px 5px;
  /* padding: 0.7rem 1rem; */
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;

  }

  &:focus {
    border: 2.5px solid ${props => props.theme.colors.primary} ;
    color: ${props => props.theme.colors.title_color};
  }
}



`
export default SelectFilterStyled
