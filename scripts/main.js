const btn = document.getElementById('send_req')
const nameInput = document.getElementById('name-input')
const phoneInput = document.getElementById('phone-input')

IMask(
    document.getElementById('phone-input'),
    {
      mask: '+{7}(000)000-00-00'
    }
)

function onValidate(){
  if(nameInput.value && phoneInput.value  && phoneInput.value.length === 16){
    btn.disabled = false
  }else{
    btn.disabled = true
  }
}

nameInput.addEventListener('input', onValidate)
phoneInput.addEventListener('input', onValidate)
onValidate()