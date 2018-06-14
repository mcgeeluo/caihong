Array.prototype.each = function(fn){
  fn = fn || Function.K;
   var a = [];
   var args = Array.prototype.slice.call(arguments, 1);
   for(var i = 0; i < this.length; i++){
       var res = fn.apply(this,[this[i],i].concat(args));
       if(res != null) a.push(res);
   }
   return a;
};
const base = {
  padLeftZero (str) {
    return ('00' + str).substr(str.length);
  },
  formatDate (time, fmt) {
    var date = new Date(time);
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
      }
    }
    return fmt;
  },
  toHtml(str) {
    if(typeof str !=="string")return str;
    return str.replace(/&amp;nbsp;/g, '&nbsp;').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"');
  },
  cleanHtml(str) {
    if(typeof str !=="string")return str;
    return str.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"').replace(/&amp;/g, '');;
  },
  greetings (_this) {
    let time = this.formatDate(new Date().getTime(), 'hh:mm:ss').split(':')[0];
    switch (true) {
      case time < 4:
          return 'hi, 凌晨好 ';
      case time >= 4 && time < 8:
          return 'hi, 早上好 ';
      case time >= 8 && time < 11:
          return 'hi, 上午好 ';
      case time >= 11 && time < 14:
          return 'hi, 中午好 ';
      case time >= 14 && time < 18:
          return 'hi, 下午好 ';
      case time >= 18 && time < 22:
          return 'hi, 晚上好 ';
      case time >= 22 && time < 25:
          return 'hi, 午夜好 ';
      default:

    }
  },
  getStyle (b, a) {
    try {
      if (b.currentStyle) {
        return b.currentStyle[a];
      }
      return getComputedStyle(b, false)[a];
    } catch (err) {
      this.showerror(err);
      return false;
    }
  },
  doMove (e, c, d) {
    var g = 0;
    var b = 0;
    var f = null;
    for (let a in c) {
      if (a === 'opacity') {
        g = parseInt(parseFloat(this.getStyle(e, a)) * 100);
      } else {
        g = parseInt(this.getStyle(e, a));
      }
      f = (c[a] - g) / 8;
      f = f > 0 ? Math.ceil(f) : Math.floor(f);
      if (g !== c[a]) {
        b++;
        if (a === 'opacity') {
          e.style.filter = 'alpha(opacity:' + (g + f) + ')';
          e.style.opacity = (g + f) / 100;
        } else {
          e.style[a] = g + f + 'px';
        }
      }
    }
    b.toString() === '0' && clearInterval(e.timer) && d && d();
  },
  move (c, a, f, t) {
    t = t || 40;
    c.hasOwnProperty('timer')&&clearInterval(c.timer);
    let _this = this;
    c.timer = setInterval(function () {
      _this.doMove(c, a, f);
    }, t);
  },
  unique (arr) {
    let ret = [];
    let len = arr.length;
    let tmp = {};
    for (let i = 0; i < len; i++) {
      if (!tmp[arr[i]]) {
        tmp[arr[i]] = 1;
        ret.push(arr[i]);
      }
    }
    return ret;
  },
  contains(suArr,b){
    for(var i = 0; i < b.length; i ++){
        if(b[i] == suArr){
            return true;
        }
     }
     return false;
  },
  newReg () {
    return {
      username (value) {
        return value && /^[a-zA-Z_]{1}\w{4,19}$/.test(value);
      },
      pwd (value) {
        return value && /^[A-Za-z0-9]{6,24}/.test(value);
      },
      qq (value) {
        return value && /^[0-9]{4,11}$/.test(value);
      },
      email (value) {
        return value && /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
      },
      skype (value) {
        return !!value;
      },
      funds (value) {
        return value && /^([0-9]){1,30}$/.test(value);
      },
      exist (value) {
        return value && /[A-Za-z0-9]$/.test(value);
        // return value && !(/(\?|\.|\*|\}|\{|\]|\[|\(|\)|%|&|\^|$|￥|、|#|@|!|`|~|,|-|\+|=|\/|\||\\|<|>)/g.test(value));
      },
      mobile (value) {
        if(value === '86') {
          return value && /^861((33|49|53|7[37]|8[019]|99)|(3[012]|45|5[56]|66|7[56]|8[56])|(3[456789]|47|5[012789]78|8[23478]))[0-9]{8}$/.test(value);
        }
        return value && /^([0-9]{4,18})$/.test(value);
      },
      mobilecode (value) {
        return value && /^([0-9]{2,8})$/.test(value);
      },
      withdrawName(value) {
        return value && /^[\u4e00-\u9fa5]+$/.test(value);
      },
      withdrawPassword(value) {
        return value && /^([a-zA-Z0-9]){8,24}$/.test(value) && /\d/gi.test(value);
      },
      bankCardId(value) {
        return value && /^([1-9]{1})(\d{15}|\d{17}|\d{18})$/.test(value);
      },
      password(value){
        return value && /^([a-zA-Z0-9]){6,24}$/.test(value) && /\d/gi.test(value);
      }
    }
  },
  authorityNum: 0,
  clearauthorityNum(){
    this.authorityNum = 0;
    return this;
  },
  authority(num) {
    if(num <= 0) return this.authorityNum;
    this.authorityNum += num;
    return this.authority(--num);
  },
  authoritys(num, arr) {
    if(num > arr.length-1) return this.authorityNum;
    this.authorityNum += arr[num]?Number(arr[num]):0;
    return this.authoritys(++num,arr);
  },
  minus(a, b){
   let _this = this;
   return this.unique(a).each(function(o){return _this.contains(o,b) ? null : o});
  }
}

export default {
  install: function(Vue, Option) {
    Object.defineProperty(Vue.prototype, "$", { value: base });
  }
};
