import { ApiAiAssistant } from 'actions-on-google'
import * as apiAiActions from '../apiActions'
import  * as services from '../services'
import storeData from '../db/sample_data.json'

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
        .addItems(storeData.data.map((info, index) => {
          console.log(info)
            // let a
            // if (index === 0) {
            //   a = 'one'
            // }
            //
            // if (index === 1) {
            //   a = 'two'
            // }
            //
            // if (index === 2) {
            //   a = 'three'
            // }
            //
            return assistant.buildOptionItem(`clicked_${index}`,
              ['clicked one', 'clicked two', 'clicked three'])
              .setTitle(info.name)
              .setDescription('hello world')
              .setImage(info.photo, 'assistance')
          })
        )
    )
  }
  
  function helper(assistant) {
    console.log('helper!')
    return assistant.ask('i can help you')
  }

  let actionMap = new Map()
  
  actionMap.set(apiAiActions.welcomeIntent(), greetUser)
  actionMap.set(apiAiActions.jobFinder(), jobFinder)
  actionMap.set(apiAiActions.help(), helper)
  
  assistant.handleRequest(actionMap)
}
