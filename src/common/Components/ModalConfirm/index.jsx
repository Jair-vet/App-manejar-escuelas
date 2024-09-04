import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { FaQuestionCircle } from 'react-icons/fa'

import Button, { ButtonSecondary } from '../Buttons'

import ModalConfirmStyled from './ModalConfirmStyled'

export const typeModal = Object.freeze({
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  WARNING: 'WARNING',
  INFO: 'INFO',
  QUESTION: 'QUESTION',
  NORMAL: 'NORMAL'

})

/**
 * Componente Modal alert
 * @param {string} props.title - Titulo del modal
 * @param {string} props.handleClose - funcion para boton de cerrar
 * @param {string} props.handleConfirm - funcion para boton de aceptar
 * @param {string} props.type - tipo de modal del modal
 * @param {node} props.children - Componente Hijo
 * @param {string} props.height - Componente Hijo
**/
const ModalConfirm = ({ title, handleClose, handleConfirm, type, children, height }) => {
  return type === typeModal.QUESTION
    ? (
      <ModalConfirmStyled height={height}>
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
            <span className='title'>{title}</span>
          </div>
          <div className='content-scroll'>
            <div className='content'>
              <FaQuestionCircle className='icon'/>
              {children}
            </div>
          </div>
          <div className='footer' >
            <ButtonSecondary onClick={handleClose}>Cancelar</ButtonSecondary>
            <Button left='20px' onClick={handleConfirm}>Aceptar</Button>
          </div>
        </motion.div>
      </ModalConfirmStyled>
      )
    : (
      <ModalConfirmStyled height={height}>
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
            <span className='title'>{title}</span>
          </div>
          <div className='content-scroll'>
            <div className='content'>
              {children}
            </div>
          </div>
          <div className='footer' >
            <ButtonSecondary onClick={handleClose}>Cancelar</ButtonSecondary>
            <Button left='20px' onClick={handleConfirm}>Aceptar</Button>
          </div>
        </motion.div>
      </ModalConfirmStyled>
      )
}

ModalConfirm.propTypes = {
  title: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func,
  type: PropTypes.oneOf(Object.values(typeModal)).isRequired,
  children: PropTypes.node.isRequired,
  height: PropTypes.string.isRequired

}

ModalConfirm.defaultProps = {
  handleConfirm: () => {},
  type: typeModal.QUESTION,
  title: '¿Seguro que quieres continuar?',
  height: '30vh'
}
export default ModalConfirm
