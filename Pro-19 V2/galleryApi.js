class GalleryApi {
    static URL = 'https://jsonplaceholder.typicode.com'

    static request(id = '', url = '', method = 'GET', body) {
        return fetch(`${this.URL}${id ? `/photos?albumId=${id}` : "/albums"}`, {
            method,
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json',
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }

                throw new Error('Can not execute request method', { cause: res })
            })
    }

    static getListAlbums() {
        return this.request()
            .catch(err => {
                throw new Error('Can not get albums list from server')
            })
    }

    static getListImg(id) {
        return this.request(id)
            .catch(err => {
                throw new Error('Can not get img list from server')
            })
    }
}