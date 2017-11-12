import secret from '../secret.json'

const Client = require('castv2-client').Client
const DefaultMediaReceiver = require('castv2-client').DefaultMediaReceiver
const GoogleTTS = require('google-tts-api')

const App = {
    playin: false,
    DeviceIp: '',
    Player: null,
    GoogleHome: (host, url, callback) => {
        var client = new Client()
        client.connect(host, () => {
            client.launch(DefaultMediaReceiver, (err, player) => {
                var media = {
                    contentId: url,
                    contentType: 'audio/mp3',
                    streamType: 'BUFFERED'
                }
                App.Player = player
                App.Player.load(media, { autoplay: true }, (err, status) => {
                    App.Player.on('status', (status) => {
                        if (status.playerState == 'IDLE' && App.playin == false) {
                            App.Player.stop()
                            client.close()
                        }
                    })
                })
            })
        })
        client.on('error', (err) => {
            console.log('Error: %s', err.message)
            client.close()
            callback('error')
        })
    },
    run: (ip, text) => {
        App.DeviceIp = ip
        var lang = 'en'
        GoogleTTS(text, lang, 1).then((url) => {
            App.GoogleHome(App.DeviceIp, url, (res) => {
                console.log(res)
            })
        })
    }
}

function pushVoiceMessage(message) {
    App.run(secret.googleHomeIp, message)
}

export {
    pushVoiceMessage,
}