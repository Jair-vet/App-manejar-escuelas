import { useSelector } from 'react-redux'

import StepsStyled from './StepsStyled'

const LateralStepsSettings = () => {
  const globalState = useSelector((state) => state.global)
  // useEffect(() => {
  // }, [])

  // const sytyles = {
  //   color: 'red'

  // }

  return (
    <StepsStyled>
      <div className={globalState.step >= 1 ? 'step-container current' : 'step-container' } >
        <span>1</span>
      </div>
      {/* <span className='line'></span>
      <div className={globalState.step >= 2 ? 'step-container current' : 'step-container' } >
        <span>2</span>
      </div>
      <span className='line'></span>
      <div className={globalState.step >= 3 ? 'step-container current' : 'step-container' } >
        <span>3</span>
      </div>
      <span className='line'></span>
      <div className={globalState.step >= 4 ? 'step-container current' : 'step-container' } >
        <span>4</span>
      </div>
      <span className='line'></span>
      <div className={globalState.step >= 5 ? 'step-container current' : 'step-container' } >
        <span>5</span>
      </div> */}
    </StepsStyled>
  )
}

export default LateralStepsSettings
