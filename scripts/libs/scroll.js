//スクロールに応じてjavascriptを実行させるインターセクションオブザーバー！
//================スクロール監視のクラスを作っておく=======================//
class ScrollObserver {
  constructor(els, cb, options) {
    this.els = document.querySelectorAll(els);//第1引数に入れる監視するDOMクラスのこと
    const defaultOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
      once: true //1回で監視を止めるか、続けるかをtrueかfalseで指定できる。
    };
    this.cb = cb;//コールバック関数。他で作ったメソッドを第2引数に入れる。
    this.options = Object.assign(defaultOptions, options);
    this.once = this.options.once;
    this._init();
  }
  _init() {
    const callback = function (entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {//entryが監視対象の各要素のこと。それがisIntersectiong(画面内に交差する)がtrueの場合↓
          this.cb(entry.target, true);
          if (this.once) {
            observer.unobserve(entry.target);//一度入ってきたら監視を止める
          }
        } else {
          this.cb(entry.target, false);
        }
      });
    };
    this.io = new IntersectionObserver(callback.bind(this), this.options);//callbackという関数を入れる初期化処理
    this.io.POLL_INTERVAL = 100;//IntersectionObserverが使えない古いブラウザ用にpolyfillを読み込んで、その設定
    this.els.forEach(el => this.io.observe(el));//ioはelを監視する(を繰り返す)
    //これによってelが画面内に入ってきたタイミングで関数cbが毎回呼ばれる
  }

  destroy() {//IntersectionObserverから開放するためのメソッド
    this.io.disconnect();
  }
}
