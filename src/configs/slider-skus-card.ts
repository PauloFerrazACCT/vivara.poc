const sliderSettings = {
  arrows: true,
  dots: true,
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 5,
  className: 'skusCard',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ],
}

export default sliderSettings
