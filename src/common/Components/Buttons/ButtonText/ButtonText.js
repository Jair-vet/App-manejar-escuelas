import styled, { css } from 'styled-components'

const TextButton = styled.span`
      width: ${({ width }) => width ? `${width}` : css`100%`};
      color:  ${props => props.theme.colors.primary};
      text-decoration: underline;
      text-align:end;
      cursor:pointer;
`

export default TextButton
