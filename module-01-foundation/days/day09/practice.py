class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def insert(root, value):

    if root is None:
        return Node(value)

    if value < root.value:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)

    return root

def inorder(root):

    if root is None:
        return

    inorder(root.left)
    print(root.value)
    inorder(root.right)

root = None

balances = [500, 1000, 250, 700, 1500, 300]

for balance in balances:
    root = insert(root, balance)

print("Balances in sorted order:")

inorder(root)

#=================
# Exersice 2
def height(node):

    if node is None:
        return 0

    left_height = height(node.left)
    right_height = height(node.right)

    return 1 + max(left_height, right_height)


print(height(root))

#==================
# Exersice 3
from collections import deque

def bfs(graph, start):

    visited = set()

    queue = deque([start])

    while queue:

        vertex = queue.popleft()

        if vertex not in visited:

            visited.add(vertex)

            for neighbor in graph[vertex]:
                queue.append(neighbor)

    return visited

graph = {
    "A": ["B", "C"],
    "B": ["D", "E"],
    "C": ["F"],
    "D": [],
    "E": [],
    "F": []
}

print(bfs(graph, "A"))

#========================
# Exersice 4
def dfs(graph, start, visited=None):

    if visited is None:
        visited = set()

    visited.add(start)

    print(start)

    for neighbor in graph[start]:

        if neighbor not in visited:
            dfs(graph, neighbor, visited)

    return visited


dfs(graph, "A")

#============================
# Exersice 5
import heapq


tasks = []


heapq.heappush(tasks, (3, "Study Python"))
heapq.heappush(tasks, (1, "Fix production bug"))
heapq.heappush(tasks, (5, "Watch movie"))
heapq.heappush(tasks, (2, "Reply to emails"))
heapq.heappush(tasks, (4, "Go shopping"))


while tasks:

    priority, task = heapq.heappop(tasks)

    print(priority, task)
