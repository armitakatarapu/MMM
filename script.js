let headerButtons = document.querySelectorAll(".header-item"); // Select all header buttons
let popUpWindow = document.querySelector(".pop-up-window");
let closeButton = document.querySelector(".close-button");
let popUpIcon = document.querySelector("#pop-up-window-icon");
let popUpName = document.querySelector("#pop-up-window-name");

headerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    popUpName.textContent = button.textContent;
    popUpIcon.src = "/assets/" + button.textContent + ".png";

    popUpWindow.style.visibility = "visible";
  });
});

closeButton.addEventListener("click", () => {
  popUpWindow.style.visibility = "hidden";
});
