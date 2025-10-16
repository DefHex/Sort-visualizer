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
