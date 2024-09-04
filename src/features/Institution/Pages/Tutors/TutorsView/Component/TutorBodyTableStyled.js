import styled from 'styled-components'

export const TutorBodyTableStyled = styled.table`
width: 100%;
`

export const TableBody = styled.tbody`
    width: 100%;

    & .action{
        display: flex;
        align-items: center;
        gap:2rem ;
    }

    &.icons{
        width: 2rem;

    &.icons:hover{
        color: ${props => props.theme.colors.primary};
    }
    }
`

export default TutorBodyTableStyled
