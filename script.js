let headerButtons = document.querySelectorAll(".header-item");
let popUpWindow = document.querySelector(".pop-up-window");
let closeButton = document.querySelector(".close-button");
let popUpIcon = document.querySelector("#pop-up-window-icon");
let popUpName = document.querySelector("#pop-up-window-name");

let headingName = document.querySelector(".headings");
let content = document.querySelector(".content");

headerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    popUpName.textContent = button.textContent;
    popUpIcon.src = `/assets/${button.textContent}.png`;

    addContent(popUpName.textContent);

    popUpWindow.style.visibility = "visible";
  });
});

function addContent(headers) {
  content.innerHTML = "";

  if (headers === "home") {
    addContentHome();
  } else if (headers === "tools") {
    addContentTools();
  } else if (headers === "about") {
    addContentAbout();
  } else {
    content.textContent = "Content not found.";
  }
}

// HOME

function addContentHome() {
  let heading = document.createElement("h1");
  heading.textContent = "";
  heading.classList.add("headings");

  let paragraph = document.createElement("p");
  paragraph.textContent = "";
  paragraph.classList.add("content");
}

// TOOLS

function addContentTools() {
  content.innerHTML = "";

  let calcButton = document.createElement("button");
  calcButton.textContent = "Inflation Calculator";
  calcButton.classList.add("tool-button");

  let secondToolButton = document.createElement("button");
  secondToolButton.textContent = "Interest Calculator";
  secondToolButton.classList.add("tool-button");

  content.appendChild(calcButton);
  content.appendChild(secondToolButton);

  calcButton.addEventListener("click", loadInflationCalculator);
  secondToolButton.addEventListener("click", loadSecondTool);
}

function loadInflationCalculator() {
  content.innerHTML = "";

  let backButton = document.createElement("button");
  backButton.textContent = "Back to Tools Menu";
  backButton.style.marginBottom = "20px";
  content.appendChild(backButton);
  backButton.addEventListener("click", addContentTools);

  let title = document.createElement("h1");
  title.textContent = "Inflation Calculator";
  title.classList.add("headings");
  content.appendChild(title);

  let inputLabel = document.createElement("label");
  inputLabel.textContent = "Enter your deposit amount: ";
  inputLabel.classList.add("content");
  let depositInput = document.createElement("input");
  depositInput.classList.add("content");
  depositInput.type = "number";
  depositInput.min = "1";
  depositInput.style.marginLeft = "10px";
  content.appendChild(inputLabel);
  content.appendChild(depositInput);

  let calculateButton = document.createElement("button");
  calculateButton.textContent = "Calculate";
  calculateButton.style.margin = "10px";
  content.appendChild(calculateButton);

  let resultDisplay = document.createElement("div");
  resultDisplay.style.marginTop = "20px";
  content.appendChild(resultDisplay);

  const NUM_OF_YEARS = 25;
  const INFLATION_RATES = [
    3.0, 4.1, 8.0, 4.7, 1.2, 1.8, 2.4, 2.1, 1.3, 0.1, 1.6, 1.5, 2.1, 3.2, 1.6,
    -0.4, 3.8, 2.8, 3.2, 3.4, 2.7, 2.3, 1.6, 2.8, 3.4,
  ];

  calculateButton.addEventListener("click", () => {
    let deposit = parseFloat(depositInput.value);
    if (isNaN(deposit) || deposit <= 0) {
      resultDisplay.textContent = "Please enter a valid amount greater than 0.";
      return;
    }

    let finalPrice = deposit;
    let result = `Initial Deposit: ${deposit.toFixed(2)}\n\n`;

    for (let i = 0; i < NUM_OF_YEARS; i++) {
      let inflationRate = INFLATION_RATES[i];
      finalPrice /= 1 + inflationRate / 100;
      result += `Year ${
        2024 - i
      }: Inflation Rate: ${inflationRate}% - Value: ${finalPrice.toFixed(2)}\n`;
    }

    result += `\nEstimated Value in 2000: ${finalPrice.toFixed(2)}`;
    resultDisplay.textContent = result;
  });
}

function loadSecondTool() {
  content.innerHTML = "";

  let backButton = document.createElement("button");
  backButton.textContent = "Back to Tools Menu";
  backButton.style.marginBottom = "20px";
  content.appendChild(backButton);
  backButton.addEventListener("click", addContentTools);

  let title = document.createElement("h2");
  title.textContent = "Interest Calculator";
  content.appendChild(title);

  let info = document.createElement("p");
  info.textContent = "Interest Calculator functionality goes here.";
  content.appendChild(info);
}

// ABOUT

function addContentAbout() {
  let heading = document.createElement("h1");
  heading.textContent = "";
  heading.classList.add("headings");

  let paragraph = document.createElement("p");
  paragraph.textContent = "";
  paragraph.classList.add("content");
}

closeButton?.addEventListener("click", () => {
  popUpWindow.style.visibility = "hidden";
});
