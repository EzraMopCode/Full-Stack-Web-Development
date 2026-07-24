# =============================================================================
# Addis Bank Management System Version 5
# =============================================================================
class Stack:

    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if self.items:
            return self.items.pop()
        return None

    def is_empty(self):
        return len(self.items) == 0

class Account:

    def __init__(self, owner, account_number, balance=0):

        self.owner = owner
        self.account_number = account_number
        self.balance = balance

        self.history = Stack()

    def deposit(self, amount):

        if amount <= 0:
            raise ValueError("Deposit must be positive.")

        self.balance += amount

        self.history.push(amount)

        print(f"Deposited {amount:.2f} ETB")

    def withdraw(self, amount):

        if amount <= 0:
            raise ValueError("Withdrawal must be positive.")

        if amount > self.balance:
            raise ValueError("Insufficient balance.")

        self.balance -= amount

        self.history.push(-amount)

        print(f"Withdrew {amount:.2f} ETB")

    def statement(self):

        print("----------------------------")
        print("Owner :", self.owner)
        print("Number:", self.account_number)
        print("Balance:", self.balance)
        print("----------------------------")

def binary_search(items, target):

    left = 0
    right = len(items) - 1

    while left <= right:

        mid = (left + right) // 2

        if items[mid] == target:
            return mid

        elif items[mid] < target:
            left = mid + 1

        else:
            right = mid - 1

    return -1

class AccountRegistry:

    def __init__(self):

        self.by_number = {}

        self.order = []

    def add(self, account):

        self.by_number[account.account_number] = account

        self.order.append(account.account_number)

    def find(self, number):

        return self.by_number.get(number)

    def list_all(self):

        accounts = []

        for number in self.order:
            accounts.append(self.by_number[number])

        return accounts

    def top_by_balance(self, n=5):

        accounts = sorted(
            self.by_number.values(),
            key=lambda account: account.balance,
            reverse=True
        )

        return accounts[:n]

    def find_by_number(self, number):

        numbers = sorted(self.by_number.keys())

        index = binary_search(numbers, number)

        if index >= 0:
            return self.by_number[numbers[index]]

        return None

    def recursive_sum(self, values):

        if not values:
            return 0

        return values[0] + self.recursive_sum(values[1:])

    def total_transactions(self, number):

        account = self.find_by_number(number)

        if account is None:
            return None

        return self.recursive_sum(account.history.items)

registry = AccountRegistry()

a1 = Account("Ezra", "A001", 2500)
a2 = Account("Sara", "A002", 6000)
a3 = Account("John", "A003", 1800)
a4 = Account("Mike", "A004", 9000)

registry.add(a1)
registry.add(a2)
registry.add(a3)
registry.add(a4)

# Transactions

a1.deposit(500)
a1.withdraw(200)

a2.deposit(1000)

a3.deposit(300)
a3.withdraw(100)

a4.withdraw(500)

print("\nTOP BALANCES")

for account in registry.top_by_balance(3):
    print(account.owner, account.balance)

print("\nSEARCH")

result = registry.find_by_number("A003")

if result:
    result.statement()
else:
    print("Account not found.")

print("\nTOTAL TRANSACTIONS")

print(
    registry.total_transactions("A001")
)

print(
    registry.total_transactions("A003")
)

print(
    registry.total_transactions("A999")
)
