#With Function and return
customers = [
    ("Almaz", 1200.50),
    ("Bekele", 750.00),
    ("Chaltu", 340.25),
    ("Dawit", 1500.00),
    ("Etenesh", 450.00),
    ("Fikru", 600.00)
]


def tier(balance):
    if balance >= 1000:
        return "Premium"
    elif balance >= 500:
        return "Standard"
    else:
        return  "Basic"


for name, balance in customers:
    customer_tier = tier(balance)
    

    
    print(f"Name: {name} | Tier: {customer_tier} | Balance: {balance} ETB")
