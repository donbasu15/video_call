"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _userController = require("../controllers/user.controller.js");
const router = (0, _express.Router)();
router.route("/login").post(_userController.login);
router.route("/register").post(_userController.register);
router.route("/add_to_activity").post(_userController.addToHistory);
router.route("/get_all_activity").get(_userController.getUserHistory);
var _default = exports.default = router;