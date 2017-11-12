import { ApiAiAssistant } from 'actions-on-google'
import * as apiAiActions from '../apiActions'
import  * as services from '../services'
import storeData from '../db/sample_data.json'
import creditCard from '../db/creditcard.json'
import secret from '../secret.json'
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
  
  async function optionIntent(assistant) {
    
    if (assistant.data.makePayment === true ) {
      assistant.data.makePayment = false
      // make payment call here...
      await services.makePayment(assistant.data.id)

      return assistant.ask('Great! You have successfully paid $360 to John Mack. How would you rate his service?')
    }
    
    
    const storeDataFilter = storeData.workers.filter((item, index) => {
      return assistant.data.jobs === item.skills[0]
    })
    
    const selectedOption = Object.keys(storeDataFilter)[assistant.getSelectedOption()]
    const option = storeDataFilter[selectedOption]
    
    assistant.data.optionSelected = option
    
    assistant.data.selectPerson = true
    
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
    if (assistant.data.selectPerson) {
      assistant.data.selectPerson = false
      // to, companyName, location, time
      const text = `${storeData.companies[0].name} is requesting your services at ${storeData.companies[0].location} at ${'2:00 PM'}. Do you accept? Reply with y(es) or n(o)`
      await sendSms(secret.testWorkerPhone, text)

      await services.createBill()
      
      return assistant.tell(`Great! we will get back to you once ${assistant.data.optionSelected.name} replies!`)
    }

    if (assistant.data.moneyMovement === true) {
      assistant.data.moneyMovement = false
  
      assistant.data.makePayment = true
      return assistant.askWithCarousel('Okay, select the card you want to pay with',
        assistant.buildCarousel()
          .addItems(creditCard.card.map((details, index) => {
              return assistant.buildOptionItem(`${index}`,
                ['clicked one', 'clicked two', 'clicked three'])
                .setTitle(details.name)
                .setDescription(`****${details.last4}  \n ${details.exp}`)
                .setImage(details.photo, 'assistance')
            })
          )
      )

    }

  }
  
  async function accounting(assistant) {
    return assistant.ask('keeping track')
  }
  
  async function moneyMovement(assistant) {
    assistant.data.id = await services.readBillDue()
    assistant.data.moneyMovement = true

    return assistant.ask('Okay, you owe $360 to John Mack. Would you like to make the payment?')
  }
  
  async function rateContracter(assistant) {
  
    const x = numToStars(5)
    return assistant.ask(`great! ${x}`)
  }

  let actionMap = new Map()
  
  actionMap.set(apiAiActions.welcomeIntent(), greetUser)
  actionMap.set(apiAiActions.jobFinder(), jobFinder)
  actionMap.set(apiAiActions.help(), helper)
  actionMap.set('action.input', optionIntent)
  actionMap.set(apiAiActions.purchase(), purchaseType)
  actionMap.set(apiAiActions.money(), moneyMovement)
  actionMap.set(apiAiActions.accounting(), accounting)
  actionMap.set(apiAiActions.rating(), rateContracter)
  
  assistant.handleRequest(actionMap)
}
