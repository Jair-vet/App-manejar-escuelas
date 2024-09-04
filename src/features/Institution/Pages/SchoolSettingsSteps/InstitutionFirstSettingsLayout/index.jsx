import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'

import LateralStepsSettings from '../../../Components/Step'

import InstitutionSettings from './InstitutionFirstSettingsLayoutStyled'

const InstitutionSettingsLayout = () => {
  useEffect(() => {
  }, [])

  return (
    <InstitutionSettings>
      <div className='content'>
        <Toaster
            position="top-center"
            reverseOrder={false}
      />
        <LateralStepsSettings></LateralStepsSettings>
        <Outlet/>
      </div>
    </InstitutionSettings>
  )
}

export default InstitutionSettingsLayout
