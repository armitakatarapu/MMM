inflation_rate = 2
NUM_OF_YEARS = 24

INFLATION_RATES = [
    3.0,  # 2024
    4.1,  # 2023
    8.0,  # 2022
    4.7,  # 2021
    1.2,  # 2020
    1.8,  # 2019
    2.4,  # 2018
    2.1,  # 2017
    1.3,  # 2016
    0.1,  # 2015
    1.6,  # 2014
    1.5,  # 2013
    2.1,  # 2012
    3.2,  # 2011
    1.6,  # 2010
   -0.4,  # 2009
    3.8,  # 2008
    2.8,  # 2007
    3.2,  # 2006
    3.4,  # 2005
    2.7,  # 2004
    2.3,  # 2003
    1.6,  # 2002
    2.8,  # 2001
    3.4   # 2000
]

infaltion = float(inflation_rate / 100)

final_price = input("Enter your deposit amount")
while True:
    try:
        final_price = float(input("Enter your deposit amount: "))
        if final_price > 0:
            print(f"Deposit accepted: {final_price}")
            break
        else:
            print("Please enter an amount greater than 0.")
    except ValueError:
        print("Invalid input. Please enter a valid number.")

for i in range(NUM_OF_YEARS):
    initial_price = (100 * final_price) / (inflation_rate + 100)
    final_price = initial_price
    inflation_rate = INFLATION_RATES[i]
