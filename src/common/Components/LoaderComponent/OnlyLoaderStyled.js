import styled from 'styled-components'

const OnlyLoaderStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  transition: grid-template-columns 0.5s ease-in-out;
  .title {
    text-align:center;
    width:100%;
    color: ${(props) => props.theme.colors.primary};
    font-weight: bold;
    font-size:${(props) => props.theme.fonts_sizes.large_text};
  }
  .loader,
  .loader:before,
  .loader:after {
    border-radius: 100%;
    width: 2.5em;
    height: 2.5em;
    animation-fill-mode: both;
    animation: bblFadInOut 1.8s infinite ease-in-out;
  }
  .loader {
    color: ${(props) => props.theme.colors.primary};
    font-size: 7px;
    position: relative;
    text-indent: -9999em;
    transform: translateZ(0);
    animation-delay: -0.16s;
  }
  .loader:before,
  .loader:after {
    content: "";
    position: absolute;
    top: 0;
  }
  .loader:before {
    left: -3.5em;
    animation-delay: -0.32s;
  }
  .loader:after {
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
export default OnlyLoaderStyled

export const GlobalLoader = styled.span`
    transition: grid-template-columns 0.5s ease-in-out;
    color: ${(props) => props.theme.colors.primary};
    font-size: 7px;
    position: relative;
    text-indent: -9999em;
    transform: translateZ(0);
    animation-delay: -0.16s;
  &:before,
  &:after {
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    animation-fill-mode: both;
    animation: bblFadInOut 1.8s infinite ease-in-out;
  }
  
  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
  }
  &:before {
    left: -3.5em;
    animation-delay: -0.32s;
  }
  &:after {
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
