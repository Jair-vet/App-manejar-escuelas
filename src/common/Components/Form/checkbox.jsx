import PropTypes from 'prop-types'
import React from 'react'

import { CheckBoxStyled, Indicator, InputCheck, LabelCheck } from '.'

export const Checkbox = ({
  value,
  checked,
  onChange,
  name,
  id,
  label,
  disabled
}) => {
  return (
    <CheckBoxStyled>
      <LabelCheck htmlFor={id} disabled={disabled}>
        {label}
        <InputCheck
        id={id}
        type="checkbox"
        name={name}
        value={value}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
        <Indicator />
      </LabelCheck>
    </CheckBoxStyled>

  )
}
Checkbox.propTypes = {

  value: PropTypes.any,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired
}
