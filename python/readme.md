### Learn Python By Coding

#### Goal
* Writing python code shorter, faster and more readable at the same time


#### Function

```python
# The default values are evaluated at the point of function definition in the defining scope.

i = 5

def func(arg=i):
    print arg

i = 6

func()

will print 5


当使用可变的数据结构作为默认参数时应当注意:
x = []
def func(a, L=x):
    L.append(a)
    return L

print func(1)
print func(2)
print func(3)
print x
[1]
[1, 2]
[1, 2, 3]
[1, 2, 3]
解读:
1. 函数默认参数的定义只在函数定义的时候执行一次,python参数的传递实际上是对象的引用,当参数是一个不可变的对象的时候,比如说字符串,函数会把参数的链接指向那个字符串,所以不管函数在哪执行,默认参数都已经做好引用了,就不会变了;
,如果默认参数是一个可变对象的话当函数定义以后,如例2,L就会引用定义函数时候的那个空数组,函数在下面被执行的时候修改的其实是那个数组,而L只是一个引用,所以就会出现上面的情况,这样的情况不是我们想要的,避免这种情况的办法是不要给函数传递可变的默认参数,
,当传递的参数不是默认参数的时候没有问题,因为每一次都传入一个新的引用:

def func(a, L=None):
    if L is None:
        L = []
    L.append(a)
    return L
这样就不会有问题了

2. non-keyword argument after a keyword argument;default argument must follows non-default argument;


# If arguments are not available separately, write the function call with the *-operator to unpack the arguments out of a list or tuple:
>>>args = [3, 6]
>>>range(*args)
[3, 4, 5]

```

*. 求多个长度相同的list个对应元素之和(假设都是整数)

```python
#之前比较年轻,使用遍历的笨办法,这次试用map

x, y, z= range(1, 5), range(5, 9), range(9, 13)
map(lambda a,b,c: a+b+c, x, y, z)

[15, 18, 21, 24]
```

*. 列出1-20之间能被3或者5整除的数字
```
def f(x): return x % 3 == 0 or x % 5 == 0
filter(f, range(1, 20))

[3, 5, 9, 10, 12, 15, 18, 20]

```
*. 求一个整数list的所有元素的积
```
reduce(lambda x, y: x*y, [1,2,3,4,5])

120

```
* 列表推导式
```
>>> [(x, y) for x in [1,2,3] for y in [3,1,4] if x != y]
[(1, 3), (1, 4), (2, 3), (2, 1), (2, 4), (3, 1), (3, 4)]

>>> {x for x in [1,2,3,1,2,3]}
set([1, 2, 3])

```

* zip使用方法
```
x = ["Rocky", "Victor", "Huan"]
y = [26, 24, 25, 100]
zip(x, y)
[("Rocky", 26), ("Victor", 24), ("Huan", 25)]

dict(zip(x, y))
{"Rocky": 26, "Victor": 24, "Huan": 25}

for k, v in zip(x, y):
    print k, v

Rocky  26
Victor 24
Huan 25

```

* enumerate
```
>>> x = ["Rocky", "Victor", "Huan"]
>>> for k,v in enumerate(x):
...     print k,v

0 Rocky
1 Victor
2 Huan

```

* assign the result of a comparison or other Boolean expression to a variable
```
工作中经常会遇到这样一种情况,有三个变量x,y,z,如果x符合条件(这里以是否为空来测试)就返回x,然后再看看y是否符合,如果符合就返回,再看看z
一般的做法是:
if x:
    return x
elif y:
    return x
elif z:
    return z

其实可以更简洁:
r = x or y or z
return r


```

* 三目运算符

```
x = "A" if 1>0 else "B"
"A"

y = 1/0 if 0 else 1
1 # 三目运算符只有当第一个条件为真的时候才会去运算1/0,所以这个表达式不会报错
```







#### Sort


sorted和list的内置方法sort比较:

```
* sorted返回一个新的已经排好序的list而不改变原有的list,sort方法会改变原来的数据,如果源数据不需要的话可以使用sort方法
* 从python2.2开始sort和sorted都是稳定的排序
```

* 按照年龄倒排

```python
方法一:
>>> home = [{"name": "Rocky", "age": 26},{"name": "Victor", "age": 24}, {"name": "Father", "age": 53}]
>>> print sorted(home, key=lambda person: person["age"], reverse=True)
[{'age': 53, 'name': 'Father'}, {'age': 26, 'name': 'Rocky'}, {'age': 24, 'name': 'Victor'}]

方法二:
>>>from operator import itemgetter
>>>print sorted(home, key=itemgetter("age"), reverse=True)
[{'age': 53, 'name': 'Father'}, {'age': 26, 'name': 'Rocky'}, {'age': 24, 'name': 'Victor'}]
```

* 按照列表中字符串所含有的感叹号的数量排序

```python
>>>from operator import methodcaller
>>>messages = ['critical!!!', 'hurry!', 'standby', 'immediate!!']
>>>sorted(messages, key=methodcaller("count", "!"))
['standby', 'hurry!', 'immediate!!', 'critical!!!']
```

* 体重降序 年龄升序(体重为主,年龄为次)

```python
#有主次的话先比较次优先级的然后比较主优先级的
>>>home = [["Rocky", 26, 75], ["Victor", 24, 75], ["tony", 32, 70]]
>>>from operator import itemgetter
>>> s = sorted(home, key=itemgetter(1))
>>> s
[['Victor', 24, 75], ['Rocky', 26, 75], ['tony', 32, 70]]
>>> sorted(s, key=itemgetter(2))
[['tony', 32, 70], ['Victor', 24, 75], ['Rocky', 26, 75]]
```

* 给如下的list排序(不区分大小写)

```python
x = ["a", "b", "C", "D"]

sorted(x)
["C", "D", "a", "b"] #sorted对于字母/单词的默认排序顺序是按照字母的ASCII表,大写字母都小于小写字母
方法一:
sorted接收一个cmp参数,这个参数是传一个拥有两个参数的函数,比如说x, y,如果x小于y的话返回负数一般为-1,x大于y的话返回正数一般为1,相等的话返回0
我们可以重写这个函数,如下
def cmp(x, y):
    if x.lower() < y.lower():
        return -1
    elif x.lower() > y.lower():
        return 1
    return 0

sorted(x, cmp=cmp)
["a", "b", "C", "D"]  #如果要倒序的话可以让上面的函数相反地返回,该返回-1的返回1即可或者使用reverse参数为True即可

方法二(推荐):
To use key= custom sorting, remember that you provide a function that takes one value and returns the proxy value to guide the sorting.

sorted(x, key=str.lower)
["a", "b", "C", "D"]

```

#### data structures

* List

```python
1. list append quivalent a[len(a):] = [x]

>>> lst = [1,2,3,4]
>>>lst[len(lst):] = [5,6]
>>>lst
>>>[1,2,3,4,5,6]
>>>lst[:2] = [9,8]
>>>lst
[9,8,3,4,5,6]
>>>del lst[1:4]
>>> lst
[9,5,6]

```

* Tuple

```python
>>>x = "Rocky"
>>>len(x)
5
>>>x = "Rocky",    # 注意后面有一个逗号
>>>len(x)
1
>>>x = 1, 2, "Hi"
>>>x
(1, 2, "Hi")
>>>a, b, c = x
>>>a, b, c
1, 2, "Hi"

>>>(a, b), c = "XY", "Z"
>>>a,b,c
X Y Z

>>> a,b,*c = range(5)
>>> a,b,c
(0, 1, [2, 3, 4])
>>> a,*b,c = range(5)
>>> a,b,c
(0, [1, 2, 3], 4)
>>>

>>> t = [("Rocky", 26), ("Tony", 32)]
>>> for name, age in t:
...     print(name,age)
...
...
Rocky 26
Tony 32
```

* String

```python
>>>x = 123.4567
>>>y = 98.76543
>>>"{0:.2f}   {1:.2f}".format(x, y)
123.45    98.76

>>> name = "Rocky"
>>> age = 26
>>> "{0:10} ==> {1:10d}".format(name, age)
'Rocky      ==>         26'
>>>"{0:.2f}s vs {1:.3f}s".format(1.234, 1.234)
1.23s vs 1.234s
```

* dict

```python
* 把一个list变成一个dict并附件默认值
>>>x = ["Rocky", "Tony", "Abc"]
>>>y = dict.fromkeys(x, "www")
>>>y
{"Rocky": "www", "Tony": "www", "Abc": "www"}

```


#### Built-in Functions

* issubclass(A, B) 或者 issubclass(A, (B, C)) (B, C是或的关系)
```
判断某一个类是不是另一个类的子类,比如:
from collections import defaultdict
issubclass(defaultdict, dict)
True

```











