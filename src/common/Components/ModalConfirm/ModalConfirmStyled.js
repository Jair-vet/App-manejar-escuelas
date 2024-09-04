import styled from 'styled-components'

const ModalConfirmStyled = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #00000082;
  position: absolute;
  top: 0;
  left: 0;
  right:0;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  z-index: 99;
  ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: white;
        }
        ::-webkit-scrollbar-thumb {
          background:  ${(props) => props.theme.colors.grey_hint};
          border-radius: 5px;
          padding: 100px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background:  ${(props) => props.theme.colors.primary};
        }
  & .content-scroll{
    overflow: auto;
    ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: white;
        }
        ::-webkit-scrollbar-thumb {
          background: ${(props) => props.theme.colors.grey_hint};
          border-radius: 5px;
          padding: 100px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background:  ${(props) => props.theme.colors.primary};
        }
  }
  & .container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: start;
    background-color: ${(props) => props.theme.colors.background};
    width: 40%; 
    height: auto; 
    min-height:  ${props => props.height};
    max-height:  calc(100vh -  50px);
    border-radius: ${(props) => props.theme.container.border_radius};
    box-shadow: ${(props) => props.theme.container.box_shadow_modal};
    margin: 20px 40px;
  }

  & .header {
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    & .title{
      width:100%;
      text-align: center;
      font-weight:bold;
      margin:10px 0px 5px 5px;
      font-size: ${props => props.theme.fonts_sizes.medium_texts};
      font-family: ${props => props.theme.fonts.texts};
      color: ${props => props.theme.colors.texts_color};
    }
  }

  & .content {
    padding: 10px;
    display: flex;
    height: 100%;
    flex-direction: column;
    text-align: center;
    align-items: center;
    font-family: ${props => props.theme.fonts.texts};
    color: ${props => props.theme.colors.texts_color};
    & .icon {
      font-size: 3.0rem;
      color:  ${(props) => props.theme.colors.primary};
      margin-bottom: 20px;
    }
  }

  & .footer {
      position: absolute;
      width: 100%;
      bottom:20px;
      display: ${({ customButtons }) => customButtons ? 'none' : 'flex'}; 
      flex-direction: row;
      justify-content: center;
    }

`
export default ModalConfirmStyled
