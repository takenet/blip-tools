import LocalizedStrings from 'react-localization'
import { useCommon } from '../contexts/CommonContext'

const useContentLocalizer = (localization) => {
  const {
    common: { language },
  } = useCommon()
  const strings = new LocalizedStrings(localization)
  strings.setLanguage(language)
  return strings
}

export { useContentLocalizer }
