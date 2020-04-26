//@desc  GET all bootcamps
//@route GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all bootcamps' });
};

//@desc GET single bootcamps
//@route GET /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Display bootcamp: ${req.params.id}` });
};

//@desc Create new bootcamp
//@route POST /api/v1/bootcamps/
//@access Public
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Create new bootcamp` });
};

//@desc Update bootcamp
//@route PUT /api/v1/bootcamps/:id
//@access Public
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update Bootcamp ${req.params.id}` });
};

//@desc Delete bootcamp
//@route DELETE /api/v1/bootcamps/:id
//@access Public
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete Bootcamp ${req.params.id}` });
};
