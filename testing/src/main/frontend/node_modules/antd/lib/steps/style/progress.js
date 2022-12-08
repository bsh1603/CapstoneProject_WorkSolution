"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var genStepsProgressStyle = function genStepsProgressStyle(token) {
  var _ref5;
  var antCls = token.antCls,
    componentCls = token.componentCls;
  return (0, _defineProperty2["default"])({}, "&" + componentCls + "-with-progress", (_ref5 = {}, (0, _defineProperty2["default"])(_ref5, componentCls + "-item", (0, _defineProperty2["default"])({
    paddingTop: token.paddingXXS
  }, "&-process " + componentCls + "-item-container " + componentCls + "-item-icon " + componentCls + "-icon", {
    color: token.processIconColor
  })), (0, _defineProperty2["default"])(_ref5, "&" + componentCls + "-vertical > " + componentCls + "-item > " + componentCls + "-item-container > " + componentCls + "-item-tail", {
    top: token.marginXXS
  }), (0, _defineProperty2["default"])(_ref5, "&" + componentCls + "-horizontal", (0, _defineProperty2["default"])({}, componentCls + "-item:first-child", {
    paddingBottom: token.paddingXXS,
    paddingInlineStart: token.paddingXXS
  })), (0, _defineProperty2["default"])(_ref5, "&" + componentCls + "-label-vertical", (0, _defineProperty2["default"])({}, componentCls + "-item " + componentCls + "-item-tail", {
    top: token.margin - 2 * token.lineWidth
  })), (0, _defineProperty2["default"])(_ref5, componentCls + "-item-icon", (0, _defineProperty2["default"])({
    position: 'relative'
  }, antCls + "-progress", {
    position: 'absolute',
    insetBlockStart: (token.stepsIconSize - token.stepsProgressSize - token.lineWidth * 2) / 2,
    insetInlineStart: (token.stepsIconSize - token.stepsProgressSize - token.lineWidth * 2) / 2
  })), _ref5));
};
var _default = genStepsProgressStyle;
exports["default"] = _default;