# ==========================================
# Pharmacy Inventory Tracker
# ==========================================

# Dictionary to store the pharmacy stock
stock = {}

# -----------------------------
# Load stock from file
# -----------------------------
try:
    with open("stock.txt", "r") as file:
        for line in file:
            item, qty = line.strip().split(",")
            stock[item] = int(qty)

except FileNotFoundError:
    print("No stock file found. Starting with an empty inventory.")

# -----------------------------
# Function to adjust stock
# -----------------------------
def adjust(item, amount):
    stock[item] = stock.get(item, 0) + amount

# -----------------------------
# Display current inventory
# -----------------------------
def display_inventory():
    print("\nCurrent Inventory")
    print("-" * 30)

    for item, qty in stock.items():
        print(f"{item}: {qty}")

# -----------------------------
# Display low stock items
# -----------------------------
def low_stock():

    low_items = [
        item
        for item, qty in stock.items()
        if qty < 10
    ]

    print("\nLow Stock Items")

    if low_items:
        for item in low_items:
            print(item)
    else:
        print("No low stock items.")

# -----------------------------
# Save inventory to file
# -----------------------------
def save_inventory():

    with open("stock.txt", "w") as file:

        for item, qty in stock.items():
            file.write(f"{item},{qty}\n")

    print("\nInventory saved successfully.")

# -----------------------------
# Main Program
# -----------------------------

display_inventory()

while True:

    print("\n===== Pharmacy Inventory =====")
    print("1. Add Stock")
    print("2. Remove Stock")
    print("3. Show Inventory")
    print("4. Show Low Stock")
    print("5. Save and Exit")

    choice = input("Choose an option: ")

    if choice == "1":

        item = input("Enter item name: ")
        amount = int(input("Quantity to add: "))

        adjust(item, amount)

        print("Stock updated.")

    elif choice == "2":

        item = input("Enter item name: ")
        amount = int(input("Quantity to remove: "))

        adjust(item, -amount)

        print("Stock updated.")

    elif choice == "3":

        display_inventory()

    elif choice == "4":

        low_stock()

    elif choice == "5":

        save_inventory()
        print("Goodbye!")
        break

    else:

        print("Invalid option. Please try again.")
