import { ApiAiAssistant } from 'actions-on-google'
import * as apiAiActions from '../apiActions'

export function apiAssistant(request, response) {
  const assistant = new ApiAiAssistant({ request: request, response: response })
  
  async function greetUser(assistant) {
    return assistant.ask('hello singapore airlines!')
  }
  
  async function searchFlights(assistant) {
    console.log('hiiii')
    return assistant.ask('found it!')
  }
  
  function unhandle(assistant) {
    return assistant.ask('failed')
  }
  
  let actionMap = new Map()
  
  actionMap.set(apiAiActions.welcomeIntent(), greetUser)
  actionMap.set(apiAiActions.searchFlights(), searchFlights)
  actionMap.set(apiAiActions.unhandled(), unhandle)
  
  assistant.handleRequest(actionMap)
}