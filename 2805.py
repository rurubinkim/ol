import sys

input = sys.stdin.readline
n, m = map(int,input().split())
l = list(map(int, input().split()))
s = 0
e = 2000000000
aans = 0
while True:
    if s > e:
        break
    mid = (s + e) // 2
    ans  = 0
    
    for i in l:
        ans += max(i-mid , 0)
    if ans == m:
        print(mid)
        aans = mid
    elif ans > m:
        s = mid  + 1
    else:
        e = mid - 1