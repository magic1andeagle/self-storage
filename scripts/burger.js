const BURGER_WIDTH = 540
const burgerBtn = document.getElementById('burger_btn')


function getNodeFromChild(elem, nodeName){
    const node = document.createElement(nodeName)
    node.innerHTML = elem.innerHTML
    return node
}

function onResize(){
    const header = document.querySelector('header')

    if(window.innerWidth <= BURGER_WIDTH && !header.classList.contains('burger')){
        const [ _logo, list, contacts ] = Array.from(header.children)
        const nav = document.createElement('nav')
        const navPopup = document.createElement('div')
        navPopup.classList.add('popup')
        nav.appendChild(navPopup)
        navPopup.appendChild(getNodeFromChild(list, 'ul'))
        navPopup.appendChild(getNodeFromChild(contacts, 'div'))
        header.appendChild(nav)
        header.classList.add('burger')

        burgerBtn.onclick = () => {
            nav.classList.toggle('active')
        }

        nav.onclick = (e) => {
            e.stopPropagation()
            nav.classList.remove('active')
        }

        navPopup.onclick =(e) => {
            e.stopPropagation()
        }
    }else{
        const content = header.children.item(header.children.length - 1)
        if(content.nodeName !== "NAV"){
            return
        }
        header.removeChild(content)
        header.classList.remove('burger')
    }
}

window.addEventListener('resize', onResize)
onResize()