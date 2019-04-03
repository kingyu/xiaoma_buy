import React from 'react';
import { Carousel } from 'antd';
import './styles.scss';
import buyPastime from '../assets/buy_pastime_hero.png';
import buyShop from '../assets/buy_shop_hero.png';
import buyMinisite from '../assets/buy_minisite_hero.png';
import buyFood from '../assets/buy_food_hero.png';

class CarouselComponet extends React.Component {
  state = {};
  render() {
    return (
      <Carousel autoplay effect="fade">
        <div>
          <div className="carousel-img">
            <img src={buyPastime} alt="休闲娱乐" />
          </div>
        </div>
        <div>
          <div className="carousel-img">
            <img src={buyShop} alt="小马商城" />
          </div>
        </div>
        <div>
          <div className="carousel-img">
            <img src={buyMinisite} alt="自助建站" />
          </div>
        </div>
        <div>
          <div className="carousel-img">
            <img src={buyFood} alt="自助点餐" />
          </div>
        </div>
      </Carousel>
    );
  }
}
export default CarouselComponet;
