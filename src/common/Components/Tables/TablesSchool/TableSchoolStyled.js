import styled from 'styled-components'

const TableSchool = styled.div`
position: relative;

@media (max-width: 48rem){ /**768 px */
    width: 100%;
    font-size: ${props => props.theme.fonts_sizes.links} ;
    grid-template-columns: ${({ isExpanded }) => isExpanded ? '3rem 1fr' : '3rem 1fr'}; 
    grid-template-rows: 60px 1fr;
  }


&.actions{
  cursor: pointer;
}
`

export default TableSchool