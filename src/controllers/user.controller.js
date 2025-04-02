import userService from "../services/user.service.js";

export const create = (req, res, next) => {
  try {
    return userService.create(req, res);
  } catch (error) {
    next(error);
  }
};

export const getUsers = (req, res) => {
  return userService.getUsers(req, res);
};

export const getUser =  (req, res) => {
  return userService.getUser(req, res);
};

export const update = (req, res) => {
  return userService.update(req, res);
};

export const deleteUser = (req, res) => {
  return userService.delete(req, res);
};