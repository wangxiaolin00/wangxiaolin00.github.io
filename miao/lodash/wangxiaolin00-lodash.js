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
    var a = [...ary1]
    for (var i = 0; i < ary.length; i++) {
      if (!a.includes(ary[i])) {
        result.push(ary[i])
      }
    }
    return result
  },
  drop: function (ary, n = 1) {
    if (n == 0) {
      return ary
    }
    if (n > ary.length) {
      return []
    }
    while (n > 0) {
      ary.splice(0, 1)
      n--
    }
    return ary
  },
  drop: function (ary, n = 1) {
    if (n == 0) {
      return ary
    }
    if (n > ary.length) {
      return []
    }
    while (n > 0) {
      ary.splice(ary.length - 1, 1)
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
      if (predicate(arr[i])) {
        return i
      }
    }
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
  join: function (ary, separator = ',') {
    var str = ''
    for (var i = 0; i < ary.length; i++) {
      str += ary[i] + separator
    }
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
  pull: function (ary, value) {
    for (var i = 0; i < ary.length; i++) {
      if (ary[i] == value) {
        ary.splice(i, 1)
      }
    }
    return ary
  },
  pullAll: function (ary, value) {
    for (var i = 0; i < ary.length; i++) {
      for (var j = 0; j < value.length; j++) {
        if (ary[i] == value[j]) {
          ary.splice(i, 1)
        }
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
  sortedindex: function (array, value) {
    var arr = array.sort((a, b) => a - b)
    for (var i = 0; i < arr.length; i++) {
      if (value > arr[i]) {
        return i + 1
      }
    }
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














}