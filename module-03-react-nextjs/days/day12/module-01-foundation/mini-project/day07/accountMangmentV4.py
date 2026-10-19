# =============================================================================
# Addis Bank Management System Version 4
# ===========================================================================
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
            raise ValueError("Amount must be positive.")

        self.balance += amount

        self.history.push(("deposit", amount))

        print(f"Deposited {amount:.2f} ETB")

    def withdraw(self, amount):

        if amount <= 0:
            raise ValueError("Amount must be positive.")

        if amount > self.balance:
            raise ValueError("Insufficient balance.")

        self.balance -= amount

        self.history.push(("withdraw", amount))

        print(f"Withdrew {amount:.2f} ETB")

    def undo_last(self):

        if self.history.is_empty():

            print("Nothing to undo.")
            return

        action, amount = self.history.pop()

        if action == "deposit":

            self.balance -= amount

            print(f"Undo deposit of {amount:.2f}")

        elif action == "withdraw":

            self.balance += amount

            print(f"Undo withdrawal of {amount:.2f}")

    def statement(self):

        print("-------------------------")
        print("Owner:", self.owner)
        print("Number:", self.account_number)
        print("Balance:", self.balance)
        print("-------------------------")

class AccountRegistry:

    def __init__(self):

        # O(1)
        self.by_number = {}

        # insertion order
        self.order = []

    def add(self, account):

        self.by_number[account.account_number] = account

        self.order.append(account.account_number)

    def find(self, number):

        # O(1)

        return self.by_number.get(number)

    def list_all(self):

        accounts = []

        for number in self.order:
            accounts.append(self.by_number[number])

        return accounts

registry = AccountRegistry()

a1 = Account("Ezra", "A001", 1000)
a2 = Account("Sara", "A002", 2500)
a3 = Account("John", "A003", 500)

registry.add(a1)
registry.add(a2)
registry.add(a3)


print("\nFind Account")

account = registry.find("A002")

account.statement()


print("\nList All Accounts")

for account in registry.list_all():

    account.statement()


print("\nTransactions")

a1.deposit(500)

a1.withdraw(200)

a1.statement()


print("\nUndo")

a1.undo_last()

a1.statement()

a1.undo_last()

a1.statement()
