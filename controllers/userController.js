const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const Factory = require('./handleFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1. create error is user POSTed password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2. filter out unwanted fields name that are not allowed to be updated
  const filterBody = filterObj(req.body, 'name', 'email');

  // 3. update user document
  const updateUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updateUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.getUser = Factory.getOne(User);

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined. Please use /signup instead'
  });
};

exports.updateUser = Factory.updateOne(User);
exports.deleteUser = Factory.deleteOne(User);
