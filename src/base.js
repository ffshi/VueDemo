
import fetch from 'isomorphic-fetch'
(function () {

  function install (Vue) {
    Vue.snb = Vue.snb || {};
    Vue.snb.global = this;
    Vue.snb.ajaxHeaders = {
      "Client-Type" : 0,
      "Content-Type": "application/x-www-form-urlencoded"
    };

    /**
     * 检测数据类型
     * @param {*} 任意字符类型
     * @return {string} 数据类型.
    */
    Vue.snb.typeOf = function(value) {
      var s = typeof value;
      if(s == 'object'){
        if(value){
            if(value instanceof Array) {
              return 'array';
            } else if (value instanceof Object) {
              return s;
            }
            var className = Object.prototype.toString.call((value));
            if (className == '[object Window]') {
              return 'object';
            }
            if ((className == '[object Array]' ||
                 typeof value.length == 'number' &&
                 typeof value.splice != 'undefined' &&
                 typeof value.propertyIsEnumerable != 'undefined' &&
                 !value.propertyIsEnumerable('splice')
                )) {
              return 'array';
            }
            if ((className == '[object Function]' ||
                typeof value.call != 'undefined' &&
                typeof value.propertyIsEnumerable != 'undefined' &&
                !value.propertyIsEnumerable('call'))) {
              return 'function';
            }
          } else {
            return 'null';
          }
      }else if (s == 'function' && typeof value.call == 'undefined') {
          return 'object';
       }
       return s;
    };

    /**
     * 判断undefined
     * @param {*} 任意字符类型
     * @return {string} 数据类型是否undefined.
    */
    Vue.snb.isDef = function(val) {
      return val !== undefined;
    };


    /**
     * 判断null
     * @param {*} 任意字符类型
     * @return {boolean} 数据类型是否null
    */
    Vue.snb.isNull = function(val) {
      return val === null;
    };

    /**
     * 判断array
     * @param {*} 任意字符类型
     * @return {boolean} 数据类型是否array.
    */
    Vue.snb.isArray = function(val) {
      return Vue.snb.typeOf(val) === 'array';
    };

    /**
     * 判断looks like an array
     * @param {*} 任意字符类型
     * @return {boolean} 数据类型是否array.
    */
    Vue.snb.isArrayLike = function(val) {
      var type = Vue.snb.typeOf(val);
      return type === 'array' || type === 'object' && typeof val.length == 'number';
    };

    /**
     * 将Json数据转为String
     * @name    jsonToString
     * @param   {Object}  要转化的json对象
     * @param   {Boolean} 是否要进行转码以备URL传输
     * @return  {String}  转化后的字符串
    */
    Vue.snb.jsonToString = function(json, isEncode) {
      var strTemp = "";
      for (var key in json) {
        strTemp += key + '=' + (isEncode?encodeURIComponent(json[key]):json[key]) + '&';
      }
      return strTemp.slice(0, -1);
    };

    /**
     * 将String转为Json
     * @name    stringToJson
     * @param   {String}  要转化的字符串
     * @param   {Boolean} 是否要进行转码
     * @return  {String}  转化后的Json对象
    */
    Vue.snb.stringToJson = function(string,isDecode) {
      var tempURL = string.split('&'), json="";
      for(var i = 0;i<tempURL.length;i++){
        var t = tempURL[i].split('=');
        json += "'"+t[0]+"':'"+(isDecode?decodeURIComponent(t[1]):t[1])+"',";
      }
      return eval("({"+json.slice(0,-1)+"})");
    };

    /**
     * 去掉空格
     * @param {string} 要去掉空格的字符串
     * @param   {Boolean} 是否去掉字符串中间的空格
     * @return  {String}  处理过的字符串
    */
    Vue.snb.trim = function(str , is_global) {
      if(!str) return "";
      //return str.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '');
      //var result = str.replace(/(^\s+)|(\s+$)/g, "");
      var result = str.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '');
      if (is_global) result = result.replace(/\s/g, "");
      return result;
    };

    /**
     * 去掉前置空格
     * @param {string} 要去掉空格的字符串
     * @return  {String}  处理过的字符串
    */
    Vue.snb.trimLeft = function(str) {
      return str.replace(/^[\s\xa0]+/, '');
    };

    /**
     * 去掉后置空格
     * @param {string} 要去掉空格的字符串
     * @return  {String}  处理过的字符串
    */
    Vue.snb.trimRight = function(str) {
      return str.replace(/[\s\xa0]+$/, '');
    };

    /**
     * 检测空字符
     * @param {string} 要检测的字符串
     * @return  {Boolean}  返回结果
    */
    Vue.snb.isEmpty = function(str) {
      return /^[\s\xa0]*$/.test(str);
    };

    /**
     * 检测String
     * @param {string} 要检测的字符串
     * @return  {Boolean}  返回结果
    */
    Vue.snb.isString = function(value) {
      return typeof value === 'string';
    };

    /**
     * 检测字母（大小写）
     * @param {string} 要检测的字符串
     * @return  {Boolean}  返回结果
    */
    Vue.snb.isAlpha = function(str) {
      return !/[^a-zA-Z]/.test(str);
    };

    /**
     * 检测数字
     * @param {string} 要检测的字符串
     * @return  {Boolean}  返回结果
    */
    Vue.snb.isNumber = function(str) {
      return !/[^0-9]/.test(str);
    };


    /**
     * Returns true if the specified value is a function.
     * @param {*} val Variable to test.
     * @return {boolean} Whether variable is a function.
     */
    Vue.snb.isFunction = function(val) {
      return Vue.snb.typeOf(val) == 'function';
    };


    /**
     * Returns true if the specified value is an object.  This includes arrays and
     * functions.
     * @param {*} val Variable to test.
     * @return {boolean} Whether variable is an object.
     */
    Vue.snb.isObject = function(val) {
      var type = typeof val;
      return type == 'object' && val != null || type == 'function';
    };


    /**
     * 检测字母+数字
     * @param {string} 要检测的字符串
     * @return  {Boolean}  返回结果
    */
    Vue.snb.isAlphaNumber = function(str) {
      return !/[^a-zA-Z0-9]/.test(str);
    };

    /**
     * 检测空格
     * @param {string} 要检测的字符串
     * @return  {Boolean}  返回结果
    */
    Vue.snb.isSpace = function(ch) {
      return ch == ' ';
    };

    Vue.snb.array = Vue.snb.array || {};
    /**
     * Extends an array with another array, element, or "array like" object.
     * This function operates 'in-place', it does not create a new Array.
     *
     * Example:
     * var a = [];
     * Vue.snb.array.extend(a, [0, 1]);
     * a; // [0, 1]
     * Vue.snb.array.extend(a, 2);
     * a; // [0, 1, 2]
     *
     * @param {Array} arr1  The array to modify.
     * @param {...*} var_args The elements or arrays of elements to add to arr1.
     */
    Vue.snb.array.extend = function(arr1, var_args) {
      for (var i = 1; i < arguments.length; i++) {
        var arr2 = arguments[i];
        // If we have an Array or an Arguments object we can just call push
        // directly.
        var isArrayLike;
        if (Vue.snb.isArray(arr2) ||
            // Detect Arguments. ES5 says that the [[Class]] of an Arguments object
            // is "Arguments" but only V8 and JSC/Safari gets this right. We instead
            // detect Arguments by checking for array like and presence of "callee".
            (isArrayLike = Vue.snb.isArrayLike(arr2)) &&
                // The getter for callee throws an exception in strict mode
                // according to section 10.6 in ES5 so check for presence instead.
                Object.prototype.hasOwnProperty.call(arr2, 'callee')) {
          arr1.push.apply(arr1, arr2);
        } else if (isArrayLike) {
          // Otherwise loop over arr2 to prevent copying the object.
          var len1 = arr1.length;
          var len2 = arr2.length;
          for (var j = 0; j < len2; j++) {
            arr1[len1 + j] = arr2[j];
          }
        } else {
          arr1.push(arr2);
        }
      }
    };



    Vue.snb.object = Vue.snb.object || {};
    /**
     * The names of the fields that are defined on Object.prototype.
     * @type {Array.<string>}
     * @private
     */
    Vue.snb.object.PROTOTYPE_FIELDS_ = [
      'constructor',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toLocaleString',
      'toString',
      'valueOf'
    ];
    /**
     * Extends an object with another object.
     * This operates 'in-place'; it does not create a new Object.
     *
     * Example:
     * var o = {};
     * Vue.snb.object.extend(o, {a: 0, b: 1});
     * o; // {a: 0, b: 1}
     * Vue.snb.object.extend(o, {c: 2});
     * o; // {a: 0, b: 1, c: 2}
     *
     * @param {Object} target  The object to modify.
     * @param {...Object} var_args The objects from which values will be copied.
     */
    Vue.snb.object.extend = function(target, var_args) {
      var key, source;
      for (var i = 1; i < arguments.length; i++) {
        source = arguments[i];
        for (key in source) {
          target[key] = source[key];
        }

        // For IE the for-in-loop does not contain any properties that are not
        // enumerable on the prototype object (for example isPrototypeOf from
        // Object.prototype) and it will also not include 'replace' on objects that
        // extend String and change 'replace' (not that it is common for anyone to
        // extend anything except Object).

        for (var j = 0; j < Vue.snb.object.PROTOTYPE_FIELDS_.length; j++) {
          key = Vue.snb.object.PROTOTYPE_FIELDS_[j];
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };


    /**
     * 管道节流，用于mouseover等调用频繁的优化处理
     * @name    throttle
     * @param   {Function}  真正用于执行的方法
     * @param   {Integer}   延时
     * @return  {Function}  节流方法
    */
    Vue.snb.throttle = function(fn, delay, mustRunDelay){
      var timer = null;
      var t_start;
      return function(){
        var context = this, args = arguments, t_curr = +new Date();
        clearTimeout(timer);
        if(!t_start){
          t_start = t_curr;
        }
        if(t_curr - t_start >= mustRunDelay){
          fn.apply(context, args);
          t_start = t_curr;
        }else {
          timer = setTimeout(function(){
            fn.apply(context, args);
          }, delay);
        }
      };
    };

    /**
     * 数据发送
     * 使用节流方法避免双击等重复提交
     * @name    sendData
     * @param   {String}   发送地址
     * @param   {Object}   配置选项，如果为字符串则当做发送参数
     * @param   {Function} 请求返回后的回调方法
    */
    var _lastSendDataUrl,_lastUrlTimeout = Vue.snb.throttle(function(){_lastSendDataUrl="";},1500);
    Vue.snb.sendData = function (url,options,callback) {

      var ajaxObj       = null,
        _this         = this,
        currentUrl    = url+(options.param || options),
        headersParams = options.headers || {},
        urlParam      = options.param || (Vue.snb.isString(options) ? options : '');
        options.dontCheck = options.dontCheck || true;
      if(!options.dontCheck && currentUrl === _lastSendDataUrl){
        return;
      }
      _lastUrlTimeout();
      _lastSendDataUrl = currentUrl;


      if(Vue.snb.isFunction(options)){
        callback = options;
        options  = {};
      }

      //发送前执行的方法
      if(options.beforeSendDate){
        if(Vue.snb.isFunction(options.beforeSendDate)){
            options.beforeSendDate();
        }
      }

      //统一增加url后缀
      if(url.indexOf("?")!=-1){  //包含?
        url = url + "&t=" + new Date().valueOf();
      }else{ //不包含?
        url = url + "?t=" + new Date().valueOf();
      }

      // ajax header 预处理
      if(Vue.snb.ajaxHeaders){
        headersParams          = headersParams || {};
        Vue.snb.ajaxHeaders    = Vue.snb.ajaxHeaders || {};
        headersParams          = Vue.snb.object.extend(headersParams,Vue.snb.ajaxHeaders);
      }

      if(options.body && Vue.snb.isObject(options.body)){
        options.body = JSON.stringify(options.body);
      }

      fetch(url, {
        method : options.method || 'GET',
        headers:headersParams,
        body   :options.body || null
      }).then(function (response) {
        // if (response.status >= 200 && response.status < 300) {
        //   return response;
        // } else {
        //   var error = new Error(response.statusText)
        //   error.response = response
        //   throw error
        // }
        if (response.status == 401 || response.status == 403) {
          transition.redirect('/user/signin');
          var error = new Error(response.statusText)
          error.response = response
          throw error;
        }else{
          return response;
        }
      }).then(function(response){
        return response.json();
      }).then(function(backData){
        if(Vue.snb.isFunction(callback)){
          callback.call(options.context || _this, backData, options.extData);
        }
      }).catch(function(error) {
        callback.call(_this,{"fetchStatus":"error",data:error});
      });
      return;
    };
  }

  if (typeof exports == "object") {
    module.exports = install
  }
  else if (typeof define == "function" && define.amd) {
    alert('1')
    define([], function(){ return install })
  }
  else if (window.Vue) {
    Vue.use(install)
  }

})()
