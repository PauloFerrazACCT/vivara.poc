const settings = {
  arrows: true,
  dots: true,
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 3,
  className: 'slider-productDetails',
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1.5,
        slidesToScroll: 1,
      },
    },
  ],
}

export default settings
