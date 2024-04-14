const BURGER_WIDTH = 540
const burgerBtn = document.getElementById('burger_btn')
const headerContainer = document.querySelector('div.header_container')
const titleSlide = document.querySelector('div.first_slide_container')
const logo = document.querySelector('img[alt="store_logo"]')

const solutions = document.querySelector('div.four_slide_container')

const anchor_aboutus = document.getElementById('about_us')
const anchor_solution = document.getElementById('solutions')
const anchor_products = document.getElementById('products')
const anchor_how_it_works = document.getElementById('how_it_works')

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

function onScroll(){
    const headerHeight = headerContainer.clientHeight
    const titleSlideHeight = titleSlide.clientHeight
    const {scrollY} = window

    
    if(scrollY > (titleSlideHeight - (headerHeight / 2)) ){
        headerContainer.classList.add('scrolled')
        logo.src = "./assets/svg/logo_dark.svg"
    }else{
        headerContainer.classList.remove('scrolled')
        logo.src = "./assets/svg/store_logo.svg"   
    }

    if(scrollY <= solutions.clientHeight){
        anchor_aboutus.classList.add('active')
        anchor_solution.classList.remove('active')
    }else if(scrollY >= solutions.clientHeight){
        anchor_aboutus.classList.remove('active')
        anchor_solution.classList.add('active')
    }else if(scrollY >= solutions.clientHeight){
        anchor_solution.classList.remove('active')
    }


}

window.addEventListener('resize', onResize)
onResize()

window.addEventListener('scroll', onScroll)
onScroll()