"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.login = exports.getUserHistory = exports.addToHistory = void 0;
var _httpStatus = _interopRequireDefault(require("http-status"));
var _userModel = require("../models/user.model.js");
var _bcrypt = _interopRequireWildcard(require("bcrypt"));
var _crypto = _interopRequireDefault(require("crypto"));
var _meetingModel = require("../models/meeting.model.js");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const login = async (req, res) => {
  const {
    username,
    password
  } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "Please Provide"
    });
  }
  try {
    const user = await _userModel.User.findOne({
      username
    });
    if (!user) {
      return res.status(_httpStatus.default.NOT_FOUND).json({
        message: "User Not Found"
      });
    }
    let isPasswordCorrect = await _bcrypt.default.compare(password, user.password);
    if (isPasswordCorrect) {
      let token = _crypto.default.randomBytes(20).toString("hex");
      user.token = token;
      await user.save();
      return res.status(_httpStatus.default.OK).json({
        token: token
      });
    } else {
      return res.status(_httpStatus.default.UNAUTHORIZED).json({
        message: "Invalid Username or password"
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: `Something went wrong ${e}`
    });
  }
};
exports.login = login;
const register = async (req, res) => {
  const {
    name,
    username,
    password
  } = req.body;
  try {
    const existingUser = await _userModel.User.findOne({
      username
    });
    if (existingUser) {
      return res.status(_httpStatus.default.FOUND).json({
        message: "User already exists"
      });
    }
    const hashedPassword = await _bcrypt.default.hash(password, 10);
    const newUser = new _userModel.User({
      name: name,
      username: username,
      password: hashedPassword
    });
    await newUser.save();
    res.status(_httpStatus.default.CREATED).json({
      message: "User Registered"
    });
  } catch (e) {
    res.json({
      message: `Something went wrong ${e}`
    });
  }
};
exports.register = register;
const getUserHistory = async (req, res) => {
  const {
    token
  } = req.query;
  try {
    const user = await _userModel.User.findOne({
      token: token
    });
    const meetings = await _meetingModel.Meeting.find({
      user_id: user.username
    });
    res.json(meetings);
  } catch (e) {
    res.json({
      message: `Something went wrong ${e}`
    });
  }
};
exports.getUserHistory = getUserHistory;
const addToHistory = async (req, res) => {
  const {
    token,
    meeting_code
  } = req.body;
  try {
    const user = await _userModel.User.findOne({
      token: token
    });
    const newMeeting = new _meetingModel.Meeting({
      user_id: user.username,
      meetingCode: meeting_code
    });
    await newMeeting.save();
    res.status(_httpStatus.default.CREATED).json({
      message: "Added code to history"
    });
  } catch (e) {
    res.json({
      message: `Something went wrong ${e}`
    });
  }
};
exports.addToHistory = addToHistory;