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
    // if (iteratee === null) {
    //   return val => val;
    // }
    // if (typeof iteratee === "string") {
    //   return val => val[iteratee];
    // }
    // if (typeof iteratee === "function") {
    //   return iteratee;
    // }
    // if (iteratee instanceof Array) {
    //   return function (obj) {
    //     return obj[iteratee[0]] === iteratee[1];
    //   }
    // } else if (typeof iteratee === "object") {
    //   if (Object.prototype.toString.call(iteratee) === "[object RegExp]")
    //     return val => iteratee.test(val);
    //   else
    //     return this.isShallowEqual.bind(null, iteratee);
    // }
    let g = Object.prototype.toString.call(iteratee)
    if (g === '[object Function]') {
      return iteratee
    }
    if (g === '[obejct String]') {
      return this.property(iteratee)
    }
    if (g === '[object Array]') {
      return this.matchesProperty(iteratee[0], iteratee[1])
    }
    if (g === '[object Object]') {
      return this.matches(iteratee)
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
  zip: function (...arys) {
    var res = []
    for (let i = 0; i < arys[0].length; i++) {
      res.push([])
    }
    for (let i = 0; i < arys.length; i++) {
      for (let j = 0; j < arys[i].length; j++) {
        res[j][i] = arys[i][j]
      }
    }
    return res
  },
  zipObject: function (ary, value) {
    var o = {}
    for (i = 0; i < ary.length; i++) {
      o[ary[i]] = value[i]

    }
    return o
  },
  zipWith: function (...arys) {
    let s = arys.pop()
    var res = []
    var nu = []
    if (Object.prototype.toString.call(s) === '[object Function]') {
      for (let i = 0; i < arys[0].length; i++) {
        res.push([])
      }
      for (let i = 0; i < arys.length; i++) {
        for (let j = 0; j < arys[i].length; j++) {
          res[j][i] = arys[i][j]
        }
      }
      for (let i = 0; i < res.length; i++) {
        nu.push(s(...res[i]))
      }

    }
    return nu
  },
  countBy: function (ary, iteratee) {
    var o = {}
    if (Object.prototype.toString.call(iteratee) === '[object Function]') {
      for (let k of ary) {
        let it = iteratee(k)
        if (o[it]) {
          o[it]++
        } else {
          o[it] = 1
        }
      }
      return o
    } else if (Object.prototype.toString.call(iteratee) === '[object String]') {
      for (let j = 0; j < ary.length; j++) {
        let item = ary[j].length
        if (o[item]) {
          o[item]++
        } else {
          o[item] = 1
        }
      }
      return o
    }
  },
  forEach: function (ary, iteratee) {
    if (Array.isArray(ary)) {
      for (let i = 0; i < ary.length; ++i) {
        iteratee(ary[i], i, ary)
      }
    } else if (ary instanceof Object) {
      for (let k in ary) {
        let temp = iteratee(ary[k], k, ary)
        if (temp == false) {
          break
        }
      }
    }
    return ary
  },
  groupBy: function (ary, iteratee) {
    let type = Object.prototype.toString.call(iteratee)
    var o = {}
    if (type === '[object Function]') {
      for (let k of ary) {
        let it = iteratee(k)
        if (o[it]) {
          o[it].push(k)
        } else {
          o[it] = [k]
        }
      }
      return o
    } else if (type === '[object String]') {
      for (var k of ary) {
        let item = k[iteratee]
        if (o[item]) {
          o[item].push(k)
        } else {
          o[item] = [k]
        }
      }
      return o
    }
  },
  includes: function (ary, value, fromIndex = 0) {
    let t = Object.prototype.toString.call(value)
    if (t === '[object Number]' && Array.isArray(ary)) {
      for (let i = fromIndex; i < ary.length; i++) {
        if (value == ary[i]) {
          return true
        }
      }
      return false
    } else if (t === '[object String]' && ary instanceof Object) {
      for (let k in ary) {
        if (ary[k] === value) {
          return true
        }
      }
      return false
    } else if (t === '[object String]' && Object.prototype.toString.call(ary) === '[object String]') {
      var re = new RegExp(value)
      return re.test(ary)
    }
  },
  invokeMap: function (ary, path, ...args) {
    let t = Object.prototype.toString.call(path)
    if (t === '[object String]') {
      return ary.map(it => {
        return it[path](...args)
      })
    } else if (t === '[object Function]') {
      return ary.map(it => path.call(it, ...args))
    }
  },
  keyBy: function (ary, iteratee) {
    let t = Object.prototype.toString.call(iteratee)
    var o = {}
    if (t === '[object Function]') {
      for (let k of ary) {
        let it = iteratee(k)
        if (!(o[it])) {
          o[it] = k
        }

      }
      return o
    } else if (t === '[object String]') {
      for (let i of ary) {
        let item = i[iteratee]
        if (!(o[item])) {
          o[item] = i
        }
      }
      return o
    }
  },
  map: function (ary, iteratee) {
    let t = Object.prototype.toString.call(iteratee)
    var res = []
    if (t === '[object Function]' && Array.isArray(ary)) {
      for (let k of ary) {
        res.push(iteratee(k))
      }
      return res
    } else if (t === '[object Function]' && ary instanceof Object) {
      for (let k in ary) {
        res.push(iteratee(ary[k]))
      }
      return res
    } else if (t === '[object String]' && iteratee.includes(".")) {
      let arr = iteratee.split('.')
      for (let k of ary) {
        res.push(k[arr[0]][arr[1]])
      }
      return res

    } else if (t === '[object String]') {
      for (let k of ary) {
        res.push(k[iteratee])
      }
      return res
    }
  },
  partition: function (ary, predicate) {
    var res = [[], []]
    let t = Object.prototype.toString.call(predicate)
    if (t === '[object Function]') {
      for (let k of ary) {
        let it = predicate(k)
        if (it) {
          res[0].push(k)
        } else {
          res[1].push(k)
        }
      }
      return res
    } else if (t === '[object Object]') {
      let dd = this.baseIteratee(predicate)
      for (let k of ary) {
        if (dd(k)) {
          res[0].push(k)
        } else {
          res[1].push(k)
        }
      }
      return res
    } else if (t === '[object Array]') {
      for (let k of ary) {
        if (k[predicate[0]] === predicate[1]) {
          res[0].push(k)
        } else {
          res[1].push(k)
        }
      }
      return res
    } else if (t === '[object String]') {
      for (let k of ary) {
        if (k[predicate]) {
          res[0].push(k)
        } else {
          res[1].push(k)
        }
      }
      return res
    }


  },
  isMatch: function (object, source) {
    for (let i in source) {
      if (!this.isEqual(object[i], source[i])) {
        return false
      }
    }
    return true


  },
  matches: function (source) {
    return object => {
      return wangxiaolin00.isMatch(object, source)
    }

  },
  property: function (path) {
    if (!Array.isArray(path)) {
      path = this.toPath(path)
    }
    return function (obj) {
      for (let k of path) {
        obj = obj[k]
      }
      return obj
    }
  },
  matchesProperty: function (path, src) {
    return function (obj) {
      return wangxiaolin00.isEqual(wangxiaolin00.get(obj, path), src)
    }
  },
  toPath: function (value) {
    return value.match(/\w+/g)
  },
  get: function (object, path, defaultvalue = 'default') {
    if (Object.prototype.toString.call(path) === '[object String]') {
      path = this.toPath(path)
    }
    if (Array.isArray(path) && object) {
      for (let k of path) {
        if (k in Object(object)) {
          object = object[k]
        } else {
          return defaultvalue
        }
      }
      return object
    } else if (Object.prototype.toString.call(path) === '[object String]') {
      for (let i of path) {
        if (i in Object(object)) {
          object = object[i]

        } else {
          return defaultvalue
        }
      }
      return object
    }
  },
  sortBy: function (ary, ...iteratee) {
    let t = Object.prototype.toString.call(iteratee[0])
    if (t === '[object Function]' && iteratee.length == 1) {
      var f = iteratee[0]
      var arr = ary.slice()
      return arr.sort((a, b) => {
        return f(a).charCodeAt(0) - f(b).charCodeAt(0)
      })

    } else if (t === '[object Array]' && iteratee.length == 1) {
      var f = iteratee[0]
      var arr = ary.slice()
      return arr.sort((a, b) => {
        return a[f[0]].charCodeAt(0) - b[f[0]].charCodeAt(0)
      }).sort((a, b) => {
        return a[f[1]] - b[f[1]]
      })

    } else if (t === '[object String]' && iteratee.length == 2) {
      var f1 = iteratee[0]
      var f2 = iteratee[1]
      var arr = ary.slice()
      return arr.sort((a, b) => {
        return a[f1].charCodeAt(0) - b[f1].charCodeAt(0)
      }).sort((x, y) => {
        return f2(x) - f2(y)
      })
    }
  },
  camelCase: function (str) {
    var ssr = ""
    var s = str.match(/[a-z]+/gi)
    var res = []
    for (let i = 0; i < s.length; i++) {
      res.push(s[i].toLowerCase())
    }
    for (let j = 0; j < res.length; j++) {
      if (j > 0) {
        res[j] = res[j].replace(res[j][0], res[j][0].toUpperCase())
      }
      ssr += res[j]
    }
    return ssr
  },
  capitalize: function (str) {
    var s = str.toLowerCase()
    return s.replace(s[0], s[0].toUpperCase())
  },
  endsWith: function (str, target, position = str.length) {
    if (str && str[position - 1] == target) {
      return true
    } else {
      return false
    }

  },
  pad: function (str, len = 0, chars = " ") {
    while (str.length < len) {
      str = str + chars
      if (str.length >= 8) {
        break
      }
      str = chars + str

    }
    return str.slice(0, len)

  },
  padEnd: function (str, len = 0, chars = " ") {
    while (str.length < len) {
      str = str + chars
    }
    return str.slice(0, len)
  },
  padStart: function (str, len = 0, chars = " ") {
    while (str.length < len) {
      str = chars + str
    }
    return str.slice(0, len)
  },
  parseInt: function (str, radix = 10) {
    var r = /^0x/
    var e = /^0b/
    if (r.test(str)) {
      return parseInt(str, 16)
    } else if (e.test(str)) {
      return parseInt(str, 8)
    } else {
      return parseInt(str, 10)
    }
  },
  repeat: function (str, n = 1) {
    var s = ''
    for (let i = 0; i < n; i++) {
      s += str
    }
    return s
  },
  replace: function (str, pattern, ment) {
    return str.replace(pattern, ment)

  },
  split: function (str, separator, limit) {
    var s = str.split(separator)
    s.length = limit
    return s
  },
  startsWith: function (str, target, position = 0) {
    return str[position] === target
  },
  toLower: function (str) {
    return str.toLowerCase()
  },
  toUpper: function (str) {
    return str.toUpperCase()
  },
  upperFirst: function (str) {
    return str.replace(str[0], str[0].toUpperCase())
  },
  words: function (str, pattern) {
    if (pattern == null) {
      pattern = /[a-z]+/gi
    }
    return str.match(pattern)
  },
  assign: function (obj, ...sources) {//将多个实例对象拷贝到原来的对象上 浅拷贝
    for (let k of sources) {
      Object.assign(obj, k)
    }
    return obj

  },
  assignIn: function (obj, ...sources) {
    for (let k of sources) {
      for (let i in k) {
        obj[i] = k[i]
      }
    }
    return obj
  },
  at: function (obj, ary) {
    var res = []
    ary = ary.map(it => wangxiaolin00.toPath(it))
    for (let i of ary) {
      var b = obj
      for (let k of i) {
        b = b[k]
      }
      res.push(b)
    }
    return res
  },
  defaults: function (obj, ...sources) {//将对象来源source中 在obj中没有的属性名拷贝到obj上,已经有的不更改
    for (let k of sources) {
      for (let i in k) {
        if (obj[i]) {
          continue
        } else {
          obj[i] = k[i]
        }
      }
    }
    return obj
  },
  toPairsIn: function (obj) {
    var o = {}
    for (let i in obj) {
      o[i] = obj[i]
    }
    return Object.entries(o)
  },
  findKey: function (obj, predicate) {
    var d = baseIteratee(predicate)
    var t = Object.prototype.toString.call(predicate)
    if (t === '[object Function]') {
      for (let i in obj) {
        if (d(obj[i])) {
          return i
          break
        }
      }
      return undefined
    } else if (t === '[object String]') {
      for (let i in obj) {
        if (obj[i][predicate]) {
          return i
          break
        }
      }
      return undefined
    } else {
      for (let i in obj) {
        if (d(obj[i])) {
          return i
          break
        }
      }
      return undefined
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
    let t = Object.prototype.toString.call(predicate)
    if (t === '[object Function]') {
      for (let k of arr) {
        if (!predicate(k)) {
          return false
        }
      }
      return true
    } else {
      let dd = this.baseIteratee(predicate)
      for (let i of arr) {
        if (!dd(i)) {
          return false
        }
      }
      return true
    }


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
  ary: function (func, n = func.length) {
    return function (...args) {
      return func(...args.slice(0, n))
    }
  },



















}