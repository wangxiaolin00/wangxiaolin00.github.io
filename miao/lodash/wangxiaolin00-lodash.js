var wangxiaolin00 = {
  compact: function (ary) {
    var result = []
    for (var i = 0; i < ary.length; i++) {
      if (ary[i]) {
        result.push(ary[i])
      }
    }
    return result
  },
  difference: function (ary, ary1) {
    var result = []
    for (var i = 0; i < ary.length; i++) {
      if (!ary1.includes(ary[i])) {
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
  }




}