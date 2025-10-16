def merge_sort(arr):
    def merge(left, right):
        result = []
        i, j = 0, 0
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

    n = len(arr)
    if n <= 1:
        return arr
    mid = n // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)


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
    merge_sort(arr)
    end = time.time()

    print(f"Array: {arr} \nRun Time: {(end - start) * 1000:.2f} ms")
