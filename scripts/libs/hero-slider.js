//このクラスの役割 = const hero = new HeroSlider(".○○");の○○クラスに対してヒーロースライダーを設定する
class HeroSlider {
  constructor(el) {
    this.el = el;
    this.swiper = this._initSwiper();
  }

  _initSwiper() {
    return new Swiper(this.el, {
      // Optional parameters
      loop: true,
      grabCursor: false,//ポインター表示するかどうか
      effect: "fade", //画像の表示の仕方
      centeredSlides: true, //スライダーの中央揃え
      slidesPerView: 1, //1枚のスライドに何枚表示するか
      speed: 2000,
      breakpoints: {//1024px以上でスライドをどうするか
        1024: {
          slidesPerView: 1,
        }
      },
    });
  }

  start(options = {}) {
    options = Object.assign({//自動スライダーの設定
      delay: 4000,
      disableOnInteraction: false
    }, options);
    this.swiper.params.autoplay = options;
    this.swiper.autoplay.start();
  }
  stop() {
    this.swiper.autoplay.stop();
  }
}
