import styled from 'styled-components'

export const ContainerForm = styled.form`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem 1.5rem;
        & .item{
            width: 45%;
        }
    }
`
export const ContainerChangeImage = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    top: ${props => props.top || '-4rem'};
`

export const ContainerButtonFiles = styled.div`
    display: flex;
    width: 100%;
    justify-content: end;
    padding-top: ${props => props.paddingTop || '0px'}
    padding-right: ${props => props.right || '9.5rem'};
`
export const ContainerInputs = styled.div`
    display: flex;
    width: 100%;

    & .container_data_bank{
        display: flex;
        width: 100%;
        
         & .item{
            width: 45%;
        }
    }
`
