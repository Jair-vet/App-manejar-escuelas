import PropTypes from 'prop-types'

import Sidenav from '../Sidenav'

const Layout = ({ children }) => {
  return (
    <>
      <Sidenav>
        {children}
      </Sidenav>

    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node
}

export default Layout
