import { IframeMessageProxy } from 'iframe-message-proxy'

export const startLoading = () => IframeMessageProxy.sendMessage({ action: 'startLoading' })

export const stopLoading = () => IframeMessageProxy.sendMessage({ action: 'stopLoading' })

export const setHeight = (height) => IframeMessageProxy.sendMessage({ action: 'heightChange', content: height })

export const showToast = (toast) => IframeMessageProxy.sendMessage({ action: 'toast', content: toast })

export const withLoading = async func => {
    startLoading()

    try {
        return await func()
    } finally {
        stopLoading()
    }
}