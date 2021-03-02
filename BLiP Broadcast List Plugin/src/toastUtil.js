import { showToast } from './api/commomService'

export const errorToast = (message) => {
  showToast({
    type: 'danger',
    message: message,
  })
}

export const successToast = (message) => {
  showToast({
    type: 'success',
    message: message,
  })
}
