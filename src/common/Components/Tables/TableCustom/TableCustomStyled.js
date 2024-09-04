import styled, { css } from 'styled-components'

import PageStatus from '@/common/Models/Enums'

export const AnimatedStyled = styled.div`
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 0.5s ease transform 0.5s ease;
  &.active {
    opacity: 1;
    transform: translateY(0);
  }

`
export const ActiveValueStyled = styled.span`
  max-width:auto;
  border-radius:10px;
  padding:2px 10px;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text_color_hover};

`

export const ContainerFilterStyled = styled.div`
  min-width:100px;
  max-width: 200px;
  max-width: 200px;
  min-height: 100px;
  position:absolute;
  /* background-color: ${props => props.theme.colors.background}; */
  background-color: red;
  bottom: -90px;
  left: 0px;
  right: 0px;
  z-index:10;
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.container.box_shadow_modal};
  display: flex;
  flex-direction: column;
  justify-content: start;
  font-size:${(props) => props.theme.fonts_sizes.medium_texts};
  font-family: ${(props) => props.theme.fonts.texts};
  padding: 5px;
  & .item{
    background-color: blue;
    width: 100%;
    text-align: start;
  }
`

export const InactiveValueStyled = styled.span`
  max-width:auto;
  border-radius:10px;
  padding:2px 10px;
  background-color: ${props => props.theme.colors.grey};
  color: ${props => props.theme.colors.text_color_hover};

`

const TableCustomStyled = styled.div`
  border: ${({ withContainerWhite }) => withContainerWhite ? css`${(props) => props.theme.container.border};` : css`none`};
  font-family: ${(props) => props.theme.fonts.texts};
  font-size: ${(props) => props.theme.fonts_sizes.small_texts};
  display: flex;
  border-radius: 10px;
  position: relative;
  bottom: ${(props) => props.bottom};
  text-align: center;
  flex-direction: column;
  overflow-y:${({ statusTable }) => statusTable !== PageStatus.SUCCESS ? css`inherit` : css`auto`};
  overflow-x:${({ statusTable }) => statusTable !== PageStatus.SUCCESS ? css`inherit` : css`auto`};
  
  width: ${props => props.width || '100%'};
  height: ${({ heightTable }) => heightTable || css`100%`}; 
  text-align: center;
  flex-direction: column;
  margin-top: 20px;
  /* background-color: red; */
  box-shadow: ${({ withContainerWhite }) => withContainerWhite ? css`${(props) => props.theme.container.box_shadow}` : css`none`};
  /* box-shadow: ${(props) => props.theme.container.box_shadow}; */
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: white;
  }
  ::-webkit-scrollbar-thumb {
    background: #ebebeb;
    border-radius: 5px;
    padding: 100px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #13c5a4;
  }
  & .container-tables {
    display: flex;
    width: 100%;
  
    /* height: ; */
    flex-direction: column;
    border-collapse: collapse;
    border-spacing: 0;
    margin: 0px auto;
    padding:10px;
    /* background-color: blue; */
    height: ${({ heightTable }) => heightTable || css`88vh`}; 
    /* z-index:-1; */
    & .id {
      width: 10rem;
    }

    & .action {
      width: 10rem;
    }
  }

  & .header-table {
    height: 1;
    color: ${(props) => props.theme.colors.title_color};
    border-bottom: 2px solid ${(props) => props.theme.colors.texts_color};
    position:sticky;
    background-color:white;
    top:0px;
    z-index:1;
  }
  .row {
      /* background-color:white; */
      display: flex;
      flex-direction: row;
      justify-content:space-between;
      border-bottom: ${(props) => props.theme.container.border};
    }
  & .items {
    padding: 12;
    text-align: left;
    padding: 0.5rem 1rem;
    min-width: ${({ columnWidths }) => columnWidths === undefined ? 'none' : columnWidths};
    width: ${({ columnWidths, totalItems }) => columnWidths === undefined ? css`calc(100% / ${totalItems})` : 'none'};
  }

  & .container-values {
    color: ${(props) => props.theme.colors.texts_color};
    padding-top: 0.5rem;
    
    & img {
      width: 1.5rem;
      object-fit: cover;
      padding-right: 0.5rem;
    }

  }
  & .loader-table{
      width:100%;
      min-height:100px;
      /* background-color:red; */
    }

  & .value {
    text-align: left;
    padding: 0.5rem 1rem;
    width: 90vw;
    min-width: ${({ columnWidths }) => columnWidths === undefined ? 'none' : columnWidths};
    width: ${({ columnWidths, totalItems }) => columnWidths === undefined ? css`calc(100% / ${totalItems})` : 'none'};
    width: ${({ totalItems }) => css`calc(100% / ${totalItems})`};

    &.actions {
      cursor: pointer;
      &:hover{
      color: ${props => props.theme.colors.primary};
      }
    }
    
  }
  & .with-img{
    display:flex;
    flex-direction:row;
    justify-content:start;
    align-items:center;
  }
  & .with-img:first-child {
  margin-right:10px
}

  & .tbl-not-data{
    font-size:${(props) => props.theme.fonts_sizes.large_text};
    color: ${(props) => props.theme.colors.texts_color};
    padding:5rem
  }
`

export const ContainerTableNewStyled = styled.div`
  max-height:${({ maxheight }) => maxheight ? `${maxheight}` : css`'80%'`};
  background-color: ${props => props.theme.colors.background};
  /* box-shadow: ${props => props.theme.container.box_shadow}; */
  /* border:${props => props.theme.container.border}; */
  border-radius: ${props => props.theme.container.border_radius};
  padding: 5px;
  /* min-height: calc(100vh - 185px); */
  /* max-height:  calc(100vh - 185px); */
  /* background-color: orange;   */
  overflow: auto;
  & .action {
    cursor:pointer;
    &:hover{
      color: ${props => props.theme.colors.primary};
      }
  }
`
export default TableCustomStyled