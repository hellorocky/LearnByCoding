//给定一个字符串,求出这个字符串中出现频率最高的那个字符以及次数;
function word_max_count(word) {
    var obj = {};
    var arr = [];

    for (let i=0, len=word.length; i<len; i++) {
        if (word[i] in obj) {
            obj[word[i]] += 1;
        } else {
            obj[word[i]] = 1;
        }
    }
    
    for (let key in obj) {
        arr.push([key, obj[key]]) ;   
    }

    arr.sort(function(x, y) {return y[1] - x[1]})
    console.log(arr[0]);
    return arr[0];

}

function wmc(word) {
    var word_arr = word.split("");
    var obj = word_arr.reduce(function(all, current) {
        if (current in all) {
            all[current]++;
        } else {
            all[current] = 1;
        }
        return all;
    }, {}) //{} 是 all的初始值, 这是reduce相关知识
    console.log(obj);
}

wmc("abcdaaaaaa")

function wmc1(word) {
    var obj = {};
    var word_arr = word.split("");
    word_arr.forEach(function(i) {
        obj[i] = (obj[i] || 0) + 1;
    })
    console.log(obj)
}


//数组的复制和引用
var arr = ["a", "b", "c"];
var a = arr;
var b = arr.slice();
arr.push("d")
console.log(arr);
console.log(a);
console.log(b);

//使用Array的内置方法遍历数组
var arr = ["a", "b", "c"];
arr.forEach(function (item, index, array) {
    console.log(item, index)
})

//JavaScript中Array也是对象,我们一般使用[index]的方式来取值,其实是程序自动把数字变成了字符串,如下
var arr = ["a", "b", "c"];
arr[1] //'b'
arr[1.0] //'b'
//因为String(1) === String(1.0)

//判断Array和Object
var a = [1, 2, 3];
var o = {name: "Rocky"};
a instanceof Array;
o instanceof Object;
