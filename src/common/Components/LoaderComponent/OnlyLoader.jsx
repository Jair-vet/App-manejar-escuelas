import OnlyLoaderStyled from './OnlyLoaderStyled'

const OnlyLoaderComponent = () => {
  return (
    <OnlyLoaderStyled>
      {/* <span className="title">Cargando ...</span> */}
      <span className="loader"></span>
    </OnlyLoaderStyled>
  )
}
export default OnlyLoaderComponent
