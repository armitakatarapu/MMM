let homeButton = document.getElementById("home");
let popUpWindow = document.querySelector(".pop-up-window");

homeButton.addEventListener("click", () => {
  if (
    popUpWindow.style.visibility === "hidden" ||
    popUpWindow.style.visibility === ""
  ) {
    popUpWindow.style.visibility = "visible";
  } else {
    popUpWindow.style.visibility = "hidden";
  }
});
