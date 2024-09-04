import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
// import { useNavigate } from 'react-router'

import DataStaffView from './DataStaffView'
import LayoutStaffStyled from './StaffStyled'

// import useErrorHandling from '@/Common/hooks/useErrorCustom'
// import PageStatus from '@/common/Models/Enums'

const DetailsStaffView = ({ idEmploye }) => {
  // const { handleErrors, errorMessage } = useErrorHandling()
  // const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)

  // const navigate = useNavigate()
  const initHasRun = useRef(false)

  // const [tabs] = useState([
  //   { label: 'Datos personales', isSelect: true }
  // ])
  const init = () => {
  }

  useEffect(() => {
    if (!initHasRun.current) {
      init()
    }
  }, [])

  // useEffect(() => {
  //   console.log(errorMessage)
  // }, [errorMessage])

  return (
    <LayoutStaffStyled>
      <DataStaffView idEmploye={idEmploye}/>
      {/* <Tabs items={tabs} onSelect={changedSelectTab}/> */}
    </LayoutStaffStyled>
  )
}

export default DetailsStaffView

DetailsStaffView.propTypes = {
  idEmploye: PropTypes.string
}
