const sliderSettings = {
  arrows: true,
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  className: 'itemStyleGirls',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}

export default sliderSettings
