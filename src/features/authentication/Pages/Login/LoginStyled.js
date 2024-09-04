import styled from 'styled-components'

export const LoginStyled = styled.div`
  display: block;
  width:100%;
  // background: blue;

  & .container-global{
    width: 70%;
    margin: auto;
    height: calc(80vh);
    background-color: ${(props) => props.theme.colors.color_text};
    box-shadow: ${(props) => props.theme.container.box_shadow};
    border: ${(props) => props.theme.container.border};
    border-radius: ${(props) => props.theme.container.border_radius};
    display: flex;
    font-family: ${(props) => props.theme.fonts.texts};
    justify-content: space-between;

  & .container-banner {
    width: 60%;
    height: 100%;
    margin: 0px;
    padding: 0px;
  }
  & .image-container {
    width: 100%;
    height: 100%;
    position: relative;


  }

  & .banner {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${(props) => props.theme.container.border_radius} 0px 0px
    ${(props) => props.theme.container.border_radius};
  }
  
  & .container-content-banner {
    width: 100%;
    position: absolute;
    top: 25%;
    left: 0%;
  }
  & .container-icon {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  & .icon {
    width: 140px;
    height: 140px;
    object-fit: cover;
  }
  & .welcome-text {
    text-align: center;
    width: 100%;
    font-size: ${(props) => props.theme.fonts_sizes.subtitles};
    color: ${(props) => props.theme.colors.text_color_hover};
  }
  & .information-welcome {
    margin-top: 20px;
    width: 100%;
    text-align: center;
    font-size: 20px;
    color: ${(props) => props.theme.colors.text_color_hover};
  }
  & .recovery-password {
    width: 100%;
    margin-top: 10px;
    /* background-color:red; */
    text-align: end;
    & a {
      color: ${(props) => props.theme.colors.primary};
      cursor: pointer;
      text-decoration: underline;
      font-size: 12px;
      text-align: center;
    }
  }

  & .container-fields{
    display:flex;
    flex-direction: column;
    width:80%;
    padding: 0px 10px 0px 10px;
  }
  
  
  @media (max-width: 60rem) /* 960 */ {
    width: 80%;
  }
  @media (max-width: 48rem) /* 768px */ {
    width: 96%;
    
      @media (max-width: 37rem) /* 600 */ {
      height: 99vh;
      flex-direction: column;

      .container-banner {
        width: 100%;
        height: 35%;
      }
      & .banner {
        border-radius: ${(props) => props.theme.container.border_radius}
          ${(props) => props.theme.container.border_radius} 0px 0px;
      }
      & .banner-background {
        background: rgb(36, 195, 164);
        background: linear-gradient(
          90deg,
          rgba(36, 195, 164, 1) 0%,
          rgba(89, 53, 228, 1) 100%
        );
      }
      & .icon {
        width: 50px;
        height: 50px;
      }
      & .welcome-text {
        font-size: ${(props) => props.theme.fonts_sizes.subtitles};
      }
      & .information-welcome {
        font-size: ${(props) => props.theme.fonts_sizes.extra_small_text};
        top: 50%;
      }
    }
    }
  }
`

export const HeaderLogin = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 20px 0px 20px 0px;
`
export const ContainerCreateAccount = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & p {
    color: ${(props) => props.theme.colors.texts_color};
    margin: 10px 0px;
  }
  & a {
    color: ${(props) => props.theme.colors.primary};
    font-weight: bold;
    text-decoration: underline;
    margin-left: 10px;
    &:visited {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`

export const H1 = styled.h1`
  font-family: ${(props) => props.theme.fonts.texts};
  font-size: ${(props) => props.theme.fonts_sizes.titles};
  color: ${(props) => props.theme.colors.primary}; 
`

export const FooterLogin = styled.div`
  font-size: 12px;
  display: flex;
  width: 100%;
  padding: 0 0.5rem;
  color: ${props => props.theme.colors.primary};
`
export default LoginStyled
