#====================================
# Day 07 Exersice (1 - 5)

def total(nums):
    if not nums:
        return 0

    return nums[0] + total(nums[1:])


def count_down(n):
    if n <= 0:
        return

    print(n)
    count_down(n - 1)


numbers = [5, 10, 15, 20]

print("Total:", total(numbers))

count_down(5)
#=======================
# Binary Search

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


balances = [100, 250, 500, 800, 1200, 1500]

print(binary_search(balances, 800))
print(binary_search(balances, 999))

#==========================
# Merge Sort

def merge(left, right):

    result = []

    i = 0
    j = 0

    while i < len(left) and j < len(right):

        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])

    return result


def merge_sort(items):

    if len(items) <= 1:
        return items

    middle = len(items) // 2

    left = merge_sort(items[:middle])
    right = merge_sort(items[middle:])

    return merge(left, right)


numbers = [8, 4, 2, 10, 5, 7, 6, 1]

print(merge_sort(numbers))
print(sorted(numbers))

#========================

accounts = [
    ("Ezra", 500),
    ("Abel", 1500),
    ("Sara", 800),
    ("John", 300)
]

sorted_accounts = sorted(
    accounts,
    key=lambda account: account[1],
    reverse=True
)

print(sorted_accounts)

#==================
def has_pair(nums, target):

    left = 0
    right = len(nums) - 1

    while left < right:

        current = nums[left] + nums[right]

        if current == target:
            return True

        elif current < target:
            left += 1

        else:
            right -= 1

    return False


numbers = [1, 2, 3, 5, 7, 9, 11]

print(has_pair(numbers, 10))
print(has_pair(numbers, 20))

