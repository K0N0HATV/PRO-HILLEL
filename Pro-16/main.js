const CLASS_INPUT = 'inp'
const CLASS_BUTTON = 'btn'
const ID_CONTAINER = 'container'
const ID_TEMPLATE = 'template'
const REPLACE_TEMPLATE_SRC = 'src'
const REPLACE_TEMPLATE_REPOSITORIES = 'rep'
const REPLACE_TEMPLATE_FOLLOWERS = 'followers'
const REPLACE_TEMPLATE_FOLLOWING = 'following'
const CLASS_IMG = 'img'
const CLASS_REPOSITORIES = 'rep'
const CLASS_FOLLOWERS = 'followers'
const CLASS_FOLLOWING = 'following'

const getUserNameInpEl = document.querySelector(`.${CLASS_INPUT}`)
const findUserNameBtnEl = document.querySelector(`.${CLASS_BUTTON}`)
const containerEl = document.querySelector(`#${ID_CONTAINER}`)
const templateEl = document.querySelector(`#${ID_TEMPLATE}`).innerHTML

findUserNameBtnEl.addEventListener('click', onFindUserNameBtnElClick)

function onFindUserNameBtnElClick() {
    fetch(`https://api.github.com/users/${getUserName()}`)
        .then((res) => res.ok ? res.json() : Promise.reject('error: ' + res.status + ` Not Found Username: ${getUserName()}`))
        .then((res) => {
            if (res) {
                clearOldTemplate()

                showTemplate(res)

                clearInp()
            }
        })
        .catch((err) => {
            alert(err)
            console.warn(err)
        })
}

function clearOldTemplate() {
    containerEl.textContent = ''
}

function showTemplate(res) {
    let clearTemplate = templateEl

    clearTemplate = clearTemplate.replace(`[${REPLACE_TEMPLATE_SRC}]`, res.avatar_url)
        .replace(`[${REPLACE_TEMPLATE_REPOSITORIES}]`, res.public_repos)
        .replace(`[${REPLACE_TEMPLATE_FOLLOWERS}]`, res.followers)
        .replace(`[${REPLACE_TEMPLATE_FOLLOWING}]`, res.following)

    containerEl.insertAdjacentHTML('beforeend', clearTemplate)
}

function clearInp() {
    getUserNameInpEl.value = ''
}

function getUserName() {
    return getUserNameInpEl.value
}