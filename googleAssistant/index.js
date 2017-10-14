import { ApiAiAssistant } from 'actions-on-google'
import * as apiAiActions from '../apiActions'
import request from 'request-promise'

export function apiAssistant(request, response) {
  const assistant = new ApiAiAssistant({ request: request, response: response })
  
  async function greetUser(assistant) {
    return assistant.ask('hello singapore airlines!')
  }
  
  async function searchFlights(assistant) {
    console.log('hiiii')
    return assistant.ask('found it!')
  }

  async function bookFlight(assistant) {
    
  }

  async function extendSession(assistant) {
    
  }

  async function createPnr(assistant) {

  }

  async function confirmPnr(assistant) {

  }
  
  function unhandle(assistant) {
    return assistant.ask('failed')
  }
  
  let actionMap = new Map()
  
  actionMap.set(apiAiActions.welcomeIntent(), greetUser)
  actionMap.set(apiAiActions.searchFlights(), searchFlights)
  actionMap.set(apiAiActions.bookFlight(), bookFlight)  
  actionMap.set(apiAiActions.unhandled(), unhandle)
  
  assistant.handleRequest(actionMap)
}