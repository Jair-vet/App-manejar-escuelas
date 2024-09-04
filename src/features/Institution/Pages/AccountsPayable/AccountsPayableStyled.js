import styled from 'styled-components'

const AccountsPayableStyled = styled.div`
  /* background-color:red; */
  height:calc(100vh - 130px);
  width: 100%;
  & .container-top {
    display:flex;
    flex-direction: row;
    justify-content: space-between;
  }
  & .container-table {
    overflow:auto;
    background-color:  ${props => props.theme.colors.background};;
    border-radius: ${props => props.theme.container.border_radius};
    /* max-height: 50%; */
    min-height:95%;
    max-height:95%;
    border: ${props => props.theme.container.border};
    box-shadow:  ${props => props.theme.container.box_shadow};
    padding: 5px;

    ::-webkit-scrollbar {
        width: 10px;
    }
    ::-webkit-scrollbar-track {
        background: white;
    }
    ::-webkit-scrollbar-thumb {
        background: #D1D1D1;
        border-radius: 5px;
        padding: 100px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #13c5a4;
    }
  }
`

export default AccountsPayableStyled
