/*
 自定义promise模块 :es5 IIFE (立即执行函数)
*/
; (function (window) {
  //执行器函数同步执行 executor
  function Promise(executor) {
    const that = this
    this.status = 'pending'//给promise对象指定status属性
    this.data = undefined//给Pormise对象指定用于存储结果数据的属性
    this.callbacks = []//每个元素的结构:{onResolved(){},onReject(){}}
    function resolve(value) {
      //如果promise的状态不是pending 就直接返回
      if (that.status !== 'pending') {
        return
      }
      //将状态改成'resolved'
      that.status = 'resolved'
      //保存成功的数据
      that.data = value

      //如果有待执行的回调函数 ,立即异步执行onResolved函数
      if (that.callbacks.length > 0) {
        setTimeout(() => {//放入队列中执行所有成功的回调
          that.callbacks.forEach(callbacksobj => {
            callbacksobj.onResolved(value)
          })
        })
      }


    }
    function reject(reason) {
      if (that.status !== 'pending') {
        return
      }
      //改变promise的状态 
      that.status = 'rejected'
      //保存失败的数据
      that.data = reason
      //如果有带执行的回调函数 立即异步执行onRejected函数
      if (that.callbacks.length > 0) {
        setTimeout(() => {
          that.callbacks.forEach(callbacksobj => {
            callbacksobj.onRejected(reason)
          })
        })
      }

    }

    executor(resolve, reject)

  }
  /*
   Promis原型对象的then()
   指定失败或成功的回调函数
   返回一个新的promise对象
  */
  Promise.prototype.then = function (onResolved, onRejected) {

  }

  /*
  Promise原型对象的catch()
  指定失败的回调函数
  返回一个新的pormise对象
  */
  Promise.prototype.catch = function (ranson) {
    return this.then(null, reason)

  }

  /*
  Promsie函数对象的resove方法
  返回一个指定value成功的promise对象
  */
  Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
      resolve(value)
    })

  }

  /*
  Promise函数对象的reject方法
  返回一个指定reason 失败的promise对象
  */
  Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })

  }

  /*
  Promise函数对象的all方法 接收一个 Promise对象组成的数组
  返回一个promise 只要数组中的所有promise都成功,返回的promise结果才成功
  */
  Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
      if (promises.length == 0) {
        return resolve([])
      }
      var ary = []
      let nu = 0
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(value => {
          ary[i] = value
          nu++
          if (nu == promises.length) {
            resolve(ary)
          }
        }, reason => {
          reject(reason)
        })
      }
    })

  }

  /*
  Promsie函数对象的race方法  接收一个Promise实例对象们组成的数组
  返回最新完成异步任务的promise的状态
  */
  Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
      for (let k of promises) {
        Promise.resolve(k).then(value => {
          resolve(value)
        }, reason => {
          reject(reason)
        })
      }
    })

  }

  //向外暴露Promise函数
  window.Promise = Promise
})(window)