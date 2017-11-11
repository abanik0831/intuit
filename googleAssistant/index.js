import { ApiAiAssistant } from 'actions-on-google'
import * as apiAiActions from '../apiActions'
import  * as services from '../services'
import storeData from '../db/sample_data.json'
import { numToStars } from '../utils'

export function apiAssistant(request, response) {
  const assistant = new ApiAiAssistant({ request: request, response: response })
  
  async function greetUser(assistant) {
    return assistant.ask('Hello world!')
  }
  
  function jobFinder(assistant) {
    // return assistant.ask('this is job finder')
    console.log('hello world')
    console.log(storeData)
    const mapi = [1,3,4,5]
    // return assistant.ask('hih hihihi')
    return assistant.askWithCarousel('Which of these looks good?',
      assistant.buildCarousel()
        .addItems(storeData.workers.map((info, index) => {
          console.log(info)
            let a
            if (index === 0) {
              a = 'one'
            }

            if (index === 1) {
              a = 'two'
            }

            if (index === 2) {
              a = 'three'
            }

          const stars = numToStars(info.rating)

            return assistant.buildOptionItem(`clicked_${a}`,
              ['clicked one', 'clicked two', 'clicked three'])
              .setTitle(info.name)
              .setDescription(`$${info.hourlyRate}/hr  \n ${stars}`)
              .setImage(info.photo, 'assistance')
          })
        )
    )
  }
  
  function optionIntent(assistant) {
    console.log('hi')
   //  console.log(assistant.getSelectedOption())
    // if (assistant.getSelectedOption() === 'clicked_one') {
      return assistant.ask(assistant.buildRichResponse()
        .addSimpleResponse({speech: 'I found the hello world', displayText: 'I found the test this'})
        .addBasicCard(assistant.buildBasicCard('testing')
          .setTitle('speechless')
          // .setBodyText(stringUtil(data.description).stripTags().s)
          .addButton('Learn more', 'https://google.com')
          .setImage('http://www.travelzoo.com/blog/wp-content/uploads/2017/03/Singapore_shutterstock_313516310.jpg', 'singapore', 250, 250))
        .addSimpleResponse({speech: 'Would you like to show the next event of ?', displayText: 'Would you like to show the next event of  ?'})
        .addSuggestions(['Buy', 'No Thanks']))
    // }
  }

  function helper(assistant) {
    console.log('helper!')
    return assistant.ask('i can help you')
  }
  
  function purchaseType(assistant) {
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
