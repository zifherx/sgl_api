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
router.get('/activos', _user["default"].getAllByStatus);
router.get('/count', _user["default"].getCountAll);
router.get('/:userId', _user["default"].getOneById);
router.post('/', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin, _middlewares.verifyDuplicate.checkUserDuplicate], _user["default"].createUser);
router.post('/count/online', _user["default"].getCountByOnline);
router.patch('/profile/:userId', [_middlewares.authJwt.verifyToken], _multer["default"].single('avatar'), _user["default"].updateProfile);
router.patch('/upload/:userId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _multer["default"].single('avatar'), _user["default"].uploadPhoto);
router.patch('/:userId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _user["default"].updateUser);
router["delete"]('/:userId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _user["default"].deleteUser);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=user.routes.js.map