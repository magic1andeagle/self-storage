const btn = document.getElementById('send_req')
const nameInput = document.getElementById('name-input')
const phoneInput = document.getElementById('phone-input')

const modal_btn = document.getElementById('sendButton')
const modal_nameInput = document.getElementById('nameInputModal')
const modal_phoneInput = document.getElementById('phoneInputModal')

IMask(
  phoneInput,
  {
    mask: '+{7}(000)000-00-00'
  }
)

IMask(
  modal_phoneInput,
  {
    mask: '+{7}(000)000-00-00'
  }
)


function onValidate(elems, btn){
  const [name, phone ] = elems 

  if(name.value && phone.value && phone.value.length === 16){
    btn.disabled = false
  }else{
    btn.disabled = true
  }
}

window.addEventListener('DOMContentLoaded', ( ) => {
  nameInput.addEventListener('input',() => onValidate([nameInput, phoneInput], btn))
  phoneInput.addEventListener('input', () => onValidate([nameInput, phoneInput], btn))
  onValidate([nameInput, phoneInput], btn)

  modal_nameInput.addEventListener('input',() => onValidate([modal_nameInput, modal_phoneInput], modal_btn))
  modal_phoneInput.addEventListener('input', () => onValidate([modal_nameInput, modal_phoneInput], modal_btn))
  onValidate([nameInput, phoneInput], modal_btn)
})

btn.onclick = async function(){
  await requestFormData(btn, [nameInput, phoneInput])
}


const show_more = document.getElementById('show_more')
const slide_table = document.querySelector('div.five_slide_container')
show_more.onclick = () => {
  slide_table.classList.add('active')
  show_more.style.display = 'none'
}