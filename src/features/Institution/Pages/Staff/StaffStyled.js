import styled, { css } from 'styled-components'

const LayoutStaffStyled = styled.div`    
    border: ${props => props.theme.container.border};
    font-family: ${props => props.theme.fonts.texts};
    font-size: ${props => props.theme.fonts_sizes.small_texts};
    display: flex;
    border-radius: 10px;
    padding: 0px 1rem;
    background-color: ${props => props.theme.colors.background};
    display:flex;
    flex-direction: column;
    justify-content: start;
    align-content: center;
    padding: 20px;
    width: 95%;
    height:calc(100vh - 120px);  
    /* overflow-x:auto;  */
    & form{
        height:100%;
    }
    & .all-fields-data-container{
        overflow-x:auto;
        /* background-color:red; */
        height:90%;

        ::-webkit-scrollbar {
            width: 10px;
        }
        ::-webkit-scrollbar-track {
            background: ${props => props.theme.colors.background};
        }
        ::-webkit-scrollbar-thumb {
            background: ${props => props.theme.colors.background};
            border-radius: 5px;
            padding: 100px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background:  ${props => props.theme.colors.primary};
        }
    }
    & .container-fileds{
        width:70%;
        display:flex;
        flex-wrap: wrap; 
        justify-content:space-between;

        & .item{
            width: 45%;
        }

    }

    /* @media (max-width:80rem){
        height: auto;
        margin:  auto;
    } */
    @media (max-width: 48rem) /* 768px */ {
        width:70%;
        & .container-fileds{
        width:70%;
        display:flex;
        flex-wrap: wrap;
        justify-content:space-between;

        &.rol{
            left: 0;
        }
        }
    }

   
`
export const ContainerButton = styled.div`
    width: ${props => props.width || '100%'};
    display: flex;
    justify-content: ${props => props.justify || 'center'};
    padding-top: ${props => props.top};
    align-content: center;
    border: 1px;
    gap: ${props => props.gap};
`

export const ContainerFiles = styled.div`
    height: 6rem;
    width: 100%;
    display: flex;
    border-radius: 8px;
    border: 1.5px dashed ${props => props.theme.colors.texts_color};
    justify-content: center;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

    & .icon-upload{
        color: ${props => props.theme.colors.primary};
    }

    & img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

`

export const ContainerSectionFields = styled.section`
    overflow-x:auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 0.75rem;
    background: ${props => props.theme.colors.grey_hint};
    flex-wrap: wrap;
    margin-bottom:10px;
    padding: ${({ padding }) => padding ? `${padding}` : css`10px`};
    & .title-section{
        width:100%;
        margin-bottom: 10px;
        color: ${props => props.theme.colors.title_color};
        font-size: ${props => props.fontSize || props.theme.fonts_sizes.medium_texts};
        font-weight:bold;
    }

    &.place-or-birth{
        margin-top:1rem;
    }

`

export default LayoutStaffStyled
