# =============================================================================
# Addis Bank Management System Version 3
# ==========================================================================
class BankConfig:
    _instance = None

    interest_rate: float
    overdraft_limit: float
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.15
            cls._instance.overdraft_limit = 1000
        return cls._instance

class SMSAlert:
    def update(self, message):
        print(f"[SMS] {message}")


class AuditLog:
    def update(self, message):
        print(f"[AUDIT] {message}")

class Account:

    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self._balance = balance
        self.subscribers = []

    @property
    def balance(self):
        return self._balance

    def subscribe(self, observer):
        self.subscribers.append(observer)

    def _notify(self, message):
        for observer in self.subscribers:
            observer.update(message)

    def deposit(self, amount):

        if amount <= 0:
            raise ValueError("Deposit amount must be positive.")

        self._balance += amount

        print(f"Deposited {amount:.2f} ETB")

        self._notify(
            f"{self.owner} deposited {amount:.2f} ETB"
        )

    def withdraw(self, amount):

        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")

        if amount > self._balance:
            raise ValueError("Insufficient funds.")

        self._balance -= amount

        print(f"Withdrew {amount:.2f} ETB")

        self._notify(
            f"{self.owner} withdrew {amount:.2f} ETB"
        )

    def statement(self):

        print("\n==============================")
        print("BANK STATEMENT")
        print("==============================")
        print("Owner :", self.owner)
        print("Number:", self.account_number)
        print("Balance:", self._balance, "ETB")
        print("==============================\n")
class SavingsAccount(Account):

    def __init__(self, owner, account_number, balance=0):
        super().__init__(owner, account_number, balance)

        config = BankConfig()
        self.rate = config.interest_rate

    def add_interest(self):

        interest = self.balance * self.rate

        print(f"Interest Added: {interest:.2f} ETB")

        self.deposit(interest)

class CurrentAccount(Account):

    def __init__(self, owner, account_number, balance=0):
        super().__init__(owner, account_number, balance)

        config = BankConfig()
        self.overdraft = config.overdraft_limit

    def withdraw(self, amount):

        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")

        if amount <= self.balance + self.overdraft:

            self._balance -= amount

            print(f"Withdrew {amount:.2f} ETB")

            self._notify(
                f"{self.owner} withdrew {amount:.2f} ETB"
            )

        else:
            raise ValueError("Overdraft limit exceeded.")

class AccountFactory:

    @staticmethod
    def create(kind, owner, number, balance=0):

        if kind == "savings":
            return SavingsAccount(owner, number, balance)

        elif kind == "current":
            return CurrentAccount(owner, number, balance)

        else:
            raise ValueError("Unknown account type")

config1 = BankConfig()
config2 = BankConfig()

print("Singleton Test:", config1 is config2)

sms = SMSAlert()
audit = AuditLog()

savings = AccountFactory.create(
    "savings",
    "Ezra Mesele",
    "SAV-100204",
    1000
)

current = AccountFactory.create(
    "current",
    "Ezra Mesele",
    "CUR-999382",
    500
)

# Subscribe observers
savings.subscribe(sms)
savings.subscribe(audit)

current.subscribe(sms)
current.subscribe(audit)

# Savings Account
print("\n----- Savings Account -----")

savings.statement()
savings.deposit(500)
savings.add_interest()
savings.statement()

# Current Account
print("\n----- Current Account -----")

current.statement()
current.withdraw(1200)
current.statement()

try:
    current.withdraw(5000)
except ValueError as e:
    print(e)
