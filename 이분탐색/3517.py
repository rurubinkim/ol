import sys
input = sys.stdin.readline
n = int(input())
arr = list(map(int, input().split()))
m = int(input())
x = list(map(int, input().split()))
l = set(arr)
a = []
for i in range(m):
    if x[i] not in l:
        print(-1, end=' ')
    else:
        target=x[i]
        start, end = 0, n-1
        while start <= end:
            mid = (start + end) // 2
            if arr[mid] == target:
                print(mid, end=' ')
                break
            elif arr[mid] > target:
                end = mid - 1
            else:
                start = mid + 1