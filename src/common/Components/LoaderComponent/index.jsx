import PropTypes from 'prop-types'

import { ButtonSecondary } from '../Buttons'

import LoaderComponentStyled from './LoaderComponentStyled'

import PageStatus from '@/common/Models/Enums'

const LoaderComponent = ({ status, message, refreshAction }) => {
  return (
    <LoaderComponentStyled>
      {status === PageStatus.LOADING
        ? (
          <>
            <span className="title">Cargando ...</span>
            <span className="loader"></span>
          </>
          )
        : (
          <>
            <span className='title-error'> Algo salio mal </span>
            <span className='message-error' > {message || 'Error desconocido '}  </span>
            { refreshAction !== undefined ? <ButtonSecondary onClick={refreshAction}> Reintentar </ButtonSecondary> : <></> }
          </>
          )}
    </LoaderComponentStyled>
  )
}

LoaderComponent.propTypes = {
  status: PropTypes.oneOf(Object.values(PageStatus)),
  message: PropTypes.string.isRequired,
  refreshAction: PropTypes.func
}

export default LoaderComponent
