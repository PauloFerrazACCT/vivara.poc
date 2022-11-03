const settings = {
  arrows: false,
  dots: true,
  infinite: true,
  slidesToShow: 2,
  slidesToScroll: 2,
  className: 'browse-colletion-slider',
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}

export default settings
