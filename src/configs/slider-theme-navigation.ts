const settings = {
  arrows: false,
  dots: true,
  infinite: true,
  slidesToShow: 3,
  className: 'slider-theme-navigation',
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 350,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 549,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 550,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
}

export default settings
