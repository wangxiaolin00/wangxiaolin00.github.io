var wangxiaolin00 = {
  chunk: function (ary, size = 1) {
    var len = ary.length
    var r = len / size || 0
    var res = []
    for (var i = 0; i < r; i++) {
      res[i] = ary.slice(size * i, size * (i + 1))
    }
    return res
  },
  compact: function (ary) {
    var result = []
    for (var i = 0; i < ary.length; i++) {
      if (ary[i]) {
        result.push(ary[i])
      }
    }
    return result
  },
  difference: function (ary, ...ary1) {
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
  fill: function (ary, value, start = 0, end = ary.length) {
    for (var i = start; i < end; i++) {
      ary[i] = value
    }
    return ary
  },
  findIndex: function (ary, predicate = _.identity, fromindex = 0) {
    for (var i = fromindex; i < ary.length; i++) {
      if (predicate(ary[i])) {
        return i
      }
    }
    return -1
  },
  findLastIndex: function (ary, predicate = _.identity, fromindex = ary.length - 1) {
    for (var i = fromindex; i >= 0; i--) {
      if (predicate(ary[i])) {
        return i
      }
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
  indexOf: function (ary, value, fromindex = 0) {
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
  intersection: function (...ary) {
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
  fromPairs: function (ary) {
    var res = {}
    for (var i = 0; i < ary.length; i++) {
      res[ary[i][0]] = ary[i][0]
    }
    return res
  },
  join: function (ary, separator = ',') {
    var str = ''
    for (var i = 0; i < ary.length - 1; i++) {
      str += ary[i] + '' + separator
    }
    str = str + ary[ary.length - 1]
    return str
  },
  last: function (ary) {
    if (ary.length == 0) {
      return undefined
    } else {
      return ary[ary.length - 1]
    }

  },
  lastIndexOf: function (ary, value, fromindex = array.length - 1) {
    for (var i = fromindex; i >= 0; i--) {
      if (ary[i] == value) {
        return i
      }
    }
    return -1
  },
  nth: function (ary, n = 0) {
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
  sortedUniq: function (array) {
    return [...new Set(array)]
  },
  tail: function (arr) {
    arr.shift()
    return arr
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
  every: function (arr, predicate = _.identity) {
    for (var k of arr) {
      if (!predicate(i)) {
        return false
      }
    }
    return true
  },
  filter: function (array, predicate = _.identity) {
    var res = []
    if (Array.isArray(array)) {
      for (var k of array) {
        if (predicate(k)) {
          res.push(k)
        }
      }
      return res
    } else if (typeof predicate == 'object') {
      for (var i in array) {
        if (predicate[i] in array) {
          res.push(i)
        }
      }
    } else if (typeof predicate == 'string') {
      for (var i of array) {
        if (i[predicate]) {
          res.push(i)
        }
      }
    } else {
      for (var k of array) {
        if (predicate(k)) {
          res.push(k)
        }
      }
      return res
    }
  },
  toArray: function (value) {
    if (typeof value == 'object') {
      return Object.values(value)
    } else if (typeof value == 'string') {
      return value.split('')
    } else if (value == 1 || value == null) {
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