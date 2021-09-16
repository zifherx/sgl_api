"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = _interopRequireDefault(require("../controllers/user.controller"));

var _middlewares = require("../middlewares");

var _multer = _interopRequireDefault(require("../middlewares/multer"));

var router = (0, _express.Router)();
router.get('/', _user["default"].getAll);
router.get('/count', _user["default"].getCountAll);
router.get('/:userId', _user["default"].getOne);
router.post('/', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin, _middlewares.verifyDuplicate.checkUserDuplicate], _user["default"].createUser);
router.post('/count-status', _user["default"].getCountByStatus);
router.post('/count-online', _user["default"].getCountByOnline);
router.patch('/update-profile', _multer["default"].single('image'), [_middlewares.authJwt.verifyToken], _user["default"].updateProfile);
router.patch('/:userId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _user["default"].updateUser);
router["delete"]('/:userId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _user["default"].deleteUser);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=user.routes.js.map