import styled from 'styled-components'

export const LayoutAuthStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width:100vw;
  height:100vh;
  // background: red;
  .version{
    margin-top: 10px;
    font-size: ${(props) => props.theme.fonts_sizes.links};
    color: ${(props) => props.theme.colors.texts_color};
    font-weight:bold;
  }
`
export default LayoutAuthStyled
