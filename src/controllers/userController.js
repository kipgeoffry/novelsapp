const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const userService = require("../services/userService")

//@desc create a user
//@route POST /api/v1/users
//@access private/protected
const createUser = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body)
    res.status(201).json({
        statusCode: httpStatus.CREATED,
        successMessage: "user created successfully",
        errorMessage: null,
        data: user
    })
})

//@desc get all users
//@route GET /api/v1/users
//@access private/protected
const getUsers = catchAsync(async (req, res) => {
    const users = await usersService.queryUsers()
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
    const user = await userService.updateUserById(req.params.id, req.body);
    res.status(200).json({
        statusCode: httpStatus.OK,
        successMessage: "user details updated successfully",
        errorMessage: null,
        data: user
    });
});

//@desc delete a user
//@route DELETE DELETE /api/v1/users/:id
//@access private/protected
const deleteUser = catchAsync(async (req, res) => {
    await userService.deleteUserById(req.params.id);
    res.status(204).json({
        statusCode: httpStatus.NO_CONTENT,
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