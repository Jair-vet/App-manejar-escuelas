import styled from 'styled-components'

// export const TableEditStyled = styled.table`
//     width: 100%;
//     height: auto;
//     display: flex;
//     align-content: start;
//     & .tbl-not-data{
//         /* background-color:red; */
//         /* width:100%; */
//         display:flex;
//         flex-direction:row;
//         justify-content:center;
//         align-items: center;
//         text-align:center;
//         align-self: center;
//         font-size:${(props) => props.theme.fonts_sizes.large_text};
//         color: ${(props) => props.theme.colors.texts_color};
//         padding:5rem
//     }
// `

// export const TableBodyEdit = styled.tbody`
//     width: 100%;
//     display: flex;
//     padding-left: 1rem;

//     & .value-edit{
//         border:0.5px solid ${props => props.theme.colors.primary};
//         border-radius: 0.5rem;
//         margin-left: 1rem;
//         & .change-value{
//             border-radius: 0.5rem;
//             width: 15rem;
//             border: none;
//             outline: none;
//             font-family: ${props => props.theme.fonts.texts};
//             padding: 0.3rem 0.3rem 0.3rem 0.7rem;
//             font-size: ${props => props.theme.fonts_sizes.extra_small_text};
//             &:focus{
//             border: 2.5px solid ${props => props.theme.colors.hover};
//             }
//         }
//     }
// `

export const EditingValue = styled.div` 
    display: flex;
    gap: 1.5rem;

    & .icon-edit:hover{
        color: ${props => props.theme.colors.primary};
    }

    & .icon-checked:hover{
        color: ${props => props.theme.colors.primary};
    }
`

export const ContainerIcons = styled.div`
    display: flex;
    padding: 0.5rem;
    gap: 0.5rem;
`

export const ContainerValue = styled.div`
    display: flex;
    justify-content: center;
    padding: 0.3rem;
    gap: 17.5rem;

    & .icon:hover{
        color: ${props => props.theme.colors.primary};
    }
`
