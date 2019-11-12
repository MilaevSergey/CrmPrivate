class SideMenu {
    constructor() {
        this.cache = {};
        this.init();
    }

    init() {
        this.initializeCache();
        this.openHideItems();
        this.openHideSideBar();
    }

    initializeCache() {
        this.cache.menuItems    = 'js-menu-item';
        this.cache.menuBlock    = 'js-menu-block';
        this.cache.sideBar      = 'js-side-bar';
        this.cache.sideBarBtn   = 'js-side-bar-btn';
    }

    openHideItems() {
        let menuItems = document.getElementsByClassName(this.cache.menuItems);
        let menuBlocks = document.getElementsByClassName(this.cache.menuBlock);
        menuItems = Array.prototype.slice.call(menuItems);
        menuBlocks = Array.prototype.slice.call(menuBlocks);

        menuItems.forEach(function (elem) {
            elem.addEventListener('click', function () {
                let menuItemsAttr = '';
                menuItemsAttr = this.getAttribute('data-menu-item');

                menuBlocks.forEach(function (elem) {
                    elem.classList.remove('is-active');
                });
                document.querySelector(`.js-menu-block[data-block-item=${menuItemsAttr}]`).classList.add('is-active');

            });
        });
    }
    openHideSideBar() {
        let sideBarBtn = document.getElementsByClassName(this.cache.sideBarBtn);
        sideBarBtn = Array.prototype.slice.call(sideBarBtn);

        sideBarBtn.forEach(function (elem) {
            elem.addEventListener('click', function () {
               this.classList.toggle('is-open');

                const find = (node, className) => {
                    while (node) {
                        if (node.classList.contains(className)) {
                            return node;
                        } else {
                            node = node.parentElement;
                        }
                    }

                    return null;
                }

                find(this, 'js-side-bar').classList.toggle('is-open');
            });
        });
    }
}

export default new SideMenu();