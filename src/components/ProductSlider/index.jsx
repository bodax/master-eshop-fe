import React from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import {
  ProductSliderContainer,
  ProductSliderHeader,
  ProductSliderH1,
  ProductSliderBarrier,
  ProductSliderWrap,
  ProductSliderProductContainer,
} from './ProductSliderElements.js';
import ProductItemSkeleton from '../Skeleton/ProductItemSkeleton.jsx';
import ProductCard from './ProductCard/index.jsx';

const ProductSlider = ({ items, status, title }) => {
  if (status === 'success' && items && !items.length) return <></>;

  if (items.length && items.length < 4) {
    settings.infinite = false;
  }

  return (
    <ProductSliderContainer>
      <ProductSliderHeader>
        <ProductSliderH1>
          <ProductSliderBarrier />
          {title}
        </ProductSliderH1>
      </ProductSliderHeader>
      <ProductSliderWrap>
        <Slider {...settings}>
          {status === 'success'
            ? items.map((el) => <ProductCard key={el.product_id} item={el} />)
            : [1, 2, 3, 4].map((el) => <ProductItemSkeleton key={el} />)}
        </Slider>
      </ProductSliderWrap>
    </ProductSliderContainer>
  );
};

let settings = {
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  autoplay: true,
  autoplaySpeed: 5000,
  arrows: false,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 280,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export default ProductSlider;
