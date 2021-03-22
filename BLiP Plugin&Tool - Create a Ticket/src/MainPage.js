import React, { useEffect, useState } from 'react'
import 'blip-toolkit/dist/blip-toolkit.css'
import PropTypes from 'prop-types'
import { Form, Button, Alert } from 'react-bootstrap'
import ContactCard from './ContactCard'
import TicketCard from './TicketCard'
import { AiOutlineWarning } from 'react-icons/ai'
import { Constants } from './assets/Constants'
import ReactGA from 'react-ga'
function MainPage({ service, commomService, onApplicationError, isHttp }) {
  const [contactId, setContactId] = useState('')
  const [contact, setContact] = useState()
  const [ticket, setTicket] = useState()
  const [tunnel, setTunnel] = useState('')
  const [isRouter, setIsRouter] = useState(false)
  const [isDeskNotFounded, setIsDeskNotFounded] = useState(false)
  const [message, setMessage] = useState({ active: false, value: '' })
  const [botFields, setBotFields] = useState({
    flowId: '',
    deskId: '',
    context: 'false',
  })

  const checkRequiredFields = (settings) => {
    if (!settings.flow.states.find((e) => e.id.includes('desk'))) {
      commomService.showErrorToast(
        'Could not find customer service block in your flow, please add one to continue!'
      )
      setIsDeskNotFounded(true)
      throw new Error(
        'Could not find customer service block in your flow, please add one to continue!'
      )
    }

    return true
  }

  const fetchApi = async () => {
    try {
      const application = await service.getApplication()
      setIsRouter(
        application.applicationJson.settings.hasOwnProperty(
          Constants.ROUTER_KEY
        )
      )
      if (
        application &&
        !application.applicationJson.settings.hasOwnProperty(
          Constants.ROUTER_KEY
        ) &&
        checkRequiredFields(application.applicationJson.settings)
      ) {
        const desk = application.applicationJson.settings.flow.states.find(
          (e) => e.id.includes(Constants.DESK)
        ).id

        setBotFields({
          flowId: application.applicationJson.settings.flow.id,
          deskId: desk,
          context: application.applicationJson.settings.flow.configuration.hasOwnProperty(
            Constants.CONTEXT_KEY
          )
            ? application.applicationJson.settings.flow.configuration[
              Constants.CONTEXT_KEY
            ]
            : Constants.CONTEXT_DISABLE,
        })
      }
    } catch (error) {
      console.error('Error fetchApi ' + error)
      onApplicationError(false)
    }
  }

  const handleContactLoad = async (e) => {
    e.preventDefault()
    setTicket()
    ReactGA.event({
      category: Constants.GA_CATEGORIY,
      action: Constants.GA_LOAD_CONTACT,
      label: isHttp ? 'Http' : 'Plugin',
    })
    if (contactId.includes(Constants.TUNNEL))
      commomService.withLoading(async () => {
        const contactTunnel = await service.getTunnelInfo(contactId)
        setTunnel(contactTunnel)
        setContact(await service.getContact(contactId))
      })
    else
      commomService.withLoading(async () => {
        setContact(await service.getContact(contactId))
      })
  }

  const handleContactUpdate = (e, updatedContact) => {
    e.preventDefault()
    ReactGA.event({
      category: Constants.GA_CATEGORIY,
      action: Constants.GA_UPDATE_CONTACT,
      label: isHttp ? 'Http' : 'Plugin',
    })
    commomService.withLoading(async () => {
      if (await service.mergeContact(updatedContact)) {
        setContact(await service.getContact(contactId))
        commomService.showSuccessToast('Contact updated!')
      }
    })
  }

  const createTicketTunnelContextEnable = () => {
    commomService.withLoading(async () => {
      await service.setMasterState(
        tunnel.originator,
        tunnel.destination,
        tunnel.owner
      )
      if (message.active)
        await service.sendMessage(contact.identity, message.value)
      await service.setState(
        botFields.flowId,
        botFields.deskId,
        tunnel.originator,
        tunnel.owner
      )
      setTicket(await service.createTicket(contact.identity))
    })
  }

  const createTicketTunnelContextDisable = () => {
    commomService.withLoading(async () => {
      await service.setMasterState(
        tunnel.originator,
        tunnel.destination,
        tunnel.owner
      )
      if (message.active)
        await service.sendMessage(contact.identity, message.value)
      await service.setState(
        botFields.flowId,
        botFields.deskId,
        contact.identity
      )
      setTicket(await service.createTicket(contact.identity))
    })
  }

  const createTicketOriginator = () => {
    commomService.withLoading(async () => {
      if (message.active)
        await service.sendMessage(contact.identity, message.value)
      await service.setState(
        botFields.flowId,
        botFields.deskId,
        contact.identity
      )
      setTicket(await service.createTicket(contact.identity))
    })
  }

  const handleCreateTicket = () => {
    ReactGA.event({
      category: Constants.GA_CATEGORIY,
      action: Constants.GA_CREATE_TICKET,
      label: isHttp ? 'Http' : 'Plugin',
    })
    if (contactId.includes(Constants.TUNNEL)) {
      botFields.context === Constants.CONTEXT_ENABLE
        ? createTicketTunnelContextEnable()
        : createTicketTunnelContextDisable()
    } else {
      createTicketOriginator()
    }
  }

  useEffect(() => {
    commomService.withLoading(async () => {
      await fetchApi()
      ReactGA.initialize(process.env.REACT_APP_GA_KEY)
    })
  }, [service, commomService])

  const RouterBox = () => {
    return (
      <Alert variant="danger">
        <AiOutlineWarning size="30" />
        This tool does not work on the router, please{' '}
        <b>use it on the customer service subbot!</b>
      </Alert>
    )
  }

  return !isRouter ? (
    <div id="tab-nav" className="bp-tabs-container">
      {/* Contact id Form */}

      <Form
        onSubmit={(e) => {
          handleContactLoad(e)
        }}
      >
        <Form.Label>Contact Identity:</Form.Label>
        <Form.Control
          type="text"
          value={contactId}
          onChange={(e) => {
            setContactId(e.target.value)
          }}
          placeholder="cce2364f-0818-42b4-9b61-53dc7011a9dd.bot@0mn.io"
          required
        />
        <br />
        <Button
          className="float-right"
          disabled={isDeskNotFounded}
          type="submit"
        >
          Load
        </Button>
      </Form>

      {contact && (
        <>
          <br />
          <ContactCard
            data={contact}
            onUpdate={(e, data) => {
              handleContactUpdate(e, data)
            }}
          />
          <hr />
          <Form
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <Form.Check
              style={{ display: ticket ? 'none' : '', padding: '10px' }}
              type="checkbox"
              defaultChecked={message.active}
              onChange={(e) => {
                setMessage({ ...message, active: e.target.checked })
              }}
              label="Send a message before creating a ticket"
            />

            {message.active && (
              <>
                {' '}
                <Form.Label>Message:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Hello ${contact.name}, how are you?"
                  value={message.value}
                  onChange={(e) => {
                    setMessage({ ...message, value: e.target.value })
                  }}
                />
                <hr />
              </>
            )}
          </Form>
          <Button
            className="float-right"
            type="submit"
            variant="success"
            block
            style={{ display: ticket ? 'none' : '' }}
            onClick={() => {
              handleCreateTicket()
            }}
          >
            Create a Ticket
          </Button>
        </>
      )}
      <br />
      <TicketCard data={ticket} />
    </div>
  ) : (
    <RouterBox />
  )
}
MainPage.propTypes = {
  service: PropTypes.elementType.isRequired,
  onApplicationError: PropTypes.elementType.isRequired,
  commomService: PropTypes.elementType.isRequired,
  isHttp: PropTypes.bool.isRequired,
}
export default MainPage
