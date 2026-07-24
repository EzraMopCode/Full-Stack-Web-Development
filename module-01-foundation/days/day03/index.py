# ------------------------------------------
# Exercise 1: Unique Cities
# ------------------------------------------

print("Exercise 1: Unique Cities")

cities = [
    "Addis Ababa",
    "Adama",
    "Hawassa",
    "Addis Ababa",
    "Bahir Dar",
    "Adama"
]

unique_cities = set(cities)

print("Unique Cities:", unique_cities)
print("Number of Unique Cities:", len(unique_cities))

print()


# ------------------------------------------
# Exercise 2: Price Report
# ------------------------------------------

print("Exercise 2: Price Report")

grocery = {
    "Rice": 120,
    "Sugar": 95,
    "Milk": 80,
    "Bread": 35,
    "Eggs": 180
}

for item, price in grocery.items():
    print(f"{item}: {price} ETB")

print()


# ------------------------------------------
# Exercise 3: Tax Comprehension
# ------------------------------------------

print("Exercise 3: Tax Comprehension")

prices = [100, 250, 400, 80]

prices_with_tax = [price * 1.15 for price in prices]

print("Original Prices:", prices)
print("Prices with Tax:", prices_with_tax)

print()


# ------------------------------------------
# Exercise 4: Cheap Items
# ------------------------------------------

print("Exercise 4: Cheap Items")

cheap_items = [price for price in prices if price < 200]

print("Cheap Items:", cheap_items)

print()


# ------------------------------------------
# Exercise 5: Write & Read File
# ------------------------------------------

print("Exercise 5: Write & Read File")

with open("names.txt", "w") as file:
    file.write("Ali\n")
    file.write("Sara\n")
    file.write("John\n")

print("Names written to names.txt")

print("Reading names from file:")

with open("names.txt", "r") as file:
    for line in file:
        print(line.strip())

print()


# ------------------------------------------
# Exercise 6: Safe Division
# ------------------------------------------

print("Exercise 6: Safe Division")

try:
    number = float(input("Enter a number: "))

    result = 1000 / number

except ValueError:
    print("Error: Please enter a valid number.")

except ZeroDivisionError:
    print("Error: You cannot divide by zero.")

else:
    print("Result:", result)

finally:
    print("Program finished.")
