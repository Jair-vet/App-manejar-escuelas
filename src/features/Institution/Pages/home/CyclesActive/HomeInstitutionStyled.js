import styled from 'styled-components'

const HomeInstitutionStyled = styled.div`
  /* background-color:red; */
  border: ${props => props.theme.container.border};
  font-family: ${props => props.theme.fonts.texts};
  border-radius: 10px;
  background-color: ${props => props.theme.colors.text_color_hover};
  height:calc(100vh - 145px);
  width: 96.5%;
  padding: 20px;
  display:flex;
  flex-direction: column;
  justify-content: start;
  align-content: center;
  & .container {
    overflow: auto;
  }

 
  & .cycle {
    width:100%;
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    color: ${(props) => props.theme.colors.texts_color};
    font-family: ${(props) => props.theme.fonts.texts};
    margin-bottom: 10px;
    font-weight: bold;
  }
  & .table-not-data-cycle{
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
  }
`

export const ContainerModalMasive = styled.div`
  .container-layout{
    margin-top: 10px;
    border: ${(props) => props.theme.container.border};
    border-radius: 10px;
    padding: 10px;
    display:flex;
    flex-direction: column;
    & .subtitle-section{
      font-weight:bold;
      cursor: pointer;
    }
    & .item{
      justify-content:space-between;
    }
    & .container-button{
      width:100%;
      display:flex;
      flex-direction: row;
      justify-content:end;
    }
  }
  & .cont-file-download{
    display:flex;
    text-decoration: none;
    color: ${(props) => props.theme.colors.primary};
    margin:10px 0px 10px 0px; 
    align-self: end;
    justify-content: end;
    flex-direction: row;
    cursor: pointer;
    background-color:${(props) => props.theme.colors.primary};
    border-radius: 10px;
    color:${(props) => props.theme.colors.background};
    padding: 2px 10px 2px 10px;
    &:hover{
      background-color: ${props => props.theme.colors.hover};
      color: ${props => props.theme.colors.text_color_hover};
    }
    & .selects{
      display:flex;
      flex-direction: row;
      margin-bottom:10px;
      & .item {
        max-width:40%;
      }
    }

  }
  & .icon{
    margin-left: 10px;
    color: ${props => props.color}
  }
`
export default HomeInstitutionStyled
