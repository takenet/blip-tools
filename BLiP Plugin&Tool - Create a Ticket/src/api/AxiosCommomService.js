import { toast } from 'react-toastify'

export class AxiosCommomService {
  static loadingHookFunc = () => {}

  static startLoading = () => {
    this.loadingHookFunc(true)
  }
  static stopLoading = () => {
    this.loadingHookFunc(false)
  }
  static showSuccessToast = (message) => toast.success(message)

  static showErrorToast = (message) => toast.error(message)

  static setLoadingHookFunc = async (func) => {
    this.loadingHookFunc = func
  }
  static resolveAfterSeconds(time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, time)
    })
  }

  static withLoading = async (func, waitTime) => {
    this.startLoading()
    waitTime !== undefined && (await this.resolveAfterSeconds(waitTime))
    try {
      return await func()
    } finally {
      this.stopLoading()
    }
  }
}
