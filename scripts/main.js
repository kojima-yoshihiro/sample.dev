//===========画面リロード時にコードを実行する=================//
document.addEventListener("DOMContentLoaded", function () {

  // swiper-containerにHeroSliderを設定
  // const hero = new HeroSlider(".swiper-container");
  // HeroSliderを実行する
  // hero.start({delay: 7000});


  //コールバック関数を設ける(スクロール監視の関数に送る為に)
  // const cb = function (el, isIntersecting) {
  //   if (isIntersecting) {//もし監視する要素(el)が画面内に交差(isIntersectiong)したら...↓を実行する。
  //     const ta = new TweenTextAnimation(el);
  //     ta.animate();
  //   }
  // }

  //==================ScrollObserverをインスタンス化して使い回す====================//
  // animate-titleを呼び出す
  // const so = new ScrollObserver('.tween-animate-title', cb);


  //=====スクロール感知してカバースライド画像にinviewクラスを付与する=====//
  // const _inviewAnimation = function (el, isIntersecting) {
  //   if (isIntersecting) {
  //     el.classList.add('inview');
  //   } else {
  //     el.classList.remove('invew');
  //   }
  // }
  // const so2 = new ScrollObserver('.cover-slide', _inviewAnimation);


  //=====スクロール感知してヘッダーナビに背景色付ける=====//
  // const header = document.querySelector('.header');
  // const _navAnimation = function (el, isIntersecting) {
  //   if (isIntersecting) {
  //     header.classList.remove('triggered');
  //   } else {
  //     header.classList.add('triggered');
  //   }
  // }
  // const so3 = new ScrollObserver('.nav-trigger', _navAnimation, { once: false });

  // new MobileMenu();

  const main = new Main();
  // main.destroy();//これを呼ぶとスクロール監視のjsは止まる
});


class Main {
  constructor() {
    this.header = document.querySelector('.header');
    this.sides = document.querySelectorAll('.side');
    this._observers = [];//=====スクロール感知で動くものを配列にまとめる為に配列化する
    this._init();//init処理のものをまとめたものを実行する
  }

  //セッターゲッターメソッドでthis._observersの中にこれまでに作ったインスタンスをpush(配列に追加)する
  set observers(val) {
    this._observers.push(val);
  }
  get observers() {
    return this._observers;
  }

  //プライベートメソッドにする
  _init() {
    new MobileMenu();
    Pace.on('done', this._paceDone.bind(this));//画面更新後にアニメーションを開始するメソッド
    this.hero = new HeroSlider(".swiper-container");
  }

  _paceDone() {
    this._scrollInit();
  }


  //=====スクロール感知してtextAnimationメソッドを実行する=====//
  _textAnimation(el, isIntersecting) {
    if (isIntersecting) {//もし監視する要素(el)が画面内に交差(isIntersectiong)したら...↓を実行する。
      const ta = new TweenTextAnimation(el);
      ta.animate();
    }
  }


  //=====スクロール感知してtriggeredクラスを付けたり外したりするメソッド=====//
  _navAnimation(el, isIntersecting) {
    if (isIntersecting) {
      this.header.classList.remove('triggered');
    } else {
      this.header.classList.add('triggered');
    }
  }

  //=====スクロール感知してsideにinviewクラスを付けたり外したりするメソッド=====//
  _sideAnimation(el, isIntersecting) {
    if (isIntersecting) {
      this.sides.forEach(side => side.classList.add('inview'));
    } else {
      this.sides.forEach(side => side.classList.remove('inview'));
    }
  }

  //=====スクロール感知してカバースライド画像にinviewクラスを付与する=====//
  _inviewAnimation(el, isIntersecting) {
    if (isIntersecting) {
      el.classList.add('inview');
    } else {
      el.classList.remove('invew');
    }
  }

  //=====スクロール感知してヒーロースライダーをstart/stopするメソッド=====//
  _toggleSlideAnimation(el, isIntersecting) {
    if (isIntersecting) {
      this.hero.start();
    } else {
      this.hero.stop();
    }
  }

  //=====スクロール感知を中止するメソッド=====//
  _destroyObservers() {
    this.observers.forEach(ob => {
      ob.destroy();
    });
  }

  destroy() {
    this._destroyObservers();
  }


  //=====スクロール監視で動くものをプライベートメソッドにまとめる=====//
  _scrollInit() {
    //this.observersの中にこれまでに作ったインスタンスをpush(配列に追加)する
    this.observers = new ScrollObserver('.nav-trigger', this._navAnimation.bind(this), { once: false });

    this.observers = new ScrollObserver('#main-content', this._sideAnimation.bind(this), { once: false, rootMargin: "-300px 0px"});

    this.observers = new ScrollObserver('.cover-slide', this._inviewAnimation);

    this.observers = new ScrollObserver('.fadeIn', this._inviewAnimation);

    this.observers = new ScrollObserver('.tween-animate-title', this._textAnimation);

    this.observers = new ScrollObserver('.swiper-container', this._toggleSlideAnimation.bind(this), { ones: false });

  }
}
