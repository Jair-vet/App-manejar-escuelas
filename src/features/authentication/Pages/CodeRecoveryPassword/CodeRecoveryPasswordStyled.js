import styled from 'styled-components'

const CodeRecoveryPasswordStyled = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  margin: auto;
  height: calc(70vh);
  font-family: ${(props) => props.theme.fonts.texts};
  justify-content: space-between;

  /* STYLES CONTAINER */
  background-color: ${(props) => props.theme.colors.color_text};
  box-shadow: ${(props) => props.theme.container.box_shadow};
  border: ${(props) => props.theme.container.border};
  border-radius: ${(props) => props.theme.container.border_radius};

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
    top: 10%;
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
    font-size: 35px;
    color: ${(props) => props.theme.colors.text_color_hover};
  }
  & .information-welcome {
    margin-top: 20px;
    width: 100%;
    text-align: center;
    font-size: 20px;
    color: ${(props) => props.theme.colors.text_color_hover};
  }

  & container-buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  @media (max-width: 120rem) /* 1025px */ {
    width: 45%;
  }
  @media (max-width: 48rem) /* 768px */ {
    width: 95%;
    flex-direction: column;
    padding-bottom: 10px;
    /* height:99vh; */
    .container-banner {
      width: 100%;
      height: 35%;
    }
    & .banner {
      border-radius: ${(props) => props.theme.container.border_radius}
        ${(props) => props.theme.container.border_radius} 0px 0px;
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

    @media (max-width: 37rem) /* 600 */ {
      height: 99vh;
    }
  }
`

export const ContainerInputsCodes = styled.div`
  display: flex;
  width:90%;
  flex-direction: row;
  justify-content: space-around;
  /* background-color:red; */
`

export const HeaderLogin = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 20px auto;
  /* background-color:red; */
`

export const ContainerFormCodeRecovery = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-direction: column;
  width: 70%;
  height: 100%;
  padding: 0px 10px 0px 10px;
  @media (max-width: 48rem) /* 768px */ {
    width: 100%;
  }

  @media (max-width: 37rem) /* 600 */ {
    overflow: auto;
  }
`

export const InputCode = styled.input`
  width: 13.0%; 
  border-radius: 0.625rem;
  border: 0.5px solid ${props => props.theme.colors.primary};
  font-weight: bold;
  font-size:${props => props.theme.fonts_sizes.large_text};
  color:${props => props.theme.colors.primary};
  text-align:center;
  outline: 0; 
  padding: 0.75rem 1rem;
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &:focus {
    border:2.5px solid ${props => props.theme.colors.primary} ;
  }
`
export const ContainerButtonsCode = styled.div`
width:80%;
display:flex;
flex-direction: row;
justify-content:space-between;
`
export default CodeRecoveryPasswordStyled
