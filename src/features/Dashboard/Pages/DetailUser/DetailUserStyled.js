import styled from 'styled-components'

const LayoutDetailUserStyled = styled.div`
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
    padding: 0.5rem 1rem;
    width: 98%;
    & .copy-container{
        cursor:pointer;
        color:${props => props.theme.colors.primary};
        display:flex;
        flex-direction: row;
        align-items:center;
        justify-content: center;
        margin-top:10px;
        & .icon{
            margin-left: 10px;
            color:${props => props.theme.colors.primary};
        } 
        & span{
            text-decoration:  underline; 
        }



        
    }
    &.container-form-user{
        width:100%;
        display:flex;
        flex-direction: column;
        justify-content:center;
        align-items:center;
        /* background-color:blue; */
    }
    & .modal-container-field{
        /* background-color:blue; */
        display:flex;
        justify-content: space-between;
        width: 100%;
        flex-wrap: wrap;
        .item{ 
        width:42%;
        /* background-color: red; */
        padding: 0px 20px 0px 20px;
        
        /* position: relative; */
        /* left: -0.4rem; */
    
    }
    }
    & .container-fields{
        width:80%;
        display:flex;
        flex-wrap: wrap; 
        justify-content:center;
        /* background-color:blue; */

    & .item{ 
        width:45%;
        /* background-color: red; */
        padding: 0px 20px 0px 20px;
        
        /* position: relative; */
        /* left: -0.4rem; */
    
    }
    & .item-checkbox{
        /* width:40%; */
        padding-left: 40px;
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
    justify-content: ${props => props.justify || 'center'};
    padding-top: ${props => props.top};
    align-content: center;
    gap: ${props => props.gap};
`
export default LayoutDetailUserStyled
