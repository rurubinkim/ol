import sys
input = sys.stdin.readline
n, q = map(int, input().split())
l = list(map(int, input().split()))
tidx = 0
tv = 0
for c in range(n):
    if l[c] > tv:
        tv = l[c]
        tidx = c
L = l[:tidx]
LSET = set(L)
R = l[tidx+1:]
RSET = set(R)

def isLeft(k):

    s = 0
    e = tidx - 1
    while s <= e:
        mid = (s+e) // 2
        if l[mid] == k:
            return True
        elif l[mid] < k:
            s = mid + 1
        else:
            e = mid - 1
    return False


def isRight(k):

    s = tidx + 1
    e = n - 1
    while s <= e:
        mid = (s+e) // 2
        if l[mid] == k:
            return True
        elif l[mid] < k:
            e = mid - 1
        else:
            s = mid + 1
    return False

def sovle(k):
    if k == tv:
        print("T")
    elif isLeft(k):
        print("L")
    elif isRight(k):
        print("R")
    else:
        print("N")

for _ in range(q):
    k = int(input())
    sovle(k)