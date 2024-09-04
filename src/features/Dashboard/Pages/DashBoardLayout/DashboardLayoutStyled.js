import styled, { css } from 'styled-components'

const DashboardLayout = styled.div`
  display:flex;
  flex-direction:row;
  align-items: flex-start;
  justify-content:space-between;
  height: 100vh;
  width:100vw;
  transition: grid-template-columns 0.5s ease-in-out; 

  @media (max-width: 48rem){ /**768 px */
    width: 100%;
    font-size: ${props => props.theme.fonts_sizes.links} ;
    grid-template-columns: ${({ isExpanded }) => isExpanded ? '3rem 1fr' : '3rem 1fr'}; 
    grid-template-rows: 60px 1fr;
  }
`

export const ContainerDataViewStyled = styled.div`
  display: grid;
  height: calc(100vh - 3rem);
  /* height: 80%; */
  display:flex;
  flex-direction:column;
  width: ${({ isExpanded }) => isExpanded ? css`calc(100vw - 20rem)` : css`calc(100% - 5rem)`};
  grid-column: 2/3;
  grid-row: 2/2;
  padding: 0px 10px 20px 10px;
`

export const HeaderMenu = styled.div`
  display: grid;
  width: 100%;
  align-items: center;
  grid-column: 2/3;
  grid-row: 1/2;
  margin-bottom: 20px;
  @media (max-width: 48rem){
    display: none;
  }
`

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.35); */
  /* z-index: 1; */
`
export default DashboardLayout
