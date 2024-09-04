import PropTypes from 'prop-types'
import React from 'react'

import { Indicator, InputCheck, LabelCheck } from '.'

export const CheckboxV2 = ({
  onChange = () => { },
  name,
  id,
  label,
  disabled
}) => {
  return (
    <LabelCheck htmlFor={id} disabled={disabled}>
      {label}
      <InputCheck
        id={id}
        type="checkbox"
        name={name}
        disabled={disabled}
        onChange={onChange}
      />
      <Indicator />
    </LabelCheck>
  )
}

CheckboxV2.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func
}
