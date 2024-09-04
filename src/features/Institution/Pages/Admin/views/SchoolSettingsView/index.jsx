import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

import SchoolBankData from './SchoolBankData'
import SchoolSettings from './SchoolSettings'
import SchoolTaxData from './SchoolTaxData'

import Tabs from '@/common/Components/Tabs'
import PageStatus from '@/common/Models/Enums'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import useTabSelectedHandling from '@/common/hooks/useTabSelect'

const SchoolSettingView = () => {
  const { changedSelectTab, selectTab } = useTabSelectedHandling()
  const { handleErrors, errorMessage, clearErrorMessage } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.SUCCESS)
  const [tabs] = useState([
    { label: 'Datos de escuela', isSelect: true },
    { label: 'Datos Fiscales', isSelect: false },
    { label: 'Datos bancarios', isSelect: false }
  ])

  const onSelectTabs = (index, items) => {
    changedSelectTab(index, items)
  }

  useEffect(() => {
    if (errorMessage !== '') {
      toast.error(errorMessage)
      clearErrorMessage()
    }
  }, [errorMessage])

  return (
    <>
      <Tabs items={tabs} onSelect={onSelectTabs}/>
      {/* <SchoolSettings></SchoolSettings>
      <SchoolTaxData></SchoolTaxData> */}
      {
        pageStatus === PageStatus.SUCCESS &&
          <>
            {(selectTab === 0 ? <SchoolSettings/> : <></>)}
            {(selectTab === 1 ? <SchoolTaxData/> : <></>)}
            {(selectTab === 2 ? <SchoolBankData/> : <></>)}
          </>
      }
    </>
  )
}

export default SchoolSettingView
