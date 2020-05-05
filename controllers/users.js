const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

//@desc  GET ALL USERS
//@route GET /api/v1/users
//@access Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResult);
});

//@desc  GET SINGLE USERS
//@route GET /api/v1/users/:id
//@access Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({ success: true, data: user });
});
