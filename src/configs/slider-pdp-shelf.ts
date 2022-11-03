const settings = {
  arrows: true,
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  className: 'slider-pdp',
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
      },
    },
  ],
}

export default settings
