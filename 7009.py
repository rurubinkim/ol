import sys
input = sys.stdin.readline
n, m = map(int, input().split())
arr = set(map(int, input().split()))
a, b, c = map(int, input().split())
l = []
if a not in arr:
    l.append(a)
if b not in arr:
    l.append(b)
if c not in arr:
    l.append(c)
if l:
    print(*l)
else:
    print(-1)