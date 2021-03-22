import React, { useEffect, useState } from 'react'
import 'blip-toolkit/dist/blip-toolkit.css'
import { ApplicationService } from './api/ApplicationService'
import { AxiosService } from './api/AxiosService'
import { PageHeader } from './components/PageHeader'
import { CommonProvider } from './contexts/CommonContext'
import { PageTemplate } from './components/PageTemplate'
import MainPage from './MainPage'
import { CommandForm } from './components/CommandForm'
import { ToastContainer } from 'react-toastify'
import LoadingOverlay from 'react-loading-overlay'
import { AxiosCommomService } from './api/AxiosCommomService'
import { CommomService } from './api/CommomService'
import ReactGA from 'react-ga'
import Footer from './Footer'

function App() {
  const [isHttp, setIsHttp] = useState(false)
  const [isFormHttpFilled, setIsFormHttpFilled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const fillHeader = (e, { key, url }): void => {
    e.preventDefault()
    AxiosCommomService.withLoading(async () => {
      AxiosService.init(key, url)
      setIsFormHttpFilled(true)
    })
  }

  useEffect(() => {
    AxiosCommomService.setLoadingHookFunc(setIsLoading)
    ReactGA.initialize(`${process.env.REACT_APP_GA_KEY}`)
    AxiosCommomService.withLoading(async () => {
      setIsHttp(!(await ApplicationService.ping()))
    })
  }, [])

  const title: string = `Blip ${isHttp ? 'Tool' : 'Plugin'} - Create a ticket`

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
        <PageHeader title={title} />
        <PageTemplate title={title}>
          <LoadingOverlay
            active={isLoading}
            spinner
            text="Loading your content..."
            styles={{
              overlay: (base) => ({
                ...base,
                borderRadius: '10px',
                backgroundColor: 'rgba(153,153,153,0.4)',
                height: 'calc(100% + 80px)',
                width: 'calc(100% + 120px)',
                top: '-40px',
                left: '-60px',
                '& svg circle': {
                  stroke: 'black',
                },
              }),
            }}
          >
            {isHttp && !isFormHttpFilled ? (
              <CommandForm handleSubmit={fillHeader} />
            ) : (
              <MainPage
                service={!isHttp ? ApplicationService : AxiosService}
                commomService={!isHttp ? CommomService : AxiosCommomService}
                onApplicationError={setIsFormHttpFilled}
                isHttp={isHttp}
              />
            )}
          </LoadingOverlay>
        </PageTemplate>
        <Footer />
      </div>
    </CommonProvider>
  )
}

export default App
