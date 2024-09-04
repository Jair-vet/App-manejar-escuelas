import styled from 'styled-components'

const StudentStyled = styled.div`
  /* width:100%; */
  /* min-height:calc(100vh - 6rem); */
  /* max-height: 100vh; */
  /* border: ${props => props.theme.container.border};
  border-radius: 10px;
  background-color: ${props => props.theme.colors.text_color_hover};
  margin:0px;
  padding: 20px;
  border: 0;
  min-height:calc(100vh - 8rem);
  max-height: 100vh;
  max-width: 97.5%;
  overflow: auto; */
  border: ${props => props.theme.container.border};
  font-family: ${props => props.theme.fonts.texts};
  border-radius: 10px;
  background-color: ${props => props.theme.colors.text_color_hover};
  min-height:calc(100vh - 8.5rem);
  max-height: calc(100vh - 10rem);
  width: auto;
  height: auto;
  padding: 20px;
  display:flex;
  flex-direction: column;
  justify-content: start;
  align-content: center;
  // align-items: center;
  .container {
    overflow: auto;
    /* background-color: yellow; */
    /* text-overflow: ellipsis; */
    /* white-space: nowrap; */
    ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: white;
  }
  ::-webkit-scrollbar-thumb {
    background: #ebebeb;
    border-radius: 5px;
    padding: 100px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #13c5a4;
  }
  }
  
`

export const FooterMasiveStudentsModal = styled.div`
  width: 100%;
  display:flex;
  flex-direction:row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  & .item{
    /* width:50%; */
    display:flex;
  }
  & .error-text{
    font-weight: bolder;
    font-size: ${(props) => props.theme.fonts_sizes.small_text};
    color: ${(props) => props.theme.colors.error};
  }
`
export const CreateStudentsButtons = styled.div`
  width:${props => props.width || '60%'};
  display:flex;
  flex-direction: row;
  justify-content:${props => props.justify || 'space-between'};
  align-items:${props => props.items || 'center'} ;
  gap: ${props => props.gap};
`

export const ContainerFileMasive = styled.div`
  border: 1.5px dashed ${props => props.theme.colors.texts_color};
  height: 7rem;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  padding: 0.5rem 0;
  cursor: pointer;

  & span{
    display: block;
  }
  & .icon-upload{
    color: ${props => props.theme.colors.primary};
    margin-top: 1rem;
  }

  & img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export const TableStudentStyled = styled.table`
  width: 100%;

`

export const TableBody = styled.tbody`
width: 100%;
`

export const StyledStudentHeader = styled.div`
  border:1px solid red;
  wid
`
export const ContainerBottom = styled.div`
  border :1px solid red;
  `
export default StudentStyled

export const ContainerStudent = styled.div`
  display: flex;
  gap: .6rem;
`
