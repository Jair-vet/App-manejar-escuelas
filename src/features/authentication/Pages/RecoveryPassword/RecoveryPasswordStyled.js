import styled from 'styled-components'

const RecoverPasswordStyled = styled.div`
display: flex;
align-items:center;
width: 70%;
margin:auto;
height:calc(70vh);
font-family: ${props => props.theme.fonts.texts};
justify-content:space-between;

/* STYLES CONTAINER */
background-color:${props => props.theme.colors.color_text};
box-shadow: ${props => props.theme.container.box_shadow};
border:${props => props.theme.container.border};
border-radius: ${props => props.theme.container.border_radius};
  
  & .container-banner{
    width:60%;
    height:100%;
    margin:0px;
    padding:0px;
  }
  & .image-container{
    width:100%;
    height: 100%;
    position:relative;
  }

  & .banner {
    width:100%;
    height: 100%;
    object-fit:cover;
    border-radius: ${props => props.theme.container.border_radius} 0px 0px ${props => props.theme.container.border_radius} ;
  }
  & .container-content-banner {
    width: 100%;
    position: absolute;
    top: 10%;
    left: 0%;
    /* background-color:red */
  }
  & .container-icon{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  & .icon {
    width:140px;
    height: 140px;
    object-fit:cover;
  }
  & .welcome-text{
    text-align: center;
    width: 100%;
    font-size: 35px;
    color: ${(props) => props.theme.colors.text_color_hover};
  }
  & .information-welcome{
    margin-top: 20px;
    width: 100%;
    text-align: center;
    font-size: 20px;
    color: ${(props) => props.theme.colors.text_color_hover};
  }

  & container-buttons{
    display:flex;
    flex-direction:row;
    justify-content:space-between
  }
  @media (max-width: 120rem) /* 1025px */ {
      width: 55%;
  }
  @media (max-width: 48rem) /* 768px */ {
    width: 95%;
    flex-direction: column;
    padding-bottom: 10px;
    /* height:99vh; */
  .container-banner {
    width: 100%;
    height:35%;
  }
  & .banner {
    border-radius: ${props => props.theme.container.border_radius}  ${props => props.theme.container.border_radius} 0px 0px;

  }
  & .icon {
    width:50px;
    height: 50px;
  }
  & .welcome-text{
    font-size:${props => props.theme.fonts_sizes.subtitles}
  }
  & .information-welcome{
    font-size:${props => props.theme.fonts_sizes.extra_small_text};
    top: 50%;
  }
  

  @media (max-width: 37rem) /* 600 */ {
    height:99vh;
  }
}
`

// export const HeaderLogin = styled.div`
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
//   margin-top:20px auto;
// `

export default RecoverPasswordStyled
