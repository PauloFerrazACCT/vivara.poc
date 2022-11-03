const settings = {
  arrows: true,
  dots: true,
  infinite: true,
  slidesToShow: 4,
  className: 'slider-shelf',
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 639,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 962,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 1279,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 4,
      },
    },
  ],
}

export default settings
