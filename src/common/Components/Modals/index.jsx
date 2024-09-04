import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { GrFormClose } from 'react-icons/gr'

import Button, { ButtonSecondary } from '../Buttons'
// import LoaderComponent from '../LoaderComponent'
// import OnlyLoaderComponent from '../LoaderComponent/OnlyLoader'

import ModalCustomStyled, { LoaderModalStyled } from './ModalsStyled'

import PageStatus from '@/common/Models/Enums'

export const BodyModal = ({ children, statusPageModal, message, refreshAction, width }) => {
  if (statusPageModal === PageStatus.SUCCESS) {
    return children
  } else if (statusPageModal === PageStatus.LOADING) {
    return (<LoaderModalStyled width={width}>
      <span className="title">Cargando ...</span>
      <span className="loader"></span>
    </LoaderModalStyled>)
  }
  return (<LoaderModalStyled width={width}>
    <span className='title-error'> Sucedio  algo inesperado </span>
    <span className='message-error' > {message} </span>
    <ButtonSecondary onClick={refreshAction}> Reintentar </ButtonSecondary>
  </LoaderModalStyled>)
}

/**
 * Componente Modal
 * @param {string} props.title - Titulo del modal
 * @param {string} props.subtitle - subtitulo del modal, puede ir undifined
 * @param {node} props.children - Componente Hijo
 * @param {func} props.openOrClose - funcion para cerrar modal,user el hook
 * @param {PageStatus} props.statusPageModal - funcion para cerrar modal,user el hook
 * @param {string} props.message - Mesnsage para mostrar en pantalla de errror
 * @param {func} props.refreshAction - funcion que llama cuando hay un error
 * @param {func} props.closeButton - Mostrar oh no mostrar boton de close
 * @param {func} props.customButtons - Propieda para mostrar o no botones personalizados
 * @param {func} props.footer - Componente perzonlizado en el footer del componente
 * @param {func} props.width - Width de modal
 * @param {func} props.height - height de modal, defaul:heigth auto
 *
 */

const ModalCustom = ({ title, subtitle, children, openOrClose, statusPageModal, message, refreshAction, customButtons, saveButton, footer, closeButton, width, height, overflowContent = undefined }) => {
  return (
    <>
      <ModalCustomStyled overflowContent={overflowContent} customButtons={customButtons} width={width} height={height} >
        <motion.div initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20
          }} className='container'>
          <div className='header'>
            <div className='titles'>
              <h2 className='title'>{title}</h2>
              {subtitle && <h3 className='subtitle'>{subtitle}</h3>}
            </div>
            {closeButton === true ? <GrFormClose className='icon' onClick={openOrClose}></GrFormClose> : <></>}
          </div>
          <div className='content-scroll'>
            <div className='content'>
              <BodyModal width={width} refreshAction={refreshAction} statusPageModal={statusPageModal} message={message} >{children}</BodyModal>
              {statusPageModal === PageStatus.SUCCESS && footer === undefined
                ? <div className='footer' >
                  <ButtonSecondary className="f-child" onClick={openOrClose}>Cancelar</ButtonSecondary>

                  <Button left='20px' className="f-child" type='submit'>Guardar</Button>

                </div>
                : <></>}
            </div>
          </div>
          {statusPageModal === PageStatus.SUCCESS && footer !== undefined
            ? <div className='footer' >
              {footer}
            </div>
            : <></>}
        </motion.div>
      </ModalCustomStyled>
    </>
  )
}

BodyModal.propTypes = {
  children: PropTypes.node.isRequired,
  statusPageModal: PropTypes.oneOf(Object.values(PageStatus)).isRequired,
  message: PropTypes.string.isRequired,
  refreshAction: PropTypes.func.isRequired,
  width: PropTypes.string
}

ModalCustom.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  openOrClose: PropTypes.func.isRequired,
  statusPageModal: PropTypes.oneOf(Object.values(PageStatus)).isRequired,
  message: PropTypes.string.isRequired,
  refreshAction: PropTypes.func.isRequired,
  customButtons: PropTypes.bool,
  footer: PropTypes.node,
  closeButton: PropTypes.bool,
  width: PropTypes.string,
  isOpen: PropTypes.bool,
  height: PropTypes.string,
  saveButton: PropTypes.bool,
  overflowContent: PropTypes.bool,
  showModal: PropTypes.bool
}

export default ModalCustom
