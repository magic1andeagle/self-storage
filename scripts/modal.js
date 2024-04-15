const btn = document.getElementById("toggleModal");
const modal = document.getElementById("consultModal");
const closeBtn = document.getElementById("cancelButton");

btn.onclick = function (ev) {
  modal.style.display = "block";
};

closeBtn.onclick = function (ev) {
  modal.style.display = "none";
};
