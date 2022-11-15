const CLASS_LINK_ITEM = 'linkItem'
const SELECTOR_ID_CONTAINER_LIST_LINKS = '#albums_list_a'
const SELECTOR_ID_CONTAINER_LIST_IMG = '#albums_list_img'
const DEFAULT_ALBUMS_ID = '1'

const albumsListLinksContainer = document.querySelector(SELECTOR_ID_CONTAINER_LIST_LINKS)
const albumsListImgContainer = document.querySelector(SELECTOR_ID_CONTAINER_LIST_IMG)

albumsListLinksContainer.addEventListener('click', onalbumsListLinksContainerClick)

getList(linksList => renderList(linksList, albumsListLinksContainer, getTemplateLinks))
getList(imgList => renderList(imgList, albumsListImgContainer, getTemplateImg), DEFAULT_ALBUMS_ID)

function onalbumsListLinksContainerClick(e) {
    e.preventDefault()

    if (isLink(e.target, CLASS_LINK_ITEM)) {
        const idLink = getId(e.target)

        if (idLink) {
            getList(imgList => renderList(imgList, albumsListImgContainer, getTemplateImg), idLink)
        }
    }
}

function getList(method, id) {
    GalleryApi.getList(id)
        .then(method)
        .catch(showError)
}

function renderList(List, container, template) {
    const html = List.map(template).join('')

    container.innerHTML = html
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