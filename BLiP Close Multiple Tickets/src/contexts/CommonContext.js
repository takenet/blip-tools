import React, { useCallback } from 'react'
import { CommonReducer } from '../reducers/CommonReducer'
import moment from 'moment'
import 'moment/locale/pt-br'

const CommonContext = React.createContext()

const useCommon = () => {
  const context = React.useContext(CommonContext)
  if (!context) {
    throw new Error('useCommon must be used within a CommonProvider')
  }
  const [common, dispatch] = context

  //defining actions to be used based on the reducer
  const setLanguage = useCallback(
    (language) => dispatch({ type: 'setLanguage', language }),
    [dispatch]
  )
  const setLoading = useCallback(
    (loading) => dispatch({ type: 'setLoading', loading }),
    [dispatch]
  )
  const setLoggedUser = useCallback(
    (loggedUser) => dispatch({ type: 'setLoggedUser', loggedUser }),
    [dispatch]
  )

  moment.locale(common.language)

  return {
    common,
    moment,
    setLanguage,
    setLoading,
    setLoggedUser,
  }
}

const CommonProvider = (props) => {
  const [common, dispatch] = React.useReducer(CommonReducer, {
    language: 'pt',
    loading: false,
  })
  const value = React.useMemo(() => [common, dispatch], [common])
  return <CommonContext.Provider value={value} {...props} />
}

export { CommonProvider, useCommon }
