import { ApiAiAssistant } from 'actions-on-google'
import * as apiAiActions from '../apiActions'
import  * as services from '../services'
import storeData from '../db/sample_data.json'
import { numToStars } from '../utils'
import { sendSms } from '../nexmo/nexmo'

export function apiAssistant(request, response) {
  const assistant = new ApiAiAssistant({ request: request, response: response })
  
  async function greetUser(assistant) {
    return assistant.ask('Hello world!')
  }
  
  function jobFinder(assistant) {
  
    assistant.data.jobs = assistant.getArgument('jobs')
    
    const storeDataFilter = storeData.workers.filter((item, index) => {
      return assistant.data.jobs === item.skills[0]
    })
    
    return assistant.askWithCarousel('Which of these looks good?',
      assistant.buildCarousel()
        .addItems(storeDataFilter.map((info, index) => {
          const stars = numToStars(info.rating)
            return assistant.buildOptionItem(`${index}`,
              ['clicked one', 'clicked two', 'clicked three'])
              .setTitle(info.name)
              .setDescription(`$${info.hourlyRate}/hr  \n ${stars}`)
              .setImage(info.photo, 'assistance')
          })
        )
    )
  }
  
  function optionIntent(assistant) {
    const storeDataFilter = storeData.workers.filter((item, index) => {
      return assistant.data.jobs === item.skills[0]
    })
    
    const selectedOption = Object.keys(storeDataFilter)[assistant.getSelectedOption()]
    const option = storeDataFilter[selectedOption]
    
    console.log(selectedOption)
    return assistant.ask(assistant.buildRichResponse()
      .addSimpleResponse({speech: `Okay, would you like to request service from ${option.name} for $${option.hourlyRate}`, displayText: `Okay, would you like to request service from ${option.name} for $${option.hourlyRate}`})
      .addBasicCard(assistant.buildBasicCard(`${option.name} for $${option.hourlyRate}`)
        .setTitle(`Your service request`)
        // .setBodyText(stringUtil(data.description).stripTags().s)
        .addButton('Learn more', 'https://google.com')
        .setImage(option.photo, 'singapore', 250, 250))
      // .addSimpleResponse({speech: `Okay, would you like to request service from ${option.name} for $${option.hourlyRate}`, displayText: `Okay, would you like to request service from ${option.name} for $${option.hourlyRate}`})
      .addSuggestions(['Yes', 'No Thanks']))
  }

  function helper(assistant) {
    return assistant.ask('i can help you')
  }
  
  async function purchaseType(assistant) {
    // to, companyName, location, time
    await sendSms('****', 'Intuit', '2600 Marine Way, Mountain View, CA 94043', '5:00 PM PST')
    
    return assistant.ask('purchased')
  }

  let actionMap = new Map()
  
  actionMap.set(apiAiActions.welcomeIntent(), greetUser)
  actionMap.set(apiAiActions.jobFinder(), jobFinder)
  actionMap.set(apiAiActions.help(), helper)
  actionMap.set('action.input', optionIntent)
  actionMap.set(apiAiActions.purchase(), purchaseType)
  
  assistant.handleRequest(actionMap)
}
