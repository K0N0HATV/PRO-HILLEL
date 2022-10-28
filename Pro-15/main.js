class Tabs {
    static CLASS_DEFAULT_BUTTON = 'tabs_buttons_list_button'
    static CLASS_DEFAULT_CONTENT = 'tabs_content_list_content'
    static CLASS_BUTTONS_LIST = 'tabs_buttons_list'
    static CLASS_CONTENT_LIST = 'tabs_content_list'
    static CLASS_BUTTON = 'tabs_buttons_list_button_active'
    static CLASS_CONTENT = 'tabs_content_list_content_active'

    constructor(tabEl) {
        this.tabEl = tabEl
        this.currentTab = 0

        this.bindDefaultStyle()

        this.tabEl.addEventListener('click', this.ontabElClick.bind(this))

        this.getTabElChildren(0, this.currentTab).classList.add(Tabs.CLASS_BUTTON)
        this.getTabElChildren(1, this.currentTab).classList.add(Tabs.CLASS_CONTENT)
    }

    bindDefaultStyle() {
        this.getDefaultChildren(0).classList.add(Tabs.CLASS_BUTTONS_LIST)
        this.getDefaultChildren(1).classList.add(Tabs.CLASS_CONTENT_LIST)

        const setDefaultClassBtn = this.getDefaultChildren(0).children
        const setDefaultClassContent = this.getDefaultChildren(1).children

        for (let i = 0; i < setDefaultClassBtn.length && i < setDefaultClassContent.length; i++) {
            setDefaultClassBtn[i].classList.add(Tabs.CLASS_DEFAULT_BUTTON)
            setDefaultClassContent[i].classList.add(Tabs.CLASS_DEFAULT_CONTENT)
        }
    }


    ontabElClick(e) {
        if (e.target.classList.contains(Tabs.CLASS_DEFAULT_BUTTON)) {

            if (this.isActiveEl()) {
                this.getTabElChildren(0, this.currentTab).classList.remove(Tabs.CLASS_BUTTON)
                this.getTabElChildren(1, this.currentTab).classList.remove(Tabs.CLASS_CONTENT)
            }

            this.setNewCurrentTab(e)

            this.getTabElChildren(1, this.currentTab).classList.add(Tabs.CLASS_CONTENT)
        }
    }

    getTabElChildren(child, current) {
        return this.tabEl.children[child].children[current]
    }

    getDefaultChildren(child) {
        return this.tabEl.children[child]
    }

    isActiveEl() {
        const findTabsEl = document.querySelectorAll('.' + Tabs.CLASS_BUTTON)
        const findContEl = document.querySelectorAll('.' + Tabs.CLASS_CONTENT)

        return findTabsEl && findContEl
    }

    setNewCurrentTab(e) {
        const activeBtn = e.target
        const arrBtn = this.getDefaultChildren(0).children

        for (let i = 0; i < arrBtn.length; i++) {
            if (arrBtn[i] === activeBtn) {
                this.currentTab = i
                activeBtn.classList.add(Tabs.CLASS_BUTTON)
            }
        }
    }
}