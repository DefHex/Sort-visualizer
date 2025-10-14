import time

arr = [64, 34, 25, 12, 22, 11, 90, 5]
print(f"Initail array {arr}")
start = time.time()
for i in range(len(arr)):
    for j in range(len(arr) - i - 1):
        if arr[j] > arr[j + 1]:
            temp = arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = temp
end = time.time()
print(f"Sorted array {arr}. total time: {end - start}")
