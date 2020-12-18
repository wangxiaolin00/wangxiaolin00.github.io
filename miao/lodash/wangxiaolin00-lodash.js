var wangxiaolin00 = {
  isShallowEqual: function (a, b) {
    if (a === b) return true;

    if (a == null || typeof a != "object" ||
      b == null || typeof b != "object")
      return false;

    var propsInA = 0,
      propsInB = 0;

    for (var prop in b)
      propsInB += 1;

    for (var prop in a) {
      propsInA += 1;
      if (!(prop in b) || !this.isShallowEqual(a[prop], b[prop]))
        return false;
    }

    return propsInA <= propsInB;
  },

  isEqual: function (a, b) {
    if (a === b)
      return true
    if (a == null || typeof a != "object" || b == null || typeof b != "object")
      return false
    var propsInA = 0,
      propsInB = 0
    for (var prop in a) {
      propsInA += 1
    }
    for (var prop in b) {
      propsInB += 1
      if (!(prop in a) || !this.isEqual(a[prop], b[prop]))
        return false
    }
    return propsInA == propsInB
  },

  baseIteratee: function (iteratee) {
    if (iteratee === null) {
      return val => val;
    }
    if (typeof iteratee === "string") {
      return val => val[iteratee];
    }
    if (typeof iteratee === "function") {
      return iteratee;
    }
    if (iteratee instanceof Array) {
      return function (obj) {
        return obj[iteratee[0]] === iteratee[1];
      }
    } else if (typeof iteratee === "object") {
      if (Object.prototype.toString.call(iteratee) === "[object RegExp]")
        return val => iteratee.test(val);
      else
        return this.isShallowEqual.bind(null, iteratee);
    }
  },

  chunk: function (ary, size = 1) {//将数组ary拆分成多个长度为size的数组返回一个包含拆分数组的二维数组
    var len = ary.length
    var r = len / size || 0
    var res = []
    for (var i = 0; i < r; i++) {
      res[i] = ary.slice(size * i, size * (i + 1))
    }
    return res
  },
  compact: function (ary) {//将数组ary里面为假值的元素过滤掉 返回一个新的数组不包含假值
    var result = []
    for (var i = 0; i < ary.length; i++) {
      if (ary[i]) {
        result.push(ary[i])
      }
    }
    return result
  },
  concat: function (ary, ...values) {//将数组里面的元素和后面的值链接成一个新的数组返回,valus二位数组默认会展平一层
    var res = []
    var s = values.flat()
    ary.forEach(it => {
      res.push(it)
    })
    s.forEach(it => {
      res.push(it)
    })
    return res
  },
  difference: function (ary, ...ary1) {//返回一个新数组 ary元素里面除了 ary1数组元素中不包含的值 的元素组成的新数组 差集 
    var result = []
    var o = {}
    for (var i = 0; i < ary1.length; i++) {
      for (var j = 0; j < ary1[0].length; j++) {
        var k = ary1[i][j]
        o[k] = 1
      }
    }
    for (var i = 0; i < ary.length; i++) {
      if (!(ary[i] in o)) {
        result.push(ary[i])
      }
    }
    return result
  },
  differenceBy: function (ary, ...values) {
    let res = []
    let m = new Map()
    if (Array.isArray(values[values.length - 1])) {
      for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < values[i].length; j++) {
          m.set(values[i][j], true)
        }
      }
      for (let k of ary) {
        if (!m.has(k)) {
          res.push(k)
        }
      }
      return res
    }
    let iteratee = values.pop()
    let dd = this.baseIteratee(iteratee)
    let value = values.flat(Infinity)
    if (Object.prototype.toString.call(iteratee) === '[object String]') {
      for (let i = 0; i < ary.length; i++) {
        for (let j = 0; j < value.length; j++) {
          if (ary[i][iteratee] == value[j][iteratee]) {
            ary.splice(i, 1)
          }
        }
      }
      return ary
    } else if (Object.prototype.toString.call(iteratee) === '[object Function]') {
      for (let i = 0; i < ary.length; i++) {
        for (let j = 0; j < value.length; j++) {
          if (iteratee(ary[i]) == iteratee(value[j])) {
            ary.splice(i, 1)
          }
        }
      }
      return ary
    }
  },
  differenceWith: function (ary, value, comparator) {
    var res = []
    for (var k of ary) {
      for (var key of value) {
        if (!(comparator(k, key))) {
          res.push(k)
        }
      }
    }
    return res

  },
  drop: function (ary, n = 1) {

    if (n > ary.length) {
      return []
    }
    var res = [...ary]
    while (n) {
      res.shift();
      n--;
    }
    return res

  },
  dropRight: function (ary, n = 1) {
    if (n == 0) {
      return ary
    }
    if (n > ary.length) {
      return []
    }
    while (n > 0) {
      ary.pop();
      n--;
    }
    return ary
  },
  dropRightWhile: function (ary, predicate) {
    let dd = this.baseIteratee(predicate)
    var res = []

    for (var i = ary.length - 1; i >= 0; i--) {
      if (dd(ary[i])) {
        res.push(ary[i])
      }

    }
    ary = res
    return ary

  },
  dropWhile: function (ary, predicate) {
    let dd = this.baseIteratee(predicate)
    var res = []
    for (var i = 0; i < ary.length; i++) {
      if (dd(ary[i])) {
        res.push(ary)
      }
    }
    ary = res
    return ary
  },
  fill: function (ary, value, start = 0, end = ary.length) {
    for (var i = start; i < end; i++) {
      ary[i] = value
    }
    return ary
  },
  findIndex: function (ary, predicate, fromIndex = 0) {
    var dd = this.baseIteratee(predicate)
    for (let i = fromIndex; i < ary.length; i++) {
      if (dd(ary[i])) {
        return i
      }
    }
    return -1


  },
  findLastIndex: function (ary, predicate, fromIndex = ary.length - 1) {
    let dd = this.baseIteratee(predicate)
    for (var i = fromIndex; i >= 0; i--) {
      if (dd(ary[i])) {
        return i
      }
    }
    return -1
  },
  first: function (ary) {
    if (ary.length == 0) {
      return undefined
    } else {
      return ary[0]
    }
  },
  flatten: function (array) {
    var ss = array.flat()
    return ss

  },
  flattenDeep: function (array) {
    var ss = array.flat(Infinity)
    return ss
  },
  flattenDepth: function (array, depth = 1) {
    var ss = array.flat(depth)
    return ss
  },
  toPairs: function (obj) {//Object.entries 返回值是可以枚举的键值对组成的数组
    return Object.entries(obj)
  },
  head: function (ary) {
    if (ary.length == 0) {
      return undefined
    } else {
      return ary[0]
    }

  },
  indexOf: function (ary, value, fromindex = 0) {//对应value在数组中索引
    for (var i = fromindex; i < ary.length; i++) {
      if (ary[i] == value) {
        return i
      }
    }
    return -1
  },
  initial: function (ary) {
    ary.splice(ary.length - 1, 1)
    return ary
  },
  intersection: function (...ary) {//求多个数组的交集
    var res = []
    ary.forEach(i => {
      minArr = i
      if (minArr.length < i.length) {
        minArr = i
      }
    })
    minArr.forEach(i => {
      var s = []
      ary.forEach(j => {
        if (j.includes(i)) {
          s.push(true)
        } else {
          s.push(false)
        }
      })
      let dd = s.every(i => i === true)
      if (dd && !(res.includes(i))) {
        res.push(i)
      }
    })
    return res

  },
  intersectionBy: function (...ary) {///
    if (Array.isArray(ary[ary.length - 1])) {
      return this.intersection(...ary)
    }
    var res = []
    var m = new Map()
    var dd = this.baseIteratee(ary.pop())
    for (var i = 0; i < ary.length; i++) {
      for (let j = 0; j < ary[i].length; j++) {
        var it = dd(ary[i][j])
        if (m.has(it)) {
          res.push(m.get(it))
        } else {
          m.set(it, ary[i][j])
        }
      }
    }
    return res
  },
  intersectionWith: function (ary, value, comparator) {//用comparator的方法求数组ary和value的交集
    var res = []
    for (let k of ary) {
      for (let i of value) {
        if (comparator(k, i)) {
          res.push(k)
        }
      }
    }
    return res

  },
  fromPairs: function (ary) {
    var res = {}
    for (var i = 0; i < ary.length; i++) {
      res[ary[i][0]] = ary[i][1]
    }
    return res
  },
  join: function (ary, separator = ',') {//将数组转化为字符串
    var str = ''
    for (var i = 0; i < ary.length - 1; i++) {
      str += ary[i] + '' + separator
    }
    str = str + ary[ary.length - 1]
    return str
  },
  last: function (ary) {//返回数组最后一个元素
    if (ary.length == 0) {
      return undefined
    } else {
      return ary[ary.length - 1]
    }

  },
  lastIndexOf: function (ary, value, fromindex = ary.length - 1) {//查索引
    for (var i = fromindex; i >= 0; i--) {
      if (ary[i] == value) {
        return i
      }
    }
    return -1
  },
  nth: function (ary, n = 0) {//获取数组总第n个元素.如果n为负,则获取倒数第n个
    if (n >= 0) {
      return ary[n]
    }
    if (n < 0) {
      return ary[ary.length + n]
    }
  },
  pull: function (ary, ...values) {
    for (var k of values) {
      while (ary.includes(k)) {
        ary.splice(ary.indexOf(k), 1)
      }
    }
    return ary

  },
  pullAll: function (ary, value) {
    for (var k of value) {
      while (ary.includes(k)) {
        ary.splice(ary.indexOf(k), 1)
      }
    }
    return ary
  },
  pullAllBy: function (ary, value, iteratee) {
    var dd = this.baseIteratee(iteratee)
    var m = new Map()
    var res = []
    for (let i = 0; i < value.length; i++) {
      let it = dd(value[i])
      m.set(it, value[i])
    }
    for (let j = 0; j < ary.length; j++) {
      if (!m.has(dd(ary[j]))) {
        res.push(ary[j])
      }
    }
    ary = res
    return ary
  },
  pullAllWith: function (ary, values, comparator) {
    var res = []
    for (let k of ary) {
      for (let i of values) {
        if (!comparator(k, i)) {
          res.push(k)
        }
      }
    }
    ary = res
    return ary
  },
  pullAt: function (ary, ...indexs) {
    var res = []
    for (let i = 0; i < indexs.length; i++) {
      res.push(ary[indexs[i]])
    }
    ary = ary.filter(x => {
      !(res.includes(x))
    })
    return res



  },
  remove: function (array, predicate = _.identity) {
    var result = []
    for (var i = 0; i < array.length; i++) {
      if (predicate(array[i])) {
        result.push(array.splice(i, 1))
      }
    }
    return result
  },
  reverse: function (array) {
    var newarr = []
    for (var i = array.length - 1; i >= 0; i--) {
      newarr.push(array[i])
    }
    for (var i = 0; i < array.length; i++) {
      array[i] = newarr[i]
    }
    return array
  },
  slice: function (array, start = 0, end = array.length) {
    var newarr = []
    for (var i = start; i < end; i++) {
      newarr.push(array[i])
    }
    return newarr

  },
  sortedIndex: function (array, value) {
    var arr = array.sort((a, b) => a - b)
    for (var i = 0; i < arr.length; i++) {
      if (value > arr[i]) {
        return i + 1
      }
    }
  },
  sortedIndexBy: function (ary, value, iteratee) {
    var dd = Object.prototype.toString.call(iteratee)
    if (dd === '[object Function]') {
      for (let i = 0; i < ary.length; i++) {
        if (iteratee(value) <= iteratee(ary[i])) {
          return i
        }
      }
    } else if (dd === '[object String]') {
      for (var i = 0; i < ary.length; i++) {
        if (value[iteratee] <= ary[i][iteratee]) {
          return i
        }
      }
    }
  },
  sortedIndexOf: function (ary, value) {
    for (var i = 0; i < ary.length; i++) {
      if (ary[i] == value) {
        return i
        break;
      }
    }
    return -1
  },
  sortedLastIndex: function (ary, value) {
    for (let i = ary.length - 1; i >= 0; i--) {
      if (value < ary[i]) {
        return i
      }
    }
  },
  sortedLastIndexBy: function (ary, value, iteratee) {
    let dd = this.baseIteratee(iteratee)
    for (let i = ary.length - 1; i >= 0; i--) {
      if (dd(value) < dd(ary[i])) {
        return i
      }
    }
    return -1
  },
  sortedLastIndexOf: function (ary, value) {
    for (let i = ary.length - 1; i >= 0; i--) {
      if (value == ary[i]) {
        return i
        break
      }
    }
    return -1

  },
  sortedUniq: function (array) {
    return [...new Set(array)]
  },
  sortedUniqBy: function (ary, iteratee) {
    let dd = this.baseIteratee(iteratee)
    var m = new Map()
    var res = []
    for (let i = 0; i < ary.length; i++) {
      let it = dd(ary[i])
      if (m.has(it)) {
        res.push(m.get(it))
      } else {
        m.set(it, ary[i])
      }

    }
    return res

  },
  tail: function (arr) {
    arr.shift()
    return arr
  },
  take: function (ary, n = 1) {

    if (n == 0) {
      return []
    }
    return ary.slice(0, n)


  },
  takeRight: function (ary, n = 1) {

    if (n == 0) {
      return []
    }
    if (n > ary.length) {
      return ary
    }
    return ary.slice(ary.length - n)
  },
  takeRightWhile: function (ary, predicate) {
    if (Object.prototype.toString.call(predicate) === '[object String]') {
      return []
    }
    let dd = this.baseIteratee(predicate)
    var res = []
    for (let i = 0; i < ary.length; i++) {
      if (dd(ary[i])) {
        res.push(ary[i])
      }
    }
    return res
  },
  takeWhile: function (ary, predicate) {
    if (Object.prototype.toString.call(predicate) === '[object String]') {
      return []
    }
    let dd = this.baseIteratee(predicate)
    var res = []
    for (let i = 0; i < ary.length; i++) {
      if (dd(ary[i])) {
        res.push(ary[i])
      }
    }
    return res
  },
  union: function (...arys) {//求并集
    var res = []
    arys.forEach(it => {
      it.forEach(i => {
        res.push(i)
      })
    })
    return [...new Set(res)]
  },
  unionBy: function (...args) {
    let s = args.pop()
    var l = new Set()
    var result = []
    let dd = this.baseIteratee(s)


    if (Object.prototype.toString.call(s) === '[object String]') {
      var arr = args.flat(Infinity)
      for (let k of arr) {
        let i = dd(k)
        if (!l.has(i)) {
          l.add(i)
          result.push(k)
        }
      }
      return result
    }

    var m = new Map()
    var res = []
    for (let i = 0; i < args.length; i++) {
      for (let j = 0; j < args[i].length; j++) {
        let it = dd(args[i][j])
        if (m.has(it)) {
          res.push(m.get(it))
        } else {
          m.set(it, args[i][j])
        }
      }
    }
    return res
  },
  unionWith: function (ary, value, comparator) {
    let res = []
    var s = []
    for (let k of ary) {
      for (let i of value) {
        if (comparator(k, i)) {
          res.push(k)
        }
      }
    }
    for (let j of value) {
      for (let n of res) {
        if (!comparator(j, n)) {
          s.push(j)
        }
      }
    }
    for (let m of ary) {
      s.push(m)
    }


    return s
  },
  uniq: function (array) {
    var arr = []
    for (var i = 0; i < array.length; i++) {
      if (arr.indexOf(array[i]) === -1) {
        arr.push(array[i])
      }
    }
    return arr
  },
  uniqBy: function (ary, iteratee) {
    let dd = this.baseIteratee(iteratee)
    var res = []
    var s = new Set()
    ary.forEach(it => {
      let f = dd(it)
      if (!s.has(f)) {
        s.add(f)
        res.push(it)
      }
    })
    return res
  },
  uniqWith: function (ary, comparator) {
    let l = 0
    let r = ary.length - 1
    var res = []
    while (l < r) {
      if (comparator(ary[l], ary[r])) {
        res.push(ary[l])
      }
      l++
      r--
    }
    var s = []
    for (let j of ary) {
      for (let n of res) {
        if (comparator(j, n)) {
          break
        } else {
          s.push(j)
        }
      }
    }
    return res.concat(s)
  },
  without: function (ary, ...values) {
    return ary.filter(x => {
      return !values.includes(x)
    })
  },
  xor: function (...ary) {
    var s = ary.flat(Infinity)
    var o = {}
    for (let i of s) {
      if (o[i]) {
        o[i]++
      } else {
        o[i] = 1
      }
    }
    var res = []
    for (let i in o) {
      if (o[i] == 1) {
        res.push(Number(i))
      }
    }
    return res
  },
  xorBy: function (...ary) {
    let s = ary.pop()
    var m = new Map()
    var res = []
    if (Object.prototype.toString.call(s) === '[object Function]') {
      for (let i = 0; i < ary.length; i++) {
        for (let j = 0; j < ary[i].length; j++) {
          let it = s(ary[i][j])
          if (m.has(it)) {
            m.set(it, m.get(it) + 1)
          } else {
            m.set(it, 1)
          }
        }
      }
      var arr = ary.flat(Infinity)
      for (let k of arr) {
        let d = s(k)
        if (m.get(d) == 1) {
          res.push(k)
        }
      }
      return res

    } else if (Object.prototype.toString.call(s) === '[object String]') {
      var arr = ary.flat(Infinity)
      arr.forEach(i => {
        let it = i[s]
        if (m.has(it)) {
          m.set(it, m.get(it) + 1)
        } else {
          m.set(it, 1)
        }
      })
      for (let k of arr) {
        let d = k[s]
        if (m.get(d) == 1) {
          res.push(k)
        }
      }
      return res

    }

  },
  max: function (array) {
    if (array.length == 0) {
      return undefined
    } else {
      return Math.max(...array)
    }
  },
  min: function (array) {
    if (array.length == 0) {
      return undefined
    } else {
      return Math.min(...array)
    }
  },
  sum: function (array) {
    var result = 0
    for (var i = 0; i < array.length; i++) {
      result += array[i]
    }
    return result
  },
  maxBy: function (array, iteratee = _.identity) {
    var max = array[0]
    for (var i = 0; i < array.length; i++) {
      if (iteratee(array[i]) > iteratee(max)) {
        max = array[i]
      }
    }
    return max
  },
  sumBy: function (array, iteratee = _.identity) {
    var res = 0
    for (var i = 0; i < array.length; i++) {
      res += iteratee(array[i])
    }
    return res
  },
  every: function (arr, predicate) {
    var dd = this.baseIteratee(predicate)
    for (let k of arr) {
      if (!dd(k)) {
        return false
      }
    }
    return true


  },
  filter: function (array, predicate) {
    let dd = this.baseIteratee(predicate)
    var res = []
    for (let k of array) {
      if (dd(k)) {
        res.push(k)
      }
    }
    return res
  },
  find: function (ary, predicate, fromIndex = 0) {
    let dd = this.baseIteratee(predicate)
    for (let i = fromIndex; i < ary.length; i++) {
      if (dd(ary[i])) {
        return ary[i]
        break
      }
    }
    return undefined
  },
  toArray: function (value) {
    if (typeof value == 'object') {
      return Object.values(value)
    } else if (typeof value == 'string') {
      return value.split('')
    } else if (value === 1 || value === null) {
      return []
    } else {
      return value.split('')
    }
  },
  includes: function (collection, value, fromindex = 0) {
    if (Array.isArray(collection)) {
      for (var i = fromindex; i < collection.length; i++) {
        if (collection[i] == value) {
          return true
        }
      }
      return false
    } else if (typeof collection == 'object') {
      for (var i in collection) {
        if (collection[i] == value) {
          return true
        }
      }
      return false
    } else if (typeof collection == 'string') {
      var reg = new RegExp(value)
      if (collection.match(reg)) {
        return true
      }
      return false
    }

  },
  map: function (collection, iteratee = _.identity) {
    var res = []
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        res.push(iteratee(collection[i]))
      }
      return res
    } else if (typeof collection == 'object' && typeof iteratee == 'string') {
      for (var i in collection) {
        if (i == iteratee) {
          res.push(collection[i])
        }
      }
      return res
    }

  },

















}