const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
// const AppError = require('../utils/AppError');

exports.getDashboard = catchAsync(async (req, res, next) => {
  res.status(200).render('base', {
    tour: 'The Forest Hiker',
    user: 'Panji'
  });
});

exports.getOverview = catchAsync(async (req, res) => {
  //1) get tour data from collection
  const tours = await Tour.find();

  //2)build template
  //3) render that template using tour data from 1)
  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

exports.getTour = catchAsync(async (req, res) => {
  //1) get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'revies',
    fields: 'review rating user'
  });
  //2) build template

  //3) render template using data from 1)
  res.status(200).render('tour', {
    title: 'The Forest Hiker',
    tour
  });
});
