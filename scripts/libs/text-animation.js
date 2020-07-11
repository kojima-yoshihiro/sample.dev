//=============クラスを作成して再利用性を高める==================//
//このクラスの役割＝「文字を1文字づつ配列化し、<span class="char">を付与する」そして、inviewクラスを付けたり外したりする
class TextAnimation {
  constructor(el) {//                                クラスを初期化
    this.DOM = {};
    this.DOM.el = el instanceof HTMLElement ? el : document.querySelector(el);
    this.chars = this.DOM.el.innerHTML.trim().split("");
    this.DOM.el.innerHTML = this._splitText();
  }
  _splitText() {//                                   メソッドを登録
    return this.chars.reduce((acc, curr) => {
      curr = curr.replace(/\s+/, "&nbsp;");
      return `${acc}<span class="char">${curr}</span>`;
    }, "");
  }
  animate() {//                                      inviewクラスを付与するメソッド
    this.DOM.el.classList.toggle("inview");
  }
}

//=============クラスを継承して新たなクラスを作成==================//
class TweenTextAnimation extends TextAnimation {
  constructor(el) {
    super(el);//     元のクラスのプロパティを引用
    this.DOM.chars = this.DOM.el.querySelectorAll(".char");
  }
  animate() {//                                      inviewクラスを付与するメソッド
    this.DOM.el.classList.add('inview');//           inviewクラスを付与する
    this.DOM.chars.forEach((c, i) => {//                  一文字づつにループ処理を指定
      TweenMax.to(c, .2, {//                         TweenMaxのメソッドでアニメーションを指定
        ease: Back.easeOut,
        delay: i * 0.07,
        startAt: { y: '50%', opacity: 0 },
        y: '0%',
        opacity: 1,
        
      });
    });
  }
}
