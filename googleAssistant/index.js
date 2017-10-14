import { ApiAiAssistant } from 'actions-on-google'
import * as apiAiActions from '../apiActions'
var request = require('request')

export function apiAssistant(request, response) {
  const assistant = new ApiAiAssistant({ request: request, response: response })
  
  async function greetUser(assistant) {
    console.log(assistant)
    return assistant.ask('hi singapore airlines!')
  }
  
  async function searchFlights(assistant) {
    console.log(assistant.data)
    if (assistant.data !== undefined) {
      console.log(assistant.data["geo-country.original"])
      console.log(assistant.data["geo-city1.original"])
      // get departure date
      // get return date
      // get number of adults travelling
      var params = {  
         "clientUUID":"daredevil123",
         "request":{  
            "itineraryDetails":[  
               {  
                  "originAirportCode":"SIN",
                  "destinationAirportCode":"FCO",
                  "departureDate":"2017-11-01"
               },
               {  
                  "originAirportCode":"FCO",
                  "destinationAirportCode":"SIN",
                  "departureDate":"2017-11-08"
               }
            ],
            "cabinClass":"Y",
            "adultCount":1
         }
      }
      request.post({
        uri: 'https://apidev.singaporeair.com/appchallenge/flight/search',
        form: params
      }, function(error, response, body) {
        console.log(body);
      })
    }
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