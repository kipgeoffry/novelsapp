const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const User = require("../models/users");
const logger  = require("../config/logger")

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @returns {Promise<boolean>}
 */
const isEmailTaken = async function (email, excludeUserId) {
  const user = await User.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Create a user
 * @param {Object} userBody //from req.body
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await isEmailTaken(userBody.email)) {
    logger.info(`User email ,${userBody.email} already exists`)
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  
  return User.create(userBody);
};

/**
 * Query for users
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async () => {
  const users = await User.find();
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (updateBody.email && (await isEmailTaken(updateBody.email, userId))) {  //another user cannot update their email to an email that alreay exists
    logger.info(`User email ,${updateBody.email} cannot be updated`)
    throw new ApiError(httpStatus.BAD_REQUEST,`email cannot be updated,email already exists`);
  }
  if (updateBody.email !== user.email) { //user not allowed to change email address
    logger.info(`user ${user.email} is not allowed to update email`)
    throw new ApiError(httpStatus.FORBIDDEN,`email update not allowed`);
  }

  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await user.deleteOne();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
