import sys

input = sys.stdin.readline

n = int(input())
l = [0] * 10001
for i in range(n):
    t = int(input())
    l[t] = l[t] + 1
    
for i in range(10001):
    for _ in range(l[i]):
        print(i)