
const BURGER_WIDTH = 540
const DARK_LOGO_PATH = "logo_dark.svg"   
const DEFAULT_LOGO_PATH = "store_logo.svg"   


const burgerBtn = document.getElementById('burger_btn')
const headerContainer = document.querySelector('div.header_container')
const titleSlide = document.querySelector('div.first_slide_container')
const logo = document.querySelector('img[alt="store_logo"]')

const solutions = document.querySelector('div.four_slide_container')

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

const anchor_title = document.getElementById('title')
const anchor_about_us = document.getElementById('about_us')
const anchor_solution = document.getElementById('solutions')
const anchor_products = document.getElementById('products')
const anchor_how_it = document.getElementById('how_it_works')

function clearActiveStyle(childs, idx) {
    childs.forEach((element, index) => {
        if(index !== idx){
            element.classList.remove('active')
        }else{
            element.classList.add('active')
        }
    });
}

function onScroll(){
    const headerHeight = headerContainer.clientHeight
    const titleSlideHeight = titleSlide.clientHeight
    const {scrollY} = window

    
    if(scrollY > (titleSlideHeight - (headerHeight / 2)) ){
        headerContainer.classList.add('scrolled')
        if(!logo.src.includes(DARK_LOGO_PATH)){
            logo.src =`./assets/svg/${DARK_LOGO_PATH}` 
        }
    }else{
        headerContainer.classList.remove('scrolled')
        if(!logo.src.includes(DEFAULT_LOGO_PATH)){
            logo.src = `./assets/svg/${DEFAULT_LOGO_PATH}`   
        }
    }

    const about = anchor_about_us.offsetTop
    const sol = anchor_solution.offsetTop
    const prod = anchor_products.offsetTop
    const how = anchor_how_it.offsetTop

    const list = document.querySelector('header > ul')

    if(scrollY < about){
        clearActiveStyle(Array.from(list.children))
    }else if(scrollY + 100 > about && scrollY + 100 < sol){
        clearActiveStyle(Array.from(list.children), 0)
    }else if(scrollY + 100 > sol && scrollY + 100 < prod){
        clearActiveStyle(Array.from(list.children), 1)
    }else if(scrollY + 100 > prod && scrollY + 300 < how){
        clearActiveStyle(Array.from(list.children), 2)
    }else if(scrollY + 300 > how){
        clearActiveStyle(Array.from(list.children), 3)
    }
}



window.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('resize', onResize)
    onResize()
    
    window.addEventListener('scroll', onScroll)
    onScroll()
})