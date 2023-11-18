const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const userService = require("../services/userService")
const { hashPassword } = require("../utils/helpers");
const logger = require("../config/logger");

//@desc create a user
//@route POST /api/v1/users
//@access private/protected
const createUser = catchAsync(async (req, res) => {
    const user = req.body
    const hashPass = hashPassword(req.body.password);
    Object.assign(user, {password:hashPass})
    await userService.createUser(user)
    logger.info(`${user.fullName} - ${user.email} added`)
    res.status(201).json({
        statusCode: httpStatus.CREATED,
        successMessage: "user created successfully",
        errorMessage: null,
        data: null
    })
})

//@desc get all users
//@route GET /api/v1/users
//@access private/protected
const getUsers = catchAsync(async (req, res) => {
    const users = await userService.queryUsers()
    res.status(200).json({
        statusCode: httpStatus.OK,
        successMessage: "users fetched successfully",
        errorMessage: null,
        data: users
    });
});

//@desc get a user by id
//@route GET /api/v1/users/:id
//@access private/protected
const getUser = catchAsync(async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, `user not found`)
    res.status(200).json({
        statusCode: httpStatus.OK,
        successMessage: "user fetch success",
        errorMessage: null,
        data: user
    })
});

//@desc update user by id
//@route POST /api/v1/users/:id
//@access private/protected
const updateUser = catchAsync(async (req, res) => {
    const user = req.body
    const hashPass = hashPassword(req.body.password);
    Object.assign(user, {password:hashPass})
    // await userService.createUser(user)
    const updatedUser = await userService.updateUserById(req.params.id, user);
    logger.info(`${user.fullName} - ${user.email} details updated successfully`)
    res.status(200).json({
        statusCode: httpStatus.OK,
        successMessage: "user details updated successfully",
        errorMessage: null,
        data: updatedUser
    });
});

//@desc delete a user
//@route DELETE /api/v1/users/:id
//@access private/protected
const deleteUser = catchAsync(async (req, res) => {
    await userService.deleteUserById(req.params.id);
    logger.info(`${user.fullName} - ${user.email} deleted successfully`)
    res.status(200).json({
        statusCode: httpStatus.OK,
        successMessage: "user deleted",
        errorMessage: null,
        data: null
    });
});


module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
}