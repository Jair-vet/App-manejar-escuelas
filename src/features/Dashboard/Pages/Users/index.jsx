import PropTypes from 'prop-types'
import { useEffect, useState, useRef } from 'react'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { routesNamesDashboard } from '../../Routes/routesNames'

import { changeTitle } from '@/Redux/globalSlice'
import Search from '@/common/Components/Search'
import TableUser from '@/common/Components/Tables/TableUser'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import UsersService from '@/services/users.service'

const UsersPage = ({ userName }) => {
  const [page, setPage] = useState(1)
  const [users, setUsers] = useState([])
  const [itemsSearch, setUsersSearch] = useState([])
  const [isSearch, setIsSearch] = useState(false)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const { handleErrors } = useErrorHandling()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const globalState = useSelector((state) => state.global)
  const tableRef = useRef(null)

  const init = async () => {
    console.log(globalState.titleHeader)
    try {
      dispatch(changeTitle({
        titleHeader: 'Usuarios'
      }))
      const response = await UsersService.getUsers(page)
      const filteredUser = response.filter(user => user.name && user.name !== userName)
      console.log('Filtered user:', filteredUser)
      setUsers(filteredUser)
      setPage(1)
    } catch (e) {
      console.log(e)
      handleErrors(e)
    }
  }

  const search = async (target) => {
    const value = target.target.value
    if (value === undefined && value === '') {
      setIsSearch(false)
      setUsersSearch([])
      return
    }
    setIsSearch(true)
    const response = await UsersService.searchUsers(value)
    setUsersSearch(response)
  }

  const loadMore = async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const response = await UsersService.getUsers(page + 1)

      if (response.length === 0) {
        setHasMore(false)
      } else {
        const newUsers = [...users, ...response]
        setUsers(newUsers)
        setPage(page + 1)
      }
    } catch (event) {
      console.log(event)
      handleErrors(event)
    } finally {
      setLoading(false)
    }
  }

  const handleScroll = () => {
    if (tableRef.current &&
      tableRef.current.scrollTop + tableRef.current.clientHeight >=
      tableRef.current.scrollHeight - 50
    ) {
      loadMore()
    }
  }

  useEffect(() => {
    init()
  }, [page])

  return (
    <>
      <Search searchAction={search} actionButton={() => navigate(routesNamesDashboard.addUser)} />
      <Toaster
        reverseOrder={false}
      />
      <TableUser items={isSearch ? itemsSearch : users.filter(user => user.name !== userName)} />
      <div className="table-container" onScroll={handleScroll} ref={tableRef}>
        {loading && <p>....</p>}
      </div>

    </>
  )
}

UsersPage.propTypes = {
  userName: PropTypes.string
}

export default UsersPage
