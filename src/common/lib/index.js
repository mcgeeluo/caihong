const _conf = {
  sAlert: function(option){
    return new Prompt(option);
  }
}

class Prompt {
  constructor (option) {
    this.createDiv =  document.createElement('div');
    this.timer = null;
    return this.init(option);
  }
  init (option) {
    let {idx, message = '', note = '',  callback=null ,autoClose, time = 2000, wid = '100%', hei = document.documentElement.clientHeight} = option;
    this.createDiv.id = idx;
    this.time = time;
    this.createDiv.innerHTML = `<div class='jBox-wrapper jBox-Modal jBox-Default common-modal grey jBox-hasTitle jBox-closeButton-title BgRgbB4' style='width:${wid};height:${hei}px;position: fixed;  opacity: 1; z-index: 9999;left: 0;top: 0;'><div class='jBox-container'  style='position: fixed;  opacity: 1; z-index: 10000; left: 50%; top: 50%; margin-left: -150px; margin-top: -50px;'><div class='jBox-title jBox-draggable'><div><i class='icon lock'></i>提示：<span class='title-sm'></span></div><div class='jBox-closeButton jBox-noDrag' id='${idx}close'>x</div></div><div class='jBox-content' style='padding: 20px 0; text-align: center; width: 300px;'>${message} <br />${note}</div></div></div>`;
    this.bandEvent(autoClose,callback);
    return {
      idx: idx,
      createDiv: this.createDiv,
      init: this.openCreateDiv,
      close: this.closeCreateDiv,
      remove: this.removeCreateDiv,
      time: this.time,
      timer: this.timer
    };
  }
  bandEvent (autoClose,callback) {
    let _this = this;
    document.body.appendChild(this.createDiv);
    if (autoClose ) {
      this.timer = setTimeout(function () {
        _this.removeCreateDiv();
        callback&&callback()
      }, this.time);
      return ;
    }
    this.createDiv.addEventListener('click', function () {
      _this.removeCreateDiv();
      callback&&callback()
    }, false);
  }
  removeCreateDiv () {
    clearTimeout(this.timer);
    document.body.removeChild(this.createDiv);
  }
  openCreateDiv (option) {
    clearTimeout(this.timer);
    let _this = this;
    this.createDiv = document.getElementById(option.idx);
    if (option.hasOwnProperty('isReset')) {
      return this.init(option);
    }
    if (option.hasOwnProperty('autoClose') && option.autoClose) {
      this.timer = setTimeout(function () {
        _this.close();
      }, this.time);
    };
    this.createDiv.style.display = 'block';
    return true;
  }
  closeCreateDiv () {
    clearTimeout(this.timer);
    this.createDiv.style.display = 'none';
  }
};
export default {
  install: function(Vue, Option) {
    Object.defineProperty(Vue.prototype, "$s", { value: _conf });
  }
};
