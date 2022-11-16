const CLASS_LINK_ITEM = 'linkItem'
const SELECTOR_ID_CONTAINER_LIST_LINKS = '#albums_list_a'
const SELECTOR_ID_CONTAINER_LIST_IMG = '#albums_list_img'
const DEFAULT_ALBUMS_INDEX = 0

const albumsListLinks = document.querySelector(SELECTOR_ID_CONTAINER_LIST_LINKS)
const albumsListImg = document.querySelector(SELECTOR_ID_CONTAINER_LIST_IMG)

albumsListLinks.addEventListener('click', onAlbumsListLinksClick)

getList()
GalleryApi.getListImg()
    .then(imgList => {
        getList(imgList[DEFAULT_ALBUMS_INDEX].id)
    })
    .catch(showError)

function onAlbumsListLinksClick(e) {
    e.preventDefault()

    if (isLink(e.target, CLASS_LINK_ITEM)) {
        const idLink = getId(e.target)

        if (idLink) {
            getList(idLink)
        }
    }
}

function getList(id) {
    if (id) {
        GalleryApi.getListImg(id)
            .then(renderListImg)
            .catch(showError)
    } else {
        GalleryApi.getListAlbums()
            .then(renderListLinks)
            .catch(showError)
    }
}

function renderListLinks(ListLinks) {
    const html = ListLinks.map(getTemplateLinks).join('')

    albumsListLinks.innerHTML = html
}

function renderListImg(ListImg) {
    const html = ListImg.map(getTemplateImg).join('')

    albumsListImg.innerHTML = html
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