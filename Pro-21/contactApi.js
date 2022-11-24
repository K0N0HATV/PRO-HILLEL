class ContactApi {
    static URL = 'https://6367c5fbedc85dbc84db6854.mockapi.io/api/v1/table-contact'

    static request(method = 'GET', id, body) {
        return fetch(`${this.URL}${id ? `/${id}` : ''}`, {
            method,
            body: body ? JSON.stringify(body) : undefined,
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }

                throw new Error('Can not get request', { cause: res })
            })
    }

    static getList() {
        return this.request().catch(() => {
            throw new Error('Can not get contact list from server')
        })
    }

    static create(newContact) {
        return this.request('POST', '', newContact).catch(() => {
            throw new Error('Can not create contact on server')
        })
    }

    static update(id, changes) {
        return this.request('PUT', id, changes).catch(() => {
            throw new Error('Can not update contact on server')
        })
    }

    static delete(id) {
        return this.request('DELETE', id).catch(() => {
            throw new Error('Can not delete contact on server')
        })
    }
}