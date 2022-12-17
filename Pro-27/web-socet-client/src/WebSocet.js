export default class WebSocet {
    static URL = 'ws://localhost:8080'

    constructor(option) {
        this.option = option
        this.ws = new WebSocket(WebSocet.URL)
        this.ws.onopen = () => {
            this.onopen()
        }
        this.ws.onmessage = (e) => {
            this.onmessage(e)
        }
        this.ws.onclose = () => {
            this.onclose()
        }
        this.ws.onerror = (err) => {
            this.onerror(err)
        }
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