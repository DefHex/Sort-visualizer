def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr


if __name__ == "__main__":
    import time

    raw_input = input(
        "please enter an array of (5 - 10) elements between (0 - 555) seperated by (,)"
    )
    raw_input.strip()
    if not raw_input:
        print("Please enter some numbers!")
    try:
        arr = [int(x.strip()) for x in raw_input.split(",")]
    except ValueError:
        print("Please make sure to seperate the elements using (,)")

    if any(x < 0 or x > 555 for x in arr):
        print("Please make sure to enter numbers between 0 and 555")

    if len(arr) < 5 or len(arr) > 10:
        print("array should have minimum 5 and maximum 10 elements")

    start = time.time()
    bubble_sort(arr)
    end = time.time()

    print(f"Array: {arr} \nRun Time: {(end - start) * 1000:.2f} ms")
