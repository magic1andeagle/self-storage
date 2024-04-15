const url = "https://ssttoorree.ru/_receive_question_";


const button = document.getElementById("toggleModal");
const modal = document.getElementById("consultModal");
const closeBtn = document.getElementById("cancelButton");
const sendButton = document.getElementById("sendButton");
const nameInputModal = document.getElementById("nameInputModal");
const phoneInputModal = document.getElementById("phoneInputModal");
const notifContainer = document.querySelector('div.notifications_window')
const reservationBlocks = document.querySelectorAll('div.reservation_block')

function spawnNotification(text, status){

  const item = document.createElement('div')

  const title = document.createElement('p')
  title.innerHTML = text

  if(status === 'success'){
    item.classList.add('success')
  }else{
    item.classList.add('error')
  }

  item.appendChild(title)
  notifContainer.appendChild(item)

  setTimeout(() => {
    notifContainer.removeChild(item)
  }, 10000)
}

function success(text){
  spawnNotification(text, 'success')
}

function error(text){
  spawnNotification(text, 'error')
}

function openModal(){
  modal.style.display = "block";
  document.body.style.overflow = "hidden"
}

function hideModal(){
  modal.style.display = "none";
  document.body.style.overflow = "auto"
}

button.onclick = openModal
closeBtn.onclick = hideModal
Array.from(reservationBlocks).forEach((elem) =>{
  elem.addEventListener('click', openModal)
})
document.addEventListener("keydown", (ev) => {
  if(ev.key === "Escape" && modal.style.display !== 'none'){
    hideModal()
  }
} );

async function requestFormData(btn, inputs){
  const [name, phone] = inputs

  const data = {
    firstname: name.value,
    username: phone.value,
    from: "store_engineering",
  };

  try{

    btn.disabled = true

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const {msg, msg_type} = await response.json()
    success(msg, msg_type)
    name.value = ''
    phone.value = ''
    name.dispatchEvent(new CustomEvent('input'))
  }catch(err){
    error(err)
  }
}

sendButton.onclick = async function (ev) {
  await requestFormData(sendButton, [nameInputModal,phoneInputModal])
};