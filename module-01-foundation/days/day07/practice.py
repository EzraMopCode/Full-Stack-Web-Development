# account = accounts[5]

# for account in accounts:
#     print(account)

# for account in accounts:
#     for transaction in transactions:
#         print(account, transaction)
# account = accounts_dict["ACC001"]

#=================
# Question 2

# import time


# accounts_list = []

# accounts_dict = {}


# for i in range(100000):

#     account_number = f"ACC{i}"

#     accounts_list.append(account_number)

#     accounts_dict[account_number] = True



# target = "ACC99999"

# start = time.time()

# target in accounts_list

# end = time.time()

# print("List time:", end - start)

# start = time.time()

# target in accounts_dict

# end = time.time()

# print("Dict time:", end - start)

#=================
# Question 3
class Stack:

    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        return self.items.pop()

    def peek(self):
        return self.items[-1]

names = [
    "Ali",
    "Sara",
    "John"
]

stack = Stack()

for name in names:
    stack.push(name)

reversed_names = []

while stack.items:
    reversed_names.append(stack.pop())

print(reversed_names)

#===============
# Question 4
from collections import deque

line = deque()

customers = [
    "Ali",
    "Sara",
    "John",
    "Mike",
    "Liya"
]

for customer in customers:
    line.append(customer)

while line:
    customer = line.popleft()

    print(
        f"Serving {customer}"
    )

#==================
# Question 5
class Node:

    def __init__(self, data):
        self.data = data
        self.next = None
class LinkedList:

    def __init__(self):
        self.head = None


    def push_front(self, data):

        new_node = Node(data)

        new_node.next = self.head

        self.head = new_node



    def print_all(self):

        current = self.head

        while current:

            print(current.data)

            current = current.next


linked = LinkedList()

linked.push_front("Ali")
linked.push_front("Sara")
linked.push_front("John")


linked.print_all()
