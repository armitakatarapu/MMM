let headerButtons = document.querySelectorAll(".header-item");
let popUpWindow = document.querySelector(".pop-up-window");
let closeButton = document.querySelector(".close-button");
let popUpIcon = document.querySelector("#pop-up-window-icon");
let popUpName = document.querySelector("#pop-up-window-name");

let content = document.querySelector(".content");

const clickSound = new Audio("/audio/select.mp3");

let inflationValues = [];

headerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    clickSound.play();
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
    console.log("Content not found");
  }
}

function addContentHome() {
  // Clear previous content
  content.innerHTML = "";

  // Create heading
  let heading = document.createElement("h1");
  heading.textContent = "Millennium Money Mentor";
  heading.classList.add("headings");

  // Create paragraph with retro theme
  let paragraph = document.createElement("p");
  paragraph.innerHTML =
    "Step into the future with a retro-futuristic twist at Millennium Money Mentor.<br>" +
    "Key features of MMM:<br>" +
    "• Compares how $$ in today's translates to 2000 value.<br>" +
    "• Teaches about inflation and the importance of financial planning.</br>" +
    "• Provides a graph illustrating these inflation values.</br>" +
    "• Computes the monthly loan repayment amount, which facilitates improved repayment planning. ";
  paragraph.classList.add("content"); // Class for paragraph styling

  // Apply Y2K styling
  // Create spans for additional styling
  // let headingSpan = document.createElement("span");
  // headingSpan.classList.add("text-background"); // Class for background styling
  // headingSpan.textContent = heading.textContent;

  // let paragraphSpan = document.createElement("span");
  // paragraphSpan.classList.add("text-background"); // Class for background styling
  // paragraphSpan.innerHTML = paragraph.innerHTML;

  content.appendChild(heading);
  content.appendChild(paragraph);
}

function addContentTools() {
  clickSound.play();
  content.innerHTML = "";

  let calcButton = document.createElement("button");
  calcButton.textContent = "Inflation Calculator";
  applyY2KButtonStyle(calcButton);
  calcButton.classList.add("big-button");

  let secondToolButton = document.createElement("button");
  secondToolButton.textContent = "Loan Repayment Calculator";
  applyY2KButtonStyle(secondToolButton);
  secondToolButton.classList.add("big-button");

  content.appendChild(calcButton);
  content.appendChild(secondToolButton);

  calcButton.addEventListener("click", loadInflationCalculator);
  secondToolButton.addEventListener("click", loadLoanCalculator);
}

function loadInflationCalculator() {
  clickSound.play();
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
    clickSound.play();
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
  clickSound.play();
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

function applyY2KParagraphStyle(paragraph) {
  paragraph.style.marginLeft = "10px";
  paragraph.style.color = "#00FFB2";
  paragraph.style.fontFamily = "'Press Start 2P', cursive";
}

function loadLoanCalculator() {
  clickSound.play();
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

  const resultDisplay = document.createElement("p");
  resultDisplay.style.marginTop = "20px";
  applyY2KParagraphStyle(resultDisplay);
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
  heading.classList.add("headings"); 
  content.appendChild(heading);

  let paragraph = document.createElement("p");
  paragraph.innerHTML = 
  "The Millennium Bug, also known as the Y2K bug, serves as a powerful reminder of how intertwined personal finance and technology have become.<br>"+
  "At the turn of the millennium, the world faced a potential digital disaster because many computer systems stored dates using only the last two digits of the year.<br>" + 
  "Though much of the potential chaos was averted, the Y2K bug highlighted how reliant our financial systems are on technology.<br>" +
  "This historical moment emphasizes the importance of financial literacy, especially in understanding how technology shapes personal finance.<br>" + 
  "Understanding inflation became crucial, not only for making sense of financial planning in 2000 but also for adapting to the new, tech-driven economy that emerged in its wake.<br>" + 
  "Whether it’s recognizing the importance of data security, understanding the value of fintech innovations, or being prepared for potential disruptions, financial literacy in the digital age is essential for safeguarding your financial future.<br>" +
  "Our mission is to empower individuals to master their financial future by bridging the past and present. Our goal is to make personal finance accessible, fun, and empowering for all, ensuring that everyone has the knowledge to thrive in today’s digital economy and beyond.";
  paragraph.classList.add("content"); 
  content.appendChild(paragraph);
}

closeButton?.addEventListener("click", () => {
  clickSound.play();
  popUpWindow.style.visibility = "hidden";
});
