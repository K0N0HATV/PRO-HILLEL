const CATEGORY = 'category';
const PRODUCT = 'product';
const menu = [
    {
        type: CATEGORY,
        name: 'Mac',
        menu: [
            {
                type: PRODUCT,
                name: 'MacBook Pro 16”',
            },
            {
                type: PRODUCT,
                name: 'iMac 24”',
            },
            {
                type: PRODUCT,
                name: 'iMac 27”',
            },
            {
                type: CATEGORY,
                name: 'Accessories',
                menu: [
                    {
                        type: CATEGORY,
                        name: 'Featured Magic',
                        menu: [
                            {
                                type: PRODUCT,
                                name: 'Magic Keyboard',
                            },
                            {
                                type: PRODUCT,
                                name: 'Magic Trackpad',
                            },
                        ],
                    },
                    {
                        type: CATEGORY,
                        name: 'Audio',
                        menu: [
                            {
                                type: PRODUCT,
                                name: 'AirPods Pro',
                            },
                            {
                                type: PRODUCT,
                                name: 'AirPods Max',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        type: CATEGORY,
        name: 'Ipad',
        menu: [
            {
                type: PRODUCT,
                name: 'iPad Pro 11”',
            },
            {
                type: PRODUCT,
                name: 'iPad Pro 12.9”',
            },
            {
                type: CATEGORY,
                name: 'Accessories',
                menu: [
                    {
                        type: PRODUCT,
                        name: 'Apple Pencil',
                    },
                    {
                        type: PRODUCT,
                        name: 'Smart Keyboard',
                    },
                ],
            },
        ],
    },
    {
        type: CATEGORY,
        name: 'Empty Category',
        menu: [],
    },
]

let nesting = 0
let tabulation = '\t'

recursiaMenu(menu, nesting)

function recursiaMenu(array, nesting) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].type == 'category') {
            console.log(tabulation.repeat(nesting) + ' * ' + array[i].name)
            nesting++
            recursiaMenu(array[i].menu, nesting--)
        }
        if (array[i].type == 'product') {
            console.log(tabulation.repeat(nesting) + ' - ' + array[i].name)
        }
    }
}