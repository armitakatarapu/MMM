const NUM_OF_YEARS = 25;
const INFLATION_RATES = [
    3.0,  // 2024
    4.1,  // 2023
    8.0,  // 2022
    4.7,  // 2021
    1.2,  // 2020
    1.8,  // 2019
    2.4,  // 2018
    2.1,  // 2017
    1.3,  // 2016
    0.1,  // 2015
    1.6,  // 2014
    1.5,  // 2013
    2.1,  // 2012
    3.2,  // 2011
    1.6,  // 2010
   -0.4,  // 2009
    3.8,  // 2008
    2.8,  // 2007
    3.2,  // 2006
    3.4,  // 2005
    2.7,  // 2004
    2.3,  // 2003
    1.6,  // 2002
    2.8,  // 2001
    3.4   // 2000
];

let finalPrice;
while (true) {
    finalPrice = parseFloat(prompt("Enter your deposit amount: "));
    if (!isNaN(finalPrice) && finalPrice > 0) {
        console.log(`Deposit accepted: ${finalPrice}`);
        break;
    } else {
        console.log("Please enter a valid amount greater than 0.");
    }
}

for (let i = 0; i < NUM_OF_YEARS; i++) {
    let inflationRate = INFLATION_RATES[i];
    let initialPrice = (100 * finalPrice) / (inflationRate + 100);
    finalPrice = initialPrice;
    console.log(`Year ${2024 - i}, Inflation Rate: ${inflationRate}%`);
}

console.log(`Value in 2000: ${finalPrice.toFixed(2)}`);
