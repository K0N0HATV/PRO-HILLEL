export default class TodoApi {
    static URL = 'https://6367c5fbedc85dbc84db6854.mockapi.io/api/v1/listid'

    static getList() {
        return fetch(this.URL)
            .then(res => {
                if (res.ok) {
                    return res.json()
                }

                throw new Error('Can`t get Todo list from server')
            })
    }

    static create(todo) {
        return fetch(this.URL, {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }

                throw new Error('Can`t create Todo on server')
            })
    }

    static update(id, todo) {
        return fetch(`${this.URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(todo),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }

                throw new Error('Can`t update Todo on server')
            })
    }

    static delete(id) {
        return fetch(`${this.URL}/${id}`, {
            method: 'DELETE',
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }

                throw new Error('Can`t delete Todo on server')
            })
    }
}