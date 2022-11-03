const sliderSettings = {
  arrows: false,
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  className: 'itemCarousel',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}

export default sliderSettings
