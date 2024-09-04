import styled from 'styled-components'

const H1 = styled.h1`
  font-size: ${props => props.theme.fonts_sizes.labels || '1.62rem'};
  color:  ${props => props.theme.colors.title_color}; /*26*/
`

export const InfoText = styled.span`
  font-size: ${props => props.theme.fonts_sizes.links};
  font-weight:bold;
  color:  ${props => props.theme.colors.texts_color}; /*26*/
`
export default H1
