import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { IframeMessageProxy } from 'iframe-message-proxy'
import './index.scss'
import * as serviceWorker from './serviceWorker'
import { CommomService } from './api/CommomService'
import { ResizeObserver } from 'resize-observer'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'

IframeMessageProxy.listen()

const rootDiv = document.getElementById('root')

const documentObserver = new ResizeObserver(() => {
  CommomService.setHeight(rootDiv?.scrollHeight)
})

documentObserver.observe(rootDiv)
ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
