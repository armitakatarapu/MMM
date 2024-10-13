let headerButtons = document.querySelectorAll(".header-item");
let popUpWindow = document.querySelector(".pop-up-window");
let closeButton = document.querySelector(".close-button");
let popUpIcon = document.querySelector("#pop-up-window-icon");
let popUpName = document.querySelector("#pop-up-window-name");

let content = document.querySelector(".content");

let inflationValues = [];

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

function addContentHome() {
  let heading = document.createElement("h1");
  heading.textContent = "Welcome to the Home Page!";
  content.appendChild(heading);
}

function addContentTools() {
  content.innerHTML = "";

  let calcButton = document.createElement("button");
  calcButton.textContent = "Inflation Calculator";
  applyY2KButtonStyle(calcButton);

  let secondToolButton = document.createElement("button");
  secondToolButton.textContent = "Loan Repayment Calculator";
  applyY2KButtonStyle(secondToolButton);

  content.appendChild(calcButton);
  content.appendChild(secondToolButton);

  calcButton.addEventListener("click", loadInflationCalculator);
  secondToolButton.addEventListener("click", loadLoanCalculator);
}

function loadInflationCalculator() {
  content.innerHTML = "";

  let backButton = document.createElement("button");
  backButton.textContent = "Back to Tools Menu";
  applyY2KButtonStyle(backButton);
  content.appendChild(backButton);
  backButton.addEventListener("click", addContentTools);

  let title = document.createElement("h1");
  title.textContent = "Inflation Calculator";
  title.style.color = "#00FFB2";
  title.style.fontFamily = "'Press Start 2P', cursive";
  content.appendChild(title);

  let inputLabel = document.createElement("label");
  inputLabel.textContent = "Enter your deposit amount: ";
  inputLabel.style.color = "#FF00FF";
  inputLabel.style.fontFamily = "'Press Start 2P', cursive";
  content.appendChild(inputLabel);

  let depositInput = document.createElement("input");
  depositInput.type = "number";
  depositInput.min = "1";
  applyY2KInputStyle(depositInput);
  content.appendChild(depositInput);

  let calculateButton = document.createElement("button");
  calculateButton.textContent = "Calculate";
  applyY2KButtonStyle(calculateButton);
  content.appendChild(calculateButton);

  let resultDisplay = document.createElement("div");
  resultDisplay.style.marginTop = "20px";
  resultDisplay.style.color = "#FFF";
  resultDisplay.style.fontFamily = "'Press Start 2P', cursive";
  content.appendChild(resultDisplay);

  let graphButton = document.createElement("button");
  graphButton.textContent = "Show Graph";
  applyY2KButtonStyle(graphButton);
  content.appendChild(graphButton);
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
    let yearValues = [];

    for (let i = 0; i < NUM_OF_YEARS; i++) {
      let inflationRate = INFLATION_RATES[i];
      finalPrice /= 1 + inflationRate / 100;
      yearValues.push(finalPrice.toFixed(2));
    }

    inflationValues.push({ deposit, values: yearValues });
    resultDisplay.textContent = `Estimated Value in 2000: ${finalPrice.toFixed(
      2
    )}`;
  });

  graphButton.addEventListener("click", displayGraph);
}

function displayGraph() {
  content.innerHTML = "";

  const backButton = createButton(
    "Back to Inflation Calculator",
    loadInflationCalculator
  );
  content.appendChild(backButton);

  const canvas = document.createElement("canvas");
  canvas.id = "inflationGraph";
  canvas.style = `
    background-color: #000;
    border: 2px solid #FF00FF;
    margin-top: 1rem;
  `;
  content.appendChild(canvas);

  const labels = Array.from({ length: 25 }, (_, i) => 2024 - i);

  const datasets = inflationValues.map((entry, index) => ({
    label: `Deposit ${index + 1}: ${entry.deposit}`,
    data: entry.values,
    borderColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
    borderWidth: 2,
    pointBackgroundColor: "#FFF",
    backgroundColor: "transparent",
  }));

  new Chart(canvas, {
    type: "line",
    data: { labels, datasets },
    options: chartOptions(),
  });
}

function createButton(text, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  applyY2KButtonStyle(button);
  button.addEventListener("click", onClick);
  return button;
}

function chartOptions() {
  return {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "#FFF" } },
      title: {
        display: true,
        text: "Inflation Value Over Time",
        color: "#00FFB2",
      },
    },
    scales: {
      x: { ticks: { color: "#FFF" }, grid: { color: "#444" } },
      y: { ticks: { color: "#FFF" }, grid: { color: "#444" } },
    },
  };
}

function applyY2KButtonStyle(button) {
  button.style.backgroundColor = "#333";
  button.style.color = "#00FFB2";
  button.style.border = "2px solid #FF00FF";
  button.style.padding = "10px 20px";
  button.style.margin = "10px";
  button.style.cursor = "pointer";
  button.style.fontFamily = "'Press Start 2P', cursive";
}

function applyY2KInputStyle(input) {
  input.style.marginLeft = "10px";
  input.style.backgroundColor = "#333";
  input.style.color = "#00FFB2";
  input.style.border = "2px solid #FF00FF";
  input.style.fontFamily = "'Press Start 2P', cursive";
  input.style.padding = "5px";
}

function loadLoanCalculator() {
  content.innerHTML = "";

  const backButton = createButton("Back to Tools Menu", addContentTools);
  content.appendChild(backButton);

  const title = document.createElement("h1");
  title.textContent = "Loan Repayment Calculator";
  applyY2KButtonStyle(title);
  content.appendChild(title);

  const loanInput = createInputField("Loan Amount ($): ");
  loanInput.style.marginBottom = "1rem";
  const interestInput = createInputField("Annual Interest Rate (%): ");
  interestInput.style.marginBottom = "1rem";
  const yearsInput = createInputField("Loan Period (Years): ");
  yearsInput.style.marginBottom = "1rem";

  const calculateButton = createButton("Calculate", calculateLoan);
  applyY2KButtonStyle(calculateButton);

  content.append(loanInput, interestInput, yearsInput, calculateButton);

  const resultDisplay = document.createElement("div");
  resultDisplay.style.marginTop = "20px";
  content.appendChild(resultDisplay);

  function calculateLoan() {
    const loan = parseFloat(loanInput.querySelector("input").value);
    const interestRate =
      parseFloat(interestInput.querySelector("input").value) / 100 / 12;
    const months = parseInt(yearsInput.querySelector("input").value) * 12;

    const monthlyPayment =
      (loan * interestRate) / (1 - Math.pow(1 + interestRate, -months));
    resultDisplay.textContent = isNaN(monthlyPayment)
      ? "Please enter valid values."
      : `Monthly Payment: $${monthlyPayment.toFixed(2)}`;
  }
}

function createInputField(labelText) {
  const container = document.createElement("div");
  const label = document.createElement("label");

  label.style.color = "#FF00FF";
  label.style.fontFamily = "'Press Start 2P', cursive";
  label.textContent = labelText;

  const input = document.createElement("input");
  input.type = "number";
  input.style.marginLeft = "10px";
  applyY2KInputStyle(input);

  container.append(label, input);
  return container;
}

function addContentAbout() {
  let heading = document.createElement("h1");
  heading.textContent = "About Us";
  content.appendChild(heading);

  let paragraph = document.createElement("p");
  paragraph.textContent = "Learn more about our tools!";
  content.appendChild(paragraph);
}

closeButton?.addEventListener("click", () => {
  popUpWindow.style.visibility = "hidden";
});
