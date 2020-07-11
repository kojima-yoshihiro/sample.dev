//このクラスの役割 = 「.mobile-menu__btn」をクリック or タッチしたら「#global-container」に「menu-openクラス」が付いたり外れたりする！！

class MobileMenu {
  constructor() {
    this.DOM = {};//DOMをオブジェクトリテラルで初期化
    this.DOM.btn = document.querySelector('.mobile-menu__btn');
    this.DOM.cover = document.querySelector('.mobile-menu__cover');
    this.DOM.container = document.querySelector('#global-container');
    this.eventType = this._getEventType();
    this._addEvent();
  }

  _getEventType() {
    return window.ontouchstart ? 'touchstart' : 'click';//スマホかPCでボタンを押す処理を分ける
  }
  _toggle() {
    this.DOM.container.classList.toggle('menu-open');
  }
  _addEvent() {
    this.DOM.btn.addEventListener(this.eventType, this._toggle.bind(this));
    this.DOM.cover.addEventListener(this.eventType, this._toggle.bind(this));
  }
}

