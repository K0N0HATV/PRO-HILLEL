class GalleryApi {
    static URL = 'https://jsonplaceholder.typicode.com'
    static URL_ALBUMS_IMG = '/photos?albumId='
    static URL_ALBUMS_LINKS = '/albums'

    static request(id = '', url = '', method = 'GET', body) {
        return fetch(`${this.URL}${id ? `${this.URL_ALBUMS_IMG}${id}` : `${this.URL_ALBUMS_LINKS}`}`, {
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
const CLASS_LINK_ITEM = 'linkItem'
const SELECTOR_ID_CONTAINER_LIST_LINKS = '#albums_list_a'
const SELECTOR_ID_CONTAINER_LIST_IMG = '#albums_list_img'
const DEFAULT_ALBUMS_INDEX = 0

const albumsListLinksContainer = document.querySelector(SELECTOR_ID_CONTAINER_LIST_LINKS)
const albumsListImgContainer = document.querySelector(SELECTOR_ID_CONTAINER_LIST_IMG)

albumsListLinksContainer.addEventListener('click', onalbumsListLinksContainerClick)

getListLinks()

function onalbumsListLinksContainerClick(e) {
    e.preventDefault()

    if (isLink(e.target, CLASS_LINK_ITEM)) {
        const idLink = getId(e.target)

        if (idLink) {
            getListImg(idLink)
        }
    }
}

function getListImg(id) {
    GalleryApi.getListImg(id)
        .then(renderListImg)
        .catch(showError)
}

function getListLinks() {
    GalleryApi.getListAlbums()
        .then(linksList => {
            renderListLinks(linksList)
            getListImg(linksList[DEFAULT_ALBUMS_INDEX].id)
        })
        .catch(showError)
}

function renderListLinks(ListLinks) {
    const html = ListLinks.map(getTemplateLinks).join('')

    albumsListLinksContainer.innerHTML = html
}

function renderListImg(ListImg) {
    const html = ListImg.map(getTemplateImg).join('')

    albumsListImgContainer.innerHTML = html
}

function getTemplateImg(img) {
    return `
    <img class="imgItem" src="${img.thumbnailUrl}" alt="">
    `
}

function getTemplateLinks(albumsLink) {
    return `
    <a href="#" class="linkItem" data-id="${albumsLink.id}">${albumsLink.title}</a>
    `
}

function isLink(el, classItem) {
    return el.classList.contains(classItem)
}

function getId(el) {
    return el.dataset.id
}

function showError(err) {
    alert(err.message)
}