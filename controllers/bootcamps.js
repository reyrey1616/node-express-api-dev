const Bootcamp = require('../models/Bootcamp');

//@desc  GET all bootcamps
//@route GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootCamps = await Bootcamp.find();
    res
      .status(200)
      .json({ success: true, count: bootCamps.length, data: bootCamps });
  } catch (error) {
    res.status(400).json({ success: false, data: 'Bad Request' });
  }
};

//@desc GET single bootcamps
//@route GET /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootCamp = await Bootcamp.findById(req.params.id);

    if (!bootCamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: bootCamp });
  } catch (error) {
    res.status(400).json({ success: false, data: 'Bad Request' });
  }
};

//@desc Create new bootcamp
//@route POST /api/v1/bootcamps/
//@access Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      succes: true,
      data: bootcamp,
    });
  } catch (error) {
    res.status(400).json({
      succes: false,
      data: 'bad request',
    });
  }
};

//@desc Update bootcamp
//@route PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const updateBootcamp = await Bootcamp.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateBootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: updateBootcamp });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

//@desc Delete bootcamp
//@route DELETE /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const deleteBootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!deleteBootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: deleteBootcamp });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
