import { ApiAiAssistant } from 'actions-on-google'
import * as apiAiActions from '../apiActions'
import  * as services from '../services'

export function apiAssistant(request, response) {
  const assistant = new ApiAiAssistant({ request: request, response: response })
  
  async function greetUser(assistant) {
    console.log(assistant)
    return assistant.ask('hi singapore airlines!')
  }
  
  async function searchFlights(assistant) {
    console.log(assistant.data)
    if (assistant.data !== undefined) {
      // console.log(assistant.data["geo-country.original"])
      // console.log(assistant.data["geo-city1.original"])
      console.log("BEFORE")
      const searchFlights = await services.searchFlights()
      console.log("AFTER")
      return assistant.ask(assistant.buildRichResponse()
      .addSimpleResponse({speech: 'I found some flights matching your request!', displayText: 'I found some flights matching your request!'})
      .addBasicCard(assistant.buildBasicCard('<h4>SIN to FCO</h4> <div style="text-align:center"> <b>Departure:</b> 2017-11-01 1:55 am <br/> <b>Arrival:</b> 2017-11-08 8:10 am <br/> <h4>FCO to SIN</h4> <b>Departure:</b> 2017-11-08 11:15 am <br/> <b>Arrival</b>: 2017-11-09 6:05 am </div> <br/> $1303')
        //.setTitle('Round Trip to FCO')
        // .setBodyText(stringUtil(data.description).stripTags().s)
        .addButton('Learn more', 'https://google.com')
        .setImage('http://media.therakyatpost.com/wp-content/uploads/2016/06/SIA-A380-940x470.jpg', 'singapore', 250, 250))
      .addSimpleResponse({speech: 'Would you like to show the next event of ?', displayText: 'Would you like to show the next event of  ?'})
      .addSuggestions(['Buy', 'No thanks']))
    } else {
      console.log('hiiii')
      return assistant.ask('found it!')
    }
  }

  async function bookFlight(app) {
    console.log('hello...')
    // const extendSession = await services.extendSession('JSESSIONID=0mAckWyIQgKTirSL9ijsXo15yprsrP1e2du7nEAnB87WnzUAul18!-548878662!-1110320914')
    // const createpnr = await services.createpnr('JSESSIONID=0mAckWyIQgKTirSL9ijsXo15yprsrP1e2du7nEAnB87WnzUAul18!-548878662!-1110320914')
    // const confirmpnr = await services.confirmpnr('JSESSIONID=0mAckWyIQgKTirSL9ijsXo15yprsrP1e2du7nEAnB87WnzUAul18!-548878662!-1110320914', 'TBFVRC')
    // console.log(confirmpnr)
    //return assistant.ask('in progress...')
  
    const visitCity = await services.getTopThreeVisitDestinations()
  
    console.log(visitCity.length)
    
    // [
    //   app.buildOptionItem('title',
    //     ['synonym of KEY_ONE 1', 'synonym of KEY_ONE 2'])
    //     .setTitle('Number one').setDescription('hello world')
    //     .setImage('http://www.travelzoo.com/blog/wp-content/uploads/2017/03/Singapore_shutterstock_313516310.jpg', 'singapore'),
    //   app.buildOptionItem('title 2',
    //     ['synonym of KEY_TWO 1', 'synonym of KEY_TWO 2'])
    //     .setTitle('Number two').setDescription('hello world two')
    //     .setImage('http://www.travelzoo.com/blog/wp-content/uploads/2017/03/Singapore_shutterstock_313516310.jpg', 'singapore')
    // ]
    
    // assistant.askWithCarousel('Which of these looks good?',
    //   assistant.buildCarousel().addItems(
    //     assistant.buildOptionItem('another_choice', ['Another choice']).
    //     setTitle('Another choice').setDescription('Choose me!')))
    
    // return assistant.askWithCarousel(assistant.buildRichResponse()
    //     .addSimpleResponse('hello world'),
    //   // Build a carousel
    //   assistant.buildCarousel()
    //     .addItems(assistant.buildOptionItem('another_choice', ['Another choice']).setTitle('hi').setDescription('hello'))
        // .addItems(list[2])http://www.travelzoo.com/blog/wp-content/uploads/2017/03/Singapore_shutterstock_313516310.jpg
        // .addItems(list[3])
    app.askWithCarousel('Which of these looks good?',
      app.buildCarousel()
        .addItems(visitCity.map((cityInfo, index) => {
          console.log('how many times u come here?')
          console.log(cityInfo)
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
          
          console.log(`clicked_${a}`)
          
          return app.buildOptionItem(`clicked_${a}`,
            ['clicked one', 'clicked two', 'clicked three'])
            .setTitle(cityInfo.title)
            .setDescription('visit rome')
            .setImage(`http:${cityInfo.imageUrl}`, 'singapore')
        })))
    
    // app.ask(app.buildRichResponse()
    //   .addSimpleResponse({speech: 'I found the hello world', displayText: 'I found the test this'})
    //   .addBasicCard(assistant.buildBasicCard('testing')
    //     .setTitle('speechless')
    //     // .setBodyText(stringUtil(data.description).stripTags().s)
    //     .addButton('Learn more', 'https://google.com')
    //     .setImage('http://www.travelzoo.com/blog/wp-content/uploads/2017/03/Singapore_shutterstock_313516310.jpg', 'singapore', 250, 250))
    //   .addSimpleResponse({speech: 'Would you like to show the next event of ?', displayText: 'Would you like to show the next event of  ?'})
    //   .addSuggestions(['Buy', 'No thanks']))
    
    
  }
  
  async function locationSelected(assistant) {
    console.log(assistant)
    assistant.ask('ok i got it working')
  }

  async function extendSession(sessionId) {
    return services.extendSession(sessionId)
  }

  async function createPnr() {

  }

  async function confirmPnr() {

  }
  
  function unhandle(assistant) {
    return assistant.ask('failed')
  }
  
  let actionMap = new Map()
  
  actionMap.set(apiAiActions.welcomeIntent(), greetUser)
  actionMap.set(apiAiActions.searchFlights(), searchFlights)
  actionMap.set(apiAiActions.bookFlight(), bookFlight)  
  actionMap.set(apiAiActions.visitLocationSelected(), locationSelected)
  actionMap.set(apiAiActions.unhandled(), unhandle)
  
  assistant.handleRequest(actionMap)
}