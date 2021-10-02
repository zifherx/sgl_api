"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _api = _interopRequireDefault(require("../controllers/api.controller"));

var _roles = _interopRequireDefault(require("./roles.routes"));

var _user = _interopRequireDefault(require("./user.routes"));

var _auth = _interopRequireDefault(require("./auth.routes"));

var _customer = _interopRequireDefault(require("./customer.routes"));

var _lead = _interopRequireDefault(require("./lead.routes"));

var _seller = _interopRequireDefault(require("./seller.routes"));

var _chasis = _interopRequireDefault(require("./chasis.routes"));

var _marca = _interopRequireDefault(require("./marca.routes"));

var _modelo = _interopRequireDefault(require("./modelo.routes"));

var _vehicle = _interopRequireDefault(require("./vehicle.routes"));

var _sucursal = _interopRequireDefault(require("./sucursal.routes"));

var _conversion = _interopRequireDefault(require("./conversion.routes"));

var _compliance = _interopRequireDefault(require("./compliance.routes"));

var router = (0, _express.Router)();
router.get('/', _api["default"].getAll);
router.use('/roles', _roles["default"]);
router.use('/users', _user["default"]);
router.use('/auth', _auth["default"]);
router.use('/customers', _customer["default"]);
router.use('/leads', _lead["default"]);
router.use('/sellers', _seller["default"]);
router.use('/chasis', _chasis["default"]);
router.use('/brands', _marca["default"]);
router.use('/models', _modelo["default"]);
router.use('/sucursal', _sucursal["default"]);
router.use('/vehicles', _vehicle["default"]);
router.use('/conversion', _conversion["default"]);
router.use('/cumplimiento', _compliance["default"]);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=index.js.map