import styled from 'styled-components'

const CycleDetailInstitutionStyled = styled.div`
  /* background-color:red; */
  border: ${props => props.theme.container.border};
  font-family: ${props => props.theme.fonts.texts};
  border-radius: 10px;
  background-color: ${props => props.theme.colors.text_color_hover};
  min-height:calc(100vh - 8.5rem);
  max-height: calc(100vh - 10rem);
  width: auto;
  padding: 20px;
  display:flex;
  flex-direction: column;
  justify-content: start;
  align-content: center;
  & .container {
    overflow: auto;
    /* min-height:100; */
    /* background-color: red; */
  }

  & .cycle {
    width:100%;
    display:flex;
    flex-direction:row;
    justify-content: start;
    color: ${(props) => props.theme.colors.texts_color};
    font-family: ${(props) => props.theme.fonts.texts};
    margin-bottom: 10px;
    font-weight: bold;
  }
  & .dates{
    margin-left: 20px; 
  }
  & .table-not-data-cycle{
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
  }

  & .scholarship-form{
    display: flex;
    background: ${props => props.theme.colors.grey_hint};
    flex-direction: column;
    flex-wrap: wrap;
    padding: 10px;
    border-radius: 0.75rem;
    justify-content: space-between;
    align-items: start;
    margin:2px 0px 10px 0px;
    & .number{
      text-align:end;
    }
    & .select{
      width: 99%;
    }
    & .footer{
      display: flex;
      flex-direction:row;
      /* justify-content: end; */
      justify-items: end;
      margin-top: 20px;
      padding: 5px;
    }
  }
`
export default CycleDetailInstitutionStyled
