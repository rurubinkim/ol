n =  int(input())
l = list(map(int, input().split()))
l.sort()
def solve(t):
    ans = 0
    s = 0
    e = n-1
    while s <= e:
        mid =(s + e) // 2
        print(s, mid, e)
        if l[mid] == t:
            ans = 1
            break
        elif t < l[mid]:
            e = mid - 1
        else:
            s = mid + 1
            print(ans)
m = int(input())
ml = list(map(int, input().split()))
for i in ml:
    solve(i)