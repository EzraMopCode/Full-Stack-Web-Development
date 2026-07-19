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
         raise ValueError("Amount must be positive")
        self.__balance += amount
      def withdraw(self, amount):
        if balance > amount:
          self.balance -= amount
        elif amount <= 0:
          raise ValueError("Please Enter Valid Input")
        else:
            
