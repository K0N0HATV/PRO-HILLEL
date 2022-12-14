export default class StudentApi {
    static URL = 'https://6367c5fbedc85dbc84db6854.mockapi.io/api/v1/student-list'

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
                throw new Error('Can not get students list from server')
            })
    }

    static create(student) {
        return this.request('POST', '', student)
            .catch(err => {
                throw new Error('Can not create student on server')
            })
    }

    static update(id, marks) {
        return this.request('PUT', id, marks)
            .catch(err => {
                throw new Error('Can not update student on server')
            })
    }

    static delete(id) {
        return this.request('DELETE', id)
            .catch(err => {
                throw new Error('Can not delete student on server')
            })
    }
}