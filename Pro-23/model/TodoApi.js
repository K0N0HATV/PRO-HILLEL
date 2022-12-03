class TodoApi {
    static URL = 'https://6367c5fbedc85dbc84db6854.mockapi.io/api/v1/listid'

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

    static getList() {
        return this.request('GET')
            .catch(err => {
                throw new Error('Can not get todos list from server')
            })
    }

    static create(todo) {
        return this.request('POST', '', todo)
            .catch(err => {
                throw new Error('Can not create todos list from server')
            })
    }

    static update(id, todo) {
        return this.request('PUT', id, todo)
            .catch(err => {
                throw new Error('Can not create todos list from server')
            })
    }

    static delete(id) {
        return this.request('DELETE', id)
            .catch(err => {
                throw new Error('Can not delete todos list from server')
            })
    }
}