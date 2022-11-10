class ContactApi {
    static URL = 'https://6367c5fbedc85dbc84db6854.mockapi.io/api/v1/table-contact'

    static getList() {
        return fetch(this.URL)
            .then(res => {
                if (res.ok) {
                    return res.json()
                }

                throw new Error('Can`t get Contact list from server')
            })
    }
    static createContact(contact) {
        return fetch(this.URL, {
            method: 'POST',
            body: JSON.stringify(contact),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }

                throw new Error('Can`t create Contact on server')
            })
    }
    static updateContact(id, contact) {
        return fetch(`${this.URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(contact),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }

                throw new Error('Can`t update Contact on server')
            })
    }
    static deleteContact(id) {
        return fetch(`${this.URL}/${id}`, {
            method: 'DELETE',
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }

                throw new Error('Can`t delete Contact on server')
            })
    }
}