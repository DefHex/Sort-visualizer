def quick_sort(arr, low=0, high=None):
    def quick(arr, low, high):
        pivot = arr[high]
        i = low - 1
        for j in range(low, high):
            if arr[j] < pivot:
                i += 1
                arr[j], arr[i] = arr[i], arr[j]
        pindex = i + 1
        arr[pindex], arr[high] = arr[high], arr[pindex]
        return pindex

    if high is None:
        high = len(arr) - 1
    if low < high:
        pindex = quick(arr, low, high)
        quick_sort(arr, low, pindex - 1)
        quick_sort(arr, pindex + 1, high)


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
    quick_sort(arr)
    end = time.time()

    print(f"Array: {arr} \nRun Time: {(end - start) * 1000:.2f} ms")
