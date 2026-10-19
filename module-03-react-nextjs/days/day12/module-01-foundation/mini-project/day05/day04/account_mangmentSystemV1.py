#=============================================================================
# Addis Bank Management System (V1)
#=============================================================================

class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self.__balance = balance

    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive.")
        self.__balance += amount
        print(f"Successfully deposited {amount:,.2f} ETB.")

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")
        if amount > self.__balance:
            raise ValueError("Transaction Rejected: Insufficient funds (Overdraft).")

        self.__balance -= amount
        print(f"Successfully withdrew {amount:,.2f} ETB.")

    def statement(self):
        print("\n" + "="*35)
        print("        ADDIS BANK STATEMENT        ")
        print("="*35)
        print(f"Account Owner : {self.owner}")
        print(f"Account No.   : {self.account_number}")
        print(f"Current Balance: {self.__balance:,.2f} ETB")
        print("="*35 + "\n")


print("Initializing Ezra's Account")
my_account = Account("Ezra Mesele", "1000987654", 1000)

my_account.statement()

my_account.deposit(500.50)
my_account.withdraw(200.00)


#print(f"\nChecking property balance helper: {my_account.balance} ETB")
#my_account.statement()
