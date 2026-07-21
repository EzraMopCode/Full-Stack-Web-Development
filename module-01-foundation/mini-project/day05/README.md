# Day 5: Addis Bank Management System V2

## Architectural Design Choices

In this version of the bank system, I explored two distinct methods for allowing the `CurrentAccount` subclass to interact with the parent account's balance:

### Option 1: The Setter Method (Alternative)
We can keep `__balance` completely private in the parent class and expose a `@balance.setter`.
=> Pros: Keeps the core balance strictly private from the outside world.
=> Cons: In financial apps, direct balance assignment (`acc.balance = 5000`) is bad practice; changes should only happen via audited `deposit()` or `withdraw()` methods.

### Option 2: The Protected Variable Method (Chosen Implementation)
I converted `self.__balance` to a protected variable: `self._balance`.
=> Why I chose it: This is the industry-standard way to handle inheritance hierachies. It safely hides the balance from external runtime scripts but trusts child subclasses (`CurrentAccount`) to read and modify it directly for advanced logic like overdraft calculations.
