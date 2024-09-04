import styled from 'styled-components'

const OneStepSettingStyled = styled.div`
  display:flex;
  flex-direction:column;
  align-items: flex-start;
  justify-content:start;
  width: ${props => props.width};
  height:100%;
  font-family: ${props => props.theme.fonts.texts};
  color:${props => props.theme.colors.title_color};
  position:relative;
  padding-left: 2rem;
  cursor: pointer;
  
  &h1{
    margin: 0;
    inline-size: 0px;
  }
  &h3{
    margin: 0;
    color:${props => props.theme.colors.texts_color};
  }

  & .footer {
    position:absolute;
    bottom: 1rem;
    display: flex;
    width:94%;
    align-self: flex-end;
    flex-direction: row;
    justify-content: flex-end;
  }

`

export const FormContainerStepStyled = styled.div`
  display:flex;
  flex-direction:row;
  height: ${props => props.height};
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content:start;
  & .item{
    width:50%;
  }

`
export const ContainerFile = styled.div`
  border: 1.5px dashed ${props => props.theme.colors.texts_color};
  height: 7rem;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  padding: 0.5rem 0;
  cursor: pointer;
  

  & span{
    display: block;
  }
  & .icon-upload{
    color: ${props => props.theme.colors.primary};
    margin-top: 1rem;
  }

  & img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export default OneStepSettingStyled
