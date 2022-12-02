class NotesApi {
    static URL = 'https://6367c5fbedc85dbc84db6854.mockapi.io/api/v1/notes'

    static request(method, urlId, body) {
        return fetch(`${this.URL}${urlId ? `/${urlId}` : ''}`, {
            method: method,
            body: body ? JSON.stringify(body) : undefined,
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }

                throw new Error('Can not execute request method', { cause: res })
            })
    }

    static getlist() {
        return this.request('GET')
            .catch(err => {
                throw new Error('Can not get notes list from server')
            })
    }

    static create(note) {
        return this.request('POST', '', note)
            .catch(err => {
                throw new Error('Can not create notes list from server')
            })
    }

    static update(id, note) {
        return this.request('PUT', id, note)
            .catch(err => {
                throw new Error('Can not create notes list from server')
            })
    }

    static delete(id) {
        return this.request('DELETE', id)
            .catch(err => {
                throw new Error('Can not delete notes list from server')
            })
    }
}