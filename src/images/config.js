const desktop = {
  sourceWidth: 1920,
  aspectRatio: 1440 / 690,
  breakpoints: [1280, 1440, 1680, 1920],
  backgroundColor: '#EDEDED',
  layout: 'fullWidth',
  options: {
    fitIn: true,
  },
}

const mobile = {
  sourceWidth: 768,
  aspectRatio: 480 / 317,
  breakpoints: [768],
  backgroundColor: '#EDEDED',
  layout: 'fullWidth',
  options: {
    fitIn: true,
  },
}

module.exports = {
  'carousel.desktop': {
    sourceWidth: 1920,
    aspectRatio: 1440 / 690,
    breakpoints: [1920],
    backgroundColor: '#EDEDED',
    layout: 'fullWidth',
    options: {
      fitIn: true,
    },
  },
  'carousel.mobile': {
    sourceWidth: 768,
    aspectRatio: 16 / 15,
    breakpoints: [768],
    backgroundColor: '#EDEDED',
    layout: 'fullWidth',
    options: {
      fitIn: true,
    },
  },
  'fullwidthCarousel.desktop': {
    sourceWidth: 1920,
    aspectRatio: 15 / 4,
    breakpoints: [1920],
    backgroundColor: '#EDEDED',
    layout: 'fullWidth',
    options: {
      fitIn: true,
    },
  },
  'fullwidthCarousel.mobile': {
    sourceWidth: 768,
    aspectRatio: 15 / 16,
    breakpoints: [768],
    backgroundColor: '#EDEDED',
    layout: 'fullWidth',
    options: {
      fitIn: true,
    },
  },
  'staticBanner.desktop': desktop,
  'staticBanner.mobile': mobile,
  'fullwidthBanner.desktop': {
    sourceWidth: 1920,
    aspectRatio: 8 / 3,
    breakpoints: [1280, 1440, 1680, 1920],
    backgroundColor: '#FFFFFF',
    layout: 'fullWidth',
    options: {
      fitIn: true,
    },
  },
  'fullwidthBanner.mobile': {
    sourceWidth: 750,
    aspectRatio: 25 / 32,
    breakpoints: [375, 425, 768],
    backgroundColor: '#FFFFFF',
    layout: 'fullWidth',
    options: {
      fitIn: true,
    },
  },
  'showcaseBanner.desktop': desktop,
  'showcaseBanner.mobile': mobile,
  'product.summary': {
    sourceWidth: 480,
    aspectRatio: 1,
    width: 360,
    breakpoints: [250, 360, 480],
    layout: 'constrained',
    fadeIn: false,
    backgroundColor: '#f0f0f0',
    options: {
      fitIn: true,
    },
  },
  'product.details': {
    sourceWidth: 720,
    aspectRatio: 1,
    width: 720,
    breakpoints: [250, 360, 480, 720],
    layout: 'constrained',
    backgroundColor: '#f0f0f0',
    options: {
      fitIn: true,
    },
  },
  'product.miniature': {
    sourceWidth: 720,
    aspectRatio: 1,
    width: 100,
    breakpoints: [50, 100, 150],
    layout: 'constrained',
    backgroundColor: '#f0f0f0',
    options: {
      fitIn: true,
    },
  },
}
