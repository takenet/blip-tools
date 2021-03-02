/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react'
import 'blip-toolkit/dist/blip-toolkit.css'
import { ApplicationService } from './api/applicationService'
import { AxiosService } from './api/axiosService'
import { withLoading } from './api/commomService'
import { PageHeader } from 'components/PageHeader'
import { CommonProvider } from 'contexts/CommonContext'
import { PageTemplate } from 'components/PageTemplate'
import { BlipTabs } from 'blip-toolkit'
import CommandForm from './broadcastComponents/CommandForm'
import MainPage from './MainPage'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  AiFillGithub,
  AiOutlineQuestionCircle,
  AiOutlineInfoCircle,
} from 'react-icons/ai'
import { TiSocialAtCircular } from 'react-icons/ti'
import { Alert } from 'react-bootstrap'
import ReactGA from 'react-ga'

function App() {
  const [isHttp, setIsHttp] = useState(false)
  const [isFormHttpFilled, setIsFormHttpFilled] = useState(false)
  const [show, setShow] = useState(true)

  const fillHeader = (e, { key, url }) => {
    e.preventDefault()
    AxiosService.init(key, url, toast)
    setIsFormHttpFilled(true)
  }

  const AlertDismissible = () => {
    if (show) {
      return (
        <Alert variant="info" onClose={() => setShow(false)} dismissible>
          {isHttp ? (
            <p>
              You can also use this tool as a plugin,{' '}
              <Alert.Link href={`${process.env.REACT_APP_INFO_LINK}`}>
                click here
              </Alert.Link>{' '}
              to learn more how to do this.
            </p>
          ) : (
            <p>
              You can also use this plugin as a tool,{' '}
              <u>
                <Alert.Link href={`${process.env.REACT_APP_INFO_LINK}`}>
                  click here
                </Alert.Link>
              </u>{' '}
              to learn more how to do this.
            </p>
          )}
        </Alert>
      )
    }
    return <></>
  }

  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GA_KEY)
    withLoading(async () => {
      new BlipTabs('tab-nav')
      setIsHttp(!(await ApplicationService.ping()))
    })
  }, [])

  const title = `Blip - Broadcast List ${isHttp ? 'Tool' : 'Plugin'}`

  return (
    <CommonProvider>
      <div id="main" className="App">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <AlertDismissible />
        <PageHeader title={title} />
        <PageTemplate title={title}>
          {isHttp && !isFormHttpFilled ? (
            <CommandForm
              style={{ padding: '100px' }}
              handleSubmit={fillHeader}
            />
          ) : (
            <MainPage
              service={!isHttp ? ApplicationService : AxiosService}
              isHttp={isHttp}
            />
          )}
        </PageTemplate>

        <a
          href={process.env.REACT_APP_INFO_LINK}
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiOutlineInfoCircle size="28" />
        </a>
        <a
          href="https://forum.blip.ai/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiOutlineQuestionCircle size="28" />
        </a>
        <a
          href="https://github.com/takenet/blip-tools/tree/master/BLiP%20Broadcast%20List%20Plugin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillGithub size="28" />
        </a>
        <a
          href="https://forum.blip.ai/u/caiof/summary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TiSocialAtCircular size="30" />
        </a>
      </div>
    </CommonProvider>
  )
}

export default App
