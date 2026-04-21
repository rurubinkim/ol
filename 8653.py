import sys
input = sys.stdin.readline
n,m = map(int, input().split())
arr = list(map(int, input().split()))
L,R = set(), set()
T = 0
L.add(arr[0])
R.add(arr[-1])
for i in range(1,len(arr)-1):
    if arr[i-1] < arr[i] > arr[i+1] :
        T = arr[i]
    elif arr[i] > arr[i-1]:
        L.add(arr[i])
    elif arr[i] > arr[i+1]:
        R.add(arr[i])
# print(L)
# print(T)
# print(R)
for i in range(m):
    t = int(input())
    if t == T:
        print("T")
    elif t in L:
        print("L")
    elif t in R:
        print("R")
    else:
        print("N")