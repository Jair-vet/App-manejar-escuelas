import styled from 'styled-components'

const StepsStyled = styled.div`
  display:flex;
  flex-direction:column;
  align-items: center;
  justify-content:start;
  width:15%;
  height:100%;
  overflow: auto;


  /* background-color:blue; */
  & .step-container{
    display:flex;
    flex-direction: column;
    margin-top: 1.5rem;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.colors.text_color_hover};
    width:30px;
    height:30px;
    border-radius:15px;
    text-align:center;
  
    color:${props => props.theme.colors.primary};
    /* border: solid 1px ${props => props.theme.colors.primary}; */
  }
  .current {
    background-color: ${props => props.theme.colors.primary};
    color:${props => props.theme.colors.text_color_hover};
    border: solid 1px ${props => props.theme.colors.primary};


  }
  & .line{
    margin:10px 0px 10px 0px;
    height:80px;
    width: 1px;
    background-color:${props => props.theme.colors.grey};
  }
`
export default StepsStyled
