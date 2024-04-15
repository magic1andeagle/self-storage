const button = document.getElementById("toggleModal");
const modal = document.getElementById("consultModal");
const closeBtn = document.getElementById("cancelButton");
const sendButton = document.getElementById("sendButton");
const nameInputModal = document.getElementById("nameInputModal");
const phoneInputModal = document.getElementById("phoneInputModal");

const url = "https://ssttoorree.ru/_receive_question_";

button.onclick = function (ev) {
  modal.style.display = "block";
};

closeBtn.onclick = function (ev) {
  modal.style.display = "none";
};

sendButton.onclick = function (ev) {
  const data = {
    firstname: nameInputModal.value,
    username: phoneInputModal.value,
    from: "store_engineering",
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error!");
      }
      return res.json();
    })
    .then((data) => {
      console.log("Успех:", data);
    })
    .catch((err) => {
      console.log("Произошла ошибка:", err);
    });
};
