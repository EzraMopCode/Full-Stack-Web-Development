from collections import deque


class Account:

    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self.balance = balance

    def __str__(self):
        return f"{self.owner} ({self.account_number}) - {self.balance} ETB"

class Branch:

    def __init__(self, name):
        self.name = name
        self.children = []
        self.accounts = []

    def add_child(self, branch):
        self.children.append(branch)

    def add_account(self, account):
        self.accounts.append(account)

    def total_balance(self):

        total = 0

        # Add balances of this branch
        for account in self.accounts:
            total += account.balance

        # Add balances of child branches
        for child in self.children:
            total += child.total_balance()

        return total

def bfs(transfers, start):

    visited = set()

    queue = deque([start])

    while queue:

        account = queue.popleft()

        if account not in visited:

            visited.add(account)

            for neighbour in transfers.get(account, []):
                queue.append(neighbour)

    return visited

a1 = Account("Ezra", "A001", 5000)
a2 = Account("Sara", "A002", 3000)
a3 = Account("John", "A003", 7000)
a4 = Account("Mike", "A004", 4000)
a5 = Account("Liya", "A005", 2500)

head_office = Branch("Head Office")

region_north = Branch("North Region")
region_south = Branch("South Region")

branch_a = Branch("Branch A")
branch_b = Branch("Branch B")

# Three levels
head_office.add_child(region_north)
head_office.add_child(region_south)

region_north.add_child(branch_a)
region_south.add_child(branch_b)

# Add accounts
head_office.add_account(a1)

region_north.add_account(a2)

region_south.add_account(a3)

branch_a.add_account(a4)

branch_b.add_account(a5)


transfers = {

    "A001": ["A002", "A003"],

    "A002": ["A004"],

    "A003": ["A005"],

    "A004": ["A005"],

    "A005": []

}


print("===================================")
print("TOTAL BANK BALANCE")
print("===================================")

print(head_office.total_balance())

print()

print("===================================")
print("BFS FROM ACCOUNT A001")
print("===================================")

reachable = bfs(transfers, "A001")

print(reachable)
