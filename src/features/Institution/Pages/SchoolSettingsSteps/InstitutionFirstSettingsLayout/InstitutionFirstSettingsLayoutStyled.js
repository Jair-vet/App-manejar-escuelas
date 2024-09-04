import styled from 'styled-components'

const InstitutionSettings = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  height: 100vh;
  width: 100vw;
  /* background-color:yellow; */
  & .content{
    display: flex;
    flex-direction: row;
    gap: 5rem;
    align-items: center;
    width: 80%;
    margin: auto;
    height: calc(80vh);
    padding:10px;
      /* STYLES CONTAINER */
    background-color: ${(props) => props.theme.colors.color_text};
    box-shadow: ${(props) => props.theme.container.box_shadow};
    border: ${(props) => props.theme.container.border};
    border-radius: ${(props) => props.theme.container.border_radius};
  }
`
export default InstitutionSettings
