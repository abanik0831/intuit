import { ApiAiAssistant } from 'actions-on-google'
import * as apiAiActions from '../apiActions'
import  * as services from '../services'

export function apiAssistant(request, response) {
  const assistant = new ApiAiAssistant({ request: request, response: response })
  
  async function greetUser(assistant) {
    return assistant.ask('Hello world!')
  }

  let actionMap = new Map()
  
  actionMap.set(apiAiActions.welcomeIntent(), greetUser)
  
  assistant.handleRequest(actionMap)
}
