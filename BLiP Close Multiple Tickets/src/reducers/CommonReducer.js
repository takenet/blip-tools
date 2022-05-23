export const CommonReducer = (state, action) => {
  switch (action.type) {
    case 'setLanguage':
      return { ...state, language: action.language.toLowerCase() }
    case 'setLoading':
      return { ...state, loading: action.loading }
    case 'setLoggedUser':
      return { ...state, loggedUser: action.loggedUser }
    default:
      throw new Error(`CommonReducer: invalid action called ${action.type}`)
  }
}
