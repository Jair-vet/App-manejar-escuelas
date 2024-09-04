import styled from 'styled-components'

const FourthStepSettingStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  height: 100%;
  font-family: ${props => props.theme.fonts.texts};
  color: ${props => props.theme.colors.title_color};
  width: 84%;
  position: relative;


  & .title{
    margin: 0;
    inline-size: 0px;
    width:100%;
  }
  & .subtitle{
    width:100%;
    margin: 0;
    color:${props => props.theme.colors.texts_color};
  }
  & .footer {
    position:absolute;
    bottom:0;
    display: flex;
    width:100%;
    align-self: flex-end;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0px 15px 10px 0px;
  }
 
`
export const ContainerSections = styled.div`
  width:100%;
  max-height: calc(100% - 24%);
  display:flex;
  flex-direction: column;
  overflow-y: auto;
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
    width:48%;
    & .title-levels{
      width:100%;
      margin: 10px  0px;
      text-align: center;
      font-size: ${props => props.theme.fonts_sizes.medium_texts};
    }
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
export const ContainerButton = styled.div`
    display: flex;
    width: 100%;
    padding-left: 1rem;
    padding-right: 0.5rem;
    justify-content: end

`

export default FourthStepSettingStyled
