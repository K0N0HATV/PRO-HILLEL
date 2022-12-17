export default class WebSocet {
    static URL = 'ws://localhost:8080'

    constructor(option) {
        this.option = option
        this.ws = new WebSocket(WebSocet.URL)
        this.ws.onopen = this.onopen.bind(this)
        this.ws.onmessage = this.onmessage.bind(this)
        this.ws.onclose = this.onclose.bind(this)
        this.ws.onerror = this.onerror
    }

    sendMessage(message) {
        this.ws.send(JSON.stringify(message))
    }

    onmessage(e) {
        const data = JSON.parse(e.data)

        this.option.onMessage(data)
    }

    onopen() {
        const data = {
            name: 'serve',
            message: 'connection on server'
        }

        this.sendMessage(data)
    }

    onclose() {
        const data = {
            name: 'serve',
            message: 'disconnect from server'
        }

        this.sendMessage(data)
    }

    onerror(err) {
        console.log('error', err);
    }
}