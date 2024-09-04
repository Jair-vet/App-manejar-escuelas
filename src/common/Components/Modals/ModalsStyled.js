import styled, { css } from 'styled-components'

const ModalCustomStyled = styled.div`
  width: 100vw;
  height: ${props => props.height || '100vh'};
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
  /* padding-right: 20px; */
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
  & .content-scroll{
    /* background-color:red; */
    margin-right: 3px;
    overflow: ${props => props.overflowContent || 'auto'};
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
    display: flex;
    flex-direction: column;
    justify-content: start;
    background-color: ${(props) => props.theme.colors.text_color_hover};
    width: ${({ width }) => width || css`auto`}; 
    height: auto; 
    max-height:  calc(100vh -  50px);
    /* height: 80%; */
    border-radius: ${(props) => props.theme.container.border_radius};
    /* border: ${(props) => props.theme.container.border}; */
    box-shadow: ${(props) => props.theme.container.box_shadow_modal};
    margin: 20px 40px;
  }
  & .header {
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    align-items: center;
    color: ${(props) => props.theme.colors.title_color};
    padding-left: 10px;
    border-bottom: ${(props) => props.theme.container.border};
    & .titles{
      width:auto;
      /* background-color:red; */
      display:flex;
      flex-direction: column;
      & .title{
        width:100%;
        margin:10px 0px 5px 5px;
        font-family: ${props => props.theme.fonts.texts}
    }
      & .subtitle {
      margin:0px 0px 5px 5px;
      text-align:center;
      width:100%;
      color: ${(props) => props.theme.colors.texts_color};
      font-size:${(props) => props.theme.fonts_sizes.medium_texts};
      }
    }
    
    & .icon{
      font-size: 2.5rem;
      color:  ${(props) => props.theme.colors.title_color};
    }
  }
  & .content {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* background-color:red; */
    
    & .container-loader{
      min-height: 70vh;
      min-width: 70vw;
      display:flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    & .container-body{
      display:flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      flex-wrap: wrap;
      background-color:red;
    }
  }

  & .footer {
      width: 91%;
      /* position:relative; */
      bottom:-1.5rem;
      align-self: flex-end;
      display: ${({ customButtons }) => customButtons ? 'none' : 'flex'}; 
      flex-direction: row;
      justify-content: end;
      /* margin-top: 20px; */
      padding: 20px;

      & .footer-profileSchool{
        display:flex;
        align-items:end;
      }
      & .f-child {
        margin-left: 20px;
      }

      & .container-buttons{
        width:100%;
        display:flex;
        justify-content:end;
        padding:0;
      }
    }

    
`

export const LoaderModalStyled = styled.div`
  width: 100%; 
  display: flex;
  padding:20px 0px 20px 0px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: grid-template-columns 0.5s ease-in-out;
  /* background-color:red; */
  & .title {
    text-align:center;
    width:100%;
    color: ${(props) => props.theme.colors.primary};
    font-weight: bold;
    font-size:${(props) => props.theme.fonts_sizes.large_text};
  } 
  
  & .title-error {
    color: ${(props) => props.theme.colors.error};
    font-weight: bold;
    font-size:${(props) => props.theme.fonts_sizes.large_titles};
  }
  & .message-error{
    color: ${(props) => props.theme.colors.texts_color};
    font-size:${(props) => props.theme.fonts_sizes.texts_color}; 
    font-weight: bold;
    margin: 20px;
  }
  & .loader,
  & .loader:before,
  & .loader:after {
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    animation-fill-mode: both;
    animation: bblFadInOut 1.8s infinite ease-in-out;
  }
  & .loader {
    color: ${(props) => props.theme.colors.primary};
    font-size: 7px;
    position: relative;
    text-indent: -9999em;
    transform: translateZ(0);
    animation-delay: -0.16s;
  }
  & .loader:before,
  & .loader:after {
    content: "";
    position: absolute;
    top: 0;
  }
  & .loader:before {
    left: -3.5em;
    animation-delay: -0.32s;
  }
  & .loader:after {
    left: 3.5em;
  }

  @keyframes bblFadInOut {
    0%,
    80%,
    100% {
      box-shadow: 0 2.5em 0 -1.3em;
    }
    40% {
      box-shadow: 0 2.5em 0 0;
    }
  }
`

export default ModalCustomStyled
