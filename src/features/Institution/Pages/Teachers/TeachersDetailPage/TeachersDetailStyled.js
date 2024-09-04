import styled from 'styled-components'

const LayoutDetailTeacherStyled = styled.div`
    border: ${props => props.theme.container.border};
    font-family: ${props => props.theme.fonts.texts};
    font-size: ${props => props.theme.fonts_sizes.small_texts};
    display: flex;
    border-radius: 10px;
    padding: 0px 1rem;
    height: 43rem;
    background-color:white;
    display:flex;
    flex-direction: column;
    justify-content: start;
    align-content: center;
    padding: 20px;
    width: 96%;
    
    & .container-fileds{
        width:70%;
        display:flex;
        flex-wrap: wrap; 
        justify-content:space-between;

        & .item{
            width: 32%;
        }
    }

    @media (max-width:80rem){
        height: 33rem;
        margin: 5rem auto;
    }
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
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
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
export default LayoutDetailTeacherStyled
