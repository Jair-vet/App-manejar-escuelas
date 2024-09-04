import styled from 'styled-components'

export const LayoutDetailSchoolsStyled = styled.div`
    border: ${props => props.theme.container.border};
    font-family: ${props => props.theme.fonts.texts};
    font-size: ${props => props.theme.fonts_sizes.small_texts};
    display: flex;
    border-radius: 10px;
    padding: 0px 1rem;
    width: 97.5%;
    height: 43rem;
    background-color:white;
    display:flex;
    flex-direction: column;
    justify-content: start;
    align-content: center;
    padding: 20px;
    margin-top: 20px;
    height:calc(100vh - 145px);   

    & .view-detail-users-schools-container{
        overflow: auto;
    }


    @media (max-width: 67rem) /* 768px */ {
        width:90%;
        & .container-fields{
        width:100%;
        display:flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content:center;
        align-items: center;
        /* background-color:red; */
        & .item{
            width:100%;
        }
    }
    }

`
export const ModalUserCreateContainer = styled.div`
    width:100%;
    display:flex;
    flex-wrap: wrap; 
    justify-content:center;
    /* background-color:blue; */
    align-self: center;
    & .item{
        width:40%;
        padding: 0px 20px 0px 20px;
        /* background-color:red; */
    }

`

export const CopyContainer = styled.div`
    cursor:pointer;
    color:${props => props.theme.colors.primary};
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    margin-top:10px;
    width:100%;
    & .link-container{
        width:100%;
        display:flex;
        justify-content:center;
    }
    & .link-login{
        color:${props => props.theme.colors.primary};
        font-weight: bold;


    }
    .copy-container{
        width: 100%;
        display:flex;
        justify-content:center;
        margin-top: 10px;
    }
    & .icon{
        margin-left: 10px;
        color:${props => props.theme.colors.primary};
    } 
    & span{
        text-decoration:  underline; 
    }
`
export const ContainerFields = styled.div`
    width:100%;
    display:flex;
    flex-wrap: wrap; 
    justify-content: space-between;
    /* background-color:blue; */
    align-self: center;
    & .item{ 
        width:42%;
        /* background-color: red; */
        padding: 0px 20px 0px 20px;
        }
    & .item-checkbox{
        width:40%;
        padding-left: 30px;
    }
`

export const FooterModalUser = styled.div`
    width:100%;
    display:flex;
    gap: ${props => props.gap};
    flex-wrap: wrap; 
    justify-content: ${props => props.justify || 'space-between'};
    /* background-color:blue; */
    align-self: center;
    padding-right: ${props => props.right};
    & .item{ 
        /* background-color: red; */
        margin: 0px 10px 0px 10px;
        }
`

export default LayoutDetailSchoolsStyled