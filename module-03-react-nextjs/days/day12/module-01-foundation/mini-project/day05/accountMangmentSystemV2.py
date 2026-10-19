#=============================================================================
# Addis Bank Management System (V2)
#=============================================================================

class Account:
    def __init__(self, owner: str, account_number: str, balance: float = 0):
        self.owner = owner
        self.account_number = account_number
        self._balance = balance

    @property
    def balance(self) -> float:
        return self._balance

    def deposit(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("Deposit amount must be positive.")
        self._balance += amount
        print(f"Successfully deposited {amount:,.2f} ETB.")

    def withdraw(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")
        if amount > self._balance:
            raise ValueError("Transaction Rejected: Insufficient funds.")
        self._balance -= amount
        print(f"Successfully withdrew {amount:,.2f} ETB.")

    def statement(self) -> None:
        print("\n" + "="*40)
        print("         ADDIS BANK STATEMENT     ")
        print("="*40)
        print(f"Account Owner   : {self.owner}")
        print(f"Account No.     : {self.account_number}")
        print(f"Current Balance : {self._balance:,.2f} ETB")
        print("="*40 + "\n")


class SavingAccount(Account):
    def __init__(self, owner: str, account_number: str, balance: float = 0, rate: float = 0.15):
        super().__init__(owner, account_number, balance)
        self.rate = rate

    def add_interest(self):
        interest_amount = self.balance * self.rate
        print(f"Applying {self.rate*100}% interest.")
        self.deposit(interest_amount)


class CurrentAccount(Account):
    def __init__(self, owner: str, account_number: str, balance: float = 0, overdraft: float = 1000):
        super().__init__(owner, account_number, balance)
        self.overdraft = overdraft

    def withdraw(self, amount: float):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")

        if amount <= (self._balance + self.overdraft):
            self._balance -= amount
            print(f"Successfully withdrew {amount:,.2f} ETB (Overdraft utilized).")
        else:
            raise ValueError(f"Transaction Rejected: Exceeds overdraft limit of {self.overdraft:,.2f} ETB.")


print("1. Testing Savings Account (With Interest)")
savings = SavingAccount("Ezra Mesele", "SAV-100204", 1000.0, 0.15)
savings.statement()
savings.add_interest()
savings.statement()

print("2. Testing Current Account (With Overdraft)")
checking = CurrentAccount("Ezra Mesele", "CUR-999382", 500.0, 1000.0)
checking.statement()

checking.withdraw(1200.00)
checking.statement()

# This will trigger our validation rule and safely reject the withdrawal
try:
        print("Attempting an extreme overdraft withdrawal.")
        checking.withdraw(5000.00)
except ValueError as error:
        print(f"Captured Expected Error: {error}")
