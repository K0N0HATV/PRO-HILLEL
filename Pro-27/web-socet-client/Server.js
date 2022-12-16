export default class WebSocet {
    constructor() {
        this.ws = new WebSocket('ws://localhost:8080')
        this.ws.onopen = () => {
            this.openServer()
        }
        this.ws.onclose = () => {
            this.closeServer()
        }
        this.ws.onerror = (err) => {
            this.showError(err)
        }
    }

    sendMessage(message) {
        this.ws.send(JSON.stringify(message))
    }

    openServer() {
        this.sendMessage({ name: 'serve', message: 'connection on server' })
    }

    closeServer() {
        this.sendMessage({ name: 'serve', message: 'disconnect from server' })
    }

    showError(err) {
        console.log('error', err);
    }
}