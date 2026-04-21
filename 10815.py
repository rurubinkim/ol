import sys
input = sys.stdin.readline
a=int(input())
b=set(map(int,input().split()))
c=int(input())
d=list(map(int,input().split()))
for i in range(c):
    if d[i] in b:
        print(1)
    else:
        print(0)