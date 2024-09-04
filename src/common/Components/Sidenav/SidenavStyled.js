import styled from 'styled-components'

const Sidenav = styled.div`
  display: grid;
  background-color: ${props => props.theme.colors.text_color_hover};
  grid-template: 3rem calc(100vh - 3rem) / ${props =>
    !props.expandSidenav ? '5rem' : '13rem '};
  transition: all 300ms ease-in-out;

  & .container-logo{
    max-width: 80%;
    height:60px;
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius: 50%;
  }
  & .logo-ssusy{
    width:100%;
    height: 100%;
    border-radius: 50%;
    transition: all 300ms ease-in-out;
  }
  & .name-school{
    color:  ${props => props.theme.colors.title_color};
    font-size:${props => props.theme.fonts_sizes.texts_color};
    font-weight: bold;
    text-align:center;
    transition: display 300ms ease-in-out;
  }
  & .name-school-not-show{
    display:none
  }
  & .modules{
    /* background-color: red; */
    height:calc(100vh - 355px);
    overflow-y:auto;

  }
  & .container-btn{ 
    position:relative;
    width:100%;


    & .back-btn-main{
    position: absolute;
    display:inline;
    width:30px;
    height:30px;
    background-color:${props => props.theme.colors.primary};
    border-radius: 20px;
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    cursor: pointer;
    right:0px;
    color:${props => props.theme.colors.background};
    top: -21px;
    /* & i{ */
    & .btn-Menu{
      font-size:1.2rem;
      /* color:${props => props.theme.colors.background}; */
      /* display: flex; */
      /* justify-content: center; */
      /* align-items: center; */
      /* margin-top: 1rem; */
      /* position:absolute; */
      /* right:-10px; */
      /* width:20px; */
      /* align-self: center; */
      /* height:20px; */
    /* } */
    }
  }
  }
  
  /* @media(max-width:80rem){
    width: 40%;
  } */

  @media (max-width: 48rem ){ /**768px  Tables & Ipad*/
    top: 0.5rem;
    left: 0.5rem;
    max-width: 80%;
  }

  @media(min-width:20rem){
    .logo-ssusy{
      width: 4rem;
      height: 4rem;
      left: 0.5rem;
    }
  }
`

export const ContainerSidenav = styled.div`
  grid-column: 1/2;
  grid-row: 1/3;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;    
  max-width: 6.25rem; /*100px*/
  border:${props => props.theme.container.border};
  box-shadow: ${props => props.theme.container.box_shadow};
  transition: all 300ms ease-in-out;
  grid-row-gap: 1.3rem;
  padding-top: 2rem;
  &.open{
    max-width: 13rem;
  & i{
    padding:0 0.5rem 0;
  }
  
  & .container-logo{
    width: 8rem;
    height: 8rem;
    margin-left: 2.5rem;
    transition: all 300ms ease-in-out;
  }
  & .logo-ssusy{
      width: 8rem;
      height: 8rem;
    }
    
    & span{
      display: inline;
    }
  }
  & .version-cont{
    position:relative;
    & .version{
    color: ${props => props.theme.colors.texts_color};
    font-family: ${props => props.theme.fonts.texts};
    text-align:center;
    position:absolute;
    right:0px;
    left:0px;
    font-weight: bold;
    font-size: ${props => props.theme.fonts_sizes.links};
  }
  

  

  @media(max-width:48rem){
    grid-row-gap: 1rem;
    max-width: 2.25rem;

    & i{
      font-size: 1rem;
    }

    &.open{
      max-width: 5rem;

    }
    .version{
      font-size:  ${props => props.theme.fonts_sizes.links};
    }
  }
  @media(max-width: 20rem){
    &.open {
      .logo-ssusy{
      width: auto;
      height: auto;
      left: 0;
      }
    }
  }}
`
export const ToltipStyled = styled.abbr`
  text-decoration: none;
  
`

export const OptionSidenav = styled.div`
  & .cont-icon {
    display:flex;
    align-items: center;
    width: 95%;
    margin:0px auto;
    padding: 0.25rem;
    border-radius:5px;
    display: flex;
    align-self: center;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    transition: all 300ms ease-in-out;
    color: ${props => props.theme.colors.background};
    /* background-color:red; */
    overflow: hidden;
    gap: 0.8rem;
    cursor: pointer;
    margin-bottom:4px;
  }
  & img{
    width: 13px;
  }

  & .icons-sidenav{
    width: 13px;
    height: 13px;
    font-size: 1.5rem;
  }
  & .home{
    width:30px;
    height:30px
  }

  &:hover{
    background: ${props => props.theme.colors.primary};
    opacity: 90%;
    color: ${props => props.theme.colors.text_color_hover};

    & span {
      /* display: inline; */
      color: ${props => props.theme.colors.text_color_hover};
    }

    & .container-icon{
    background-color: white;
    }

    & .icons-sidenav{
      filter: invert(53%) sepia(76%) saturate(474%) 
      hue-rotate(119deg) brightness(101%) contrast(91%);
    }
  }
  .selected-option{
    background: ${props => props.theme.colors.primary};
    opacity: 90%;
    color: ${props => props.theme.colors.text_color_hover};

    & span {
      color: ${props => props.theme.colors.text_color_hover};
    }

    & .container-icon{
    background-color: white;
    }

    & .icons-sidenav{
      filter: invert(53%) sepia(76%) saturate(474%) 
      hue-rotate(119deg) brightness(101%) contrast(91%);
    }
  }
  & span{
    font-size: ${props => props.theme.fonts_sizes.labels};
    font-family: ${props => props.theme.fonts.texts};
    color: ${props => props.theme.colors.texts_color};
    padding: auto;
    display: none;
    transition: opacity 1s ease;
  }
  & .container-icon-bg{
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 1px solid ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.primary};
    transition: all 100ms ease-in-out;
    & .icon{
      color: ${props => props.theme.colors.background};
    }
    & .icon-select {
      color: ${props => props.theme.colors.primary};

    }
  }
  

  & .container-icon{
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 1px solid ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.primary};
    transition: all 100ms ease-in-out;
  }
  & .open{
    justify-content: start;
    transition: all 300ms ease-in-out;
  }

  @media(max-width:48rem){
    justify-content: flex-start;
    padding: 0.5rem 0;

    & span{
      letter-spacing: 0px;
    }
  }

  @media(max-width:80rem){
    letter-spacing: 0px;
  }
`
export default Sidenav
