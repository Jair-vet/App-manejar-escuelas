import styled from 'styled-components'

export const SectionsStyled = styled.div`
        width:100%;
        /* background-color:red; */
        overflow-x:auto;
        flex-wrap: wrap; 
        display:flex;
        justify-content:start;
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: white;
        }
        ::-webkit-scrollbar-thumb {
          background: #ebebeb;
          padding: 100px;
          border-radius: 10px;

        }
        ::-webkit-scrollbar-thumb:hover {
          background: #13c5a4;
        }
        & .item{ 
          /* background-color:red; */
          width:90%;
          display:flex;
          flex-direction: column;
          justify-content:start;
          font-weight: bold;
          padding-left: 20px;
        }
        & .section-container{ 
          width:100%;
          height:auto;
          display:flex;
          flex-direction: column;
          padding-left: 30px;
        }
`

export const ContainerSections = styled.div`
  width:100%;
  height: calc(100vh - 200px);
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  /* background-color: red; */
  /* overflow-y: auto; */
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: white;
  }
  ::-webkit-scrollbar-thumb {
    background: #EBEBEB;
    border-radius: 5px;
    padding: 100px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #13c5a4;
  }
  & .sections-content {
    /* background: #13c5a4; */
    overflow:auto;
    width:70%;
    height: 100%;
    ::-webkit-scrollbar {
    width: 10px;
    }
    ::-webkit-scrollbar-track {
      background: white;
    }
    ::-webkit-scrollbar-thumb {
      background: #EBEBEB;
      border-radius: 5px;
      padding: 100px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #13c5a4;
    }
  }
  & .groups-content {
    /* background: blue; */
    width:28%;
    
    & .groups{
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 0.75rem;
      background: ${props => props.theme.colors.grey_hint};
      padding: 20px;
      min-height:74%;
      ::-webkit-scrollbar {
    width: 10px;
    }
    ::-webkit-scrollbar-track {
      background: white;
    }
    ::-webkit-scrollbar-thumb {
      background: #EBEBEB;
      border-radius: 5px;
      padding: 100px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #13c5a4;
    }
      & span {
        margin-bottom: 10px;
      }
    }
  }
  & .section-name{
    font-weight: bold;
    font-size: ${props => props.theme.fonts_sizes.large_text};
    margin-bottom: 10px;
  }
  & .add-section{
    width:98%;
    margin-top: 5px;
}
`

export const DeleteSectionContainer = styled.div`
  display:flex;
  align-self:flex-end;
  flex-direction: row;
  justify-content:center;
  align-items:center;
  color:${props => props.theme.colors.primary};
  & > *:first-child {
    margin-left: 10px;
  }
`

export const ChildSectionName = styled.div`
    & .element{
      display:flex;
      width:100%;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      & .select {
        background-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.background};
      }
    }
    
  & .label{
    cursor:pointer;
    min-width: 60%;
    border-radius: 5px;
    transition: all 0.3s;
    padding: 2px 0px 2px 6px;
    :hover{
        background-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.background};
        
    }
  } 
  
  & .actions{
    padding: 2px 0px 2px 6px;
    display:flex;
    align-items:center;
    & .icon{
        font-size:${props => props.theme.fonts_sizes.titles};
        cursor:pointer;
      }
    & .delete{
      color:${props => props.theme.colors.error};
    }
    & .edit{
      color:${props => props.theme.colors.primary};
    }
    & .detail{
      margin-left: 5px;
      color:${props => props.theme.colors.primary};
      font-size: 1rem;
    }
  }

`

export const SectionStyled = styled.div`
  width: 96%;
  margin-top: 20px;
  padding: 10px;
  border-radius: ${props => props.theme.container.border_radius};
  background-color: ${props => props.theme.colors.grey_hint};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: start;

  & .button-text{
      width:100%;
      color:  ${props => props.theme.colors.primary};
      text-decoration: underline;
      text-align:end;
      cursor:pointer;
  }

  & .items{
    width:100%;
    display:flex;
    flex-direction:row;
    align-items:start;
    /* background-color:blue; */
    justify-content: space-between;
  }
  & .item{
    /* width:50%; */
    & .title-container{
      width:100%;
      margin: 10px  0px;
      text-align: center;
      font-size: ${props => props.theme.fonts_sizes.medium_texts};
    }
  }
  & .item:nth-child(1) {
    min-width: 50%;
    /* background-color: yellow; */

  }
  & .item:nth-child(2) {
    /* width: 40%; */
    /* background-color: green; */

  }
  & .input-level{
    font-weight: bold;
  }
  & .cont-input-level{
    display:flex;
    width:100%;
    flex-direction: row;
    justify-content:space-between;
    align-items:center;
  }
  & .cont-icon-done{
    cursor:pointer;
    margin-left: 10px;
    width:25px;
    height:25px;
    border-radius:15px;
    display:flex;
    align-items:center;
    justify-content:center;
    background-color:${props => props.theme.colors.primary};
    
    & .icon-done{
        font-size:${props => props.theme.fonts_sizes.titles};
        color:${props => props.theme.colors.text_color_hover};
        cursor:hover;
      }
  } 
  
  & .contaner-levels{
    /* background-color: red; */
    width:100%;
    & .level{
      display:flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      & .icon{
        font-size:${props => props.theme.fonts_sizes.titles};
        color:${props => props.theme.colors.error};
        cursor:hover;
      }
      & .icon-edit{
        color:${props => props.theme.colors.primary};
        cursor:hover;
      }
    }
  }

`
export default SectionsStyled
