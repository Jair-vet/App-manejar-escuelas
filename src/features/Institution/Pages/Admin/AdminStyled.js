import styled from 'styled-components'

export const LayoutAdminStyled = styled.div`
    border: ${props => props.theme.container.border};
    font-family: ${props => props.theme.fonts.texts};
    font-size: ${props => props.theme.fonts_sizes.small_texts};
    display: flex;
    border-radius: 10px;
    padding: 0px 1rem;
    width: auto;
    min-height:calc(100vh - 9rem);
    max-height: calc(100vh - 12rem);
    background-color:${props => props.theme.colors.background};
    display:flex;
    flex-direction: column;
    justify-content: start;
    align-content: center;
    padding: 20px;
    /* margin-top: 20px; */
    height:calc(100vh - 145px);
    
    & .container-fileds{
        width:70%;
        display:flex;
        flex-wrap: wrap;
        justify-content:space-between;
    }

    & .view-detail-users-schools-container{
        overflow: auto;
        height:100%;
        /* background-color: red; */

        & .actions{
            display:flex;
            justify-content:start;
            align-items: center;
            
            & .item{
                margin: 0px 3px 0px 3px;
            }
        }
    }

    .container-cycle{
      /* background-color:red; */
        display:flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    & .items-header-table{
        display:flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content:space-between;
        align-items:end;
        margin-bottom: 10px;
    }
    & .item{
        max-width: 30%;
        margin-right:10px
    }
    & .container-title-table{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    & .container-checkbox-matter{
        margin-left: 10px;
    }
    @media (max-width: 48rem) /* 768px */ {
        width:70%;
    
        & .container-fileds{
        width:700%;
        display:flex;
        flex-wrap: wrap;
        justify-content:space-between;
        }
        & .item{
        max-width: 100%;
    }
    }

`

export const AddSectionStyled = styled.div`
    width:100%;
    height:100%;
    overflow-x:auto;

    & .add-group-container{
        display:flex;
        flex-direction: row;
        align-items:center;
        justify-content: space-between;
    }
`

export const ContainerTableCycleCreate = styled.div`
    width:100%;
    height:100%;
    display: flex;
    flex-direction:row;
`
export const ContainerFieldsPays = styled.div`
/* width:100%; */
display: flex;
background: ${props => props.theme.colors.grey_hint};
flex-direction: column;
flex-wrap: wrap;
padding: 10px;
border-radius: 0.75rem;
justify-content: space-between;
align-items: start;
margin:2px 0px 10px 0px;
/* background-color: red; */
& .item {
    max-width: 30%;
    margin-right:10px;
}
& .number{
    text-align:end;
}
& .dates {
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items:center;
    width:100%;
    /* background-color: blue; */
    margin:0px;
}

`
export const ContainerMatters = styled.div`
/* background-color:red; */

`

export const ContainerDetailMatter = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
    flex-wrap: wrap;
    .name-matter-inputs{
        width:50%;
        background-color: ${props => props.theme.colors.grey_hint};
        border-radius: 0.75rem;
        padding: 10px;
    }
    .matter-aspects{
        width:45%;
        background-color: ${props => props.theme.colors.grey_hint};
        min-height: 150px;
        border-radius: 0.75rem;
        padding: 10px;

    }

`

export default LayoutAdminStyled
