"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _extends4 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _cssinjs = require("@ant-design/cssinjs");
var _internal = require("../../theme/internal");
var _fade = require("../../style/motion/fade");
var _style = require("../../style");
// ============================== Group ==============================
var floatButtonGroupStyle = function floatButtonGroupStyle(token) {
  var _extends2, _ref5, _ref8;
  var componentCls = token.componentCls,
    floatButtonSize = token.floatButtonSize,
    margin = token.margin,
    borderRadius = token.borderRadius,
    motionDurationSlow = token.motionDurationSlow;
  var groupPrefixCls = componentCls + "-group";
  var moveDownIn = new _cssinjs.Keyframes('antFloatButtonMoveDownIn', {
    '0%': {
      transform: "translate3d(0, " + floatButtonSize + "px, 0)",
      transformOrigin: '0 0',
      opacity: 0
    },
    '100%': {
      transform: 'translate3d(0, 0, 0)',
      transformOrigin: '0 0',
      opacity: 1
    }
  });
  var moveDownOut = new _cssinjs.Keyframes('antFloatButtonMoveDownOut', {
    '0%': {
      transform: 'translate3d(0, 0, 0)',
      transformOrigin: '0 0',
      opacity: 1
    },
    '100%': {
      transform: "translate3d(0, " + floatButtonSize + "px, 0)",
      transformOrigin: '0 0',
      opacity: 0
    }
  });
  return _ref8 = {}, (0, _defineProperty2["default"])(_ref8, groupPrefixCls, (0, _extends4["default"])((0, _extends4["default"])({}, (0, _style.resetComponent)(token)), (_extends2 = {
    zIndex: 99,
    display: 'block',
    border: 'none',
    position: 'fixed',
    width: floatButtonSize,
    height: 'auto',
    boxShadow: 'none',
    minHeight: floatButtonSize,
    insetInlineEnd: token.floatButtonInsetInlineEnd,
    insetBlockEnd: token.floatButtonInsetBlockEnd,
    borderRadius: token.borderRadius
  }, (0, _defineProperty2["default"])(_extends2, groupPrefixCls + "-wrap", {
    zIndex: -1,
    display: 'block',
    position: 'relative',
    marginBottom: margin
  }), (0, _defineProperty2["default"])(_extends2, '&&-rtl', {
    direction: 'rtl'
  }), (0, _defineProperty2["default"])(_extends2, componentCls, {
    position: 'static'
  }), _extends2))), (0, _defineProperty2["default"])(_ref8, groupPrefixCls + "-circle", (0, _defineProperty2["default"])({}, componentCls + "-circle:not(:last-child)", (0, _defineProperty2["default"])({
    marginBottom: token.margin
  }, componentCls + "-body", {
    width: floatButtonSize,
    height: floatButtonSize
  }))), (0, _defineProperty2["default"])(_ref8, groupPrefixCls + "-square", (_ref5 = {}, (0, _defineProperty2["default"])(_ref5, componentCls + "-square", {
    borderRadius: 0,
    padding: 0,
    '&:first-child': {
      borderStartStartRadius: borderRadius,
      borderStartEndRadius: borderRadius
    },
    '&:last-child': {
      borderEndStartRadius: borderRadius,
      borderEndEndRadius: borderRadius
    },
    '&:not(:last-child)': {
      borderBottom: token.lineWidth + "px " + token.lineType + " " + token.colorSplit
    }
  }), (0, _defineProperty2["default"])(_ref5, groupPrefixCls + "-wrap", (0, _defineProperty2["default"])({
    display: 'block',
    borderRadius: borderRadius,
    boxShadow: token.boxShadowSecondary,
    overflow: 'hidden'
  }, componentCls + "-square", (0, _defineProperty2["default"])({
    boxShadow: 'none',
    marginTop: 0,
    borderRadius: 0,
    padding: token.paddingXXS,
    '&:first-child': {
      borderStartStartRadius: borderRadius,
      borderStartEndRadius: borderRadius
    },
    '&:last-child': {
      borderEndStartRadius: borderRadius,
      borderEndEndRadius: borderRadius
    },
    '&:not(:last-child)': {
      borderBottom: token.lineWidth + "px " + token.lineType + " " + token.colorSplit
    }
  }, componentCls + "-body", {
    width: floatButtonSize - token.paddingXXS * 2,
    height: floatButtonSize - token.paddingXXS * 2
  }))), _ref5)), (0, _defineProperty2["default"])(_ref8, groupPrefixCls + "-wrap-enter," + groupPrefixCls + "-wrap-enter-active", {
    animationName: moveDownIn,
    animationDuration: motionDurationSlow
  }), (0, _defineProperty2["default"])(_ref8, groupPrefixCls + "-wrap-leave", {
    animationName: moveDownOut,
    animationDuration: motionDurationSlow
  }), (0, _defineProperty2["default"])(_ref8, groupPrefixCls + "-circle-shadow", {
    boxShadow: 'none'
  }), (0, _defineProperty2["default"])(_ref8, groupPrefixCls + "-square-shadow", (0, _defineProperty2["default"])({
    boxShadow: token.boxShadowSecondary
  }, componentCls + "-square", (0, _defineProperty2["default"])({
    boxShadow: 'none',
    padding: token.paddingXXS
  }, componentCls + "-body", {
    width: floatButtonSize - token.paddingXXS * 2,
    height: floatButtonSize - token.paddingXXS * 2
  }))), _ref8;
};
// ============================== Shared ==============================
var sharedFloatButtonStyle = function sharedFloatButtonStyle(token) {
  var _ref13, _ref16, _ref19;
  var componentCls = token.componentCls,
    floatButtonIconSize = token.floatButtonIconSize,
    floatButtonSize = token.floatButtonSize;
  return _ref19 = {}, (0, _defineProperty2["default"])(_ref19, componentCls, (0, _extends4["default"])((0, _extends4["default"])({}, (0, _style.resetComponent)(token)), (0, _defineProperty2["default"])({
    border: 'none',
    position: 'fixed',
    cursor: 'pointer',
    overflow: 'hidden',
    zIndex: 99,
    display: 'block',
    justifyContent: 'center',
    alignItems: 'center',
    width: floatButtonSize,
    height: floatButtonSize,
    insetInlineEnd: token.floatButtonInsetInlineEnd,
    insetBlockEnd: token.floatButtonInsetBlockEnd,
    boxShadow: token.boxShadowSecondary,
    // Pure Panel
    '&-pure': {
      position: 'relative',
      inset: 'auto'
    },
    '&:empty': {
      display: 'none'
    }
  }, componentCls + "-body", (0, _defineProperty2["default"])({
    width: floatButtonSize,
    height: floatButtonSize,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: "all " + token.motionDurationMid
  }, componentCls + "-content", (0, _defineProperty2["default"])({
    overflow: 'hidden',
    textAlign: 'center',
    minHeight: floatButtonSize,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: "2px 4px"
  }, componentCls + "-icon", {
    textAlign: 'center',
    margin: 'auto',
    width: floatButtonIconSize,
    fontSize: floatButtonIconSize,
    lineHeight: 1
  }))))), (0, _defineProperty2["default"])(_ref19, componentCls + "-circle", (0, _defineProperty2["default"])({
    height: floatButtonSize,
    borderRadius: '50%'
  }, componentCls + "-body", {
    borderRadius: '50%'
  })), (0, _defineProperty2["default"])(_ref19, componentCls + "-square", (0, _defineProperty2["default"])({
    height: 'auto',
    minHeight: floatButtonSize,
    borderRadius: token.borderRadius
  }, componentCls + "-body", {
    height: 'auto',
    borderRadius: token.borderRadiusSM
  })), (0, _defineProperty2["default"])(_ref19, componentCls + "-default", (0, _defineProperty2["default"])({
    backgroundColor: token.floatButtonBackgroundColor,
    transition: "background-color " + token.motionDurationMid
  }, componentCls + "-body", (0, _defineProperty2["default"])({
    backgroundColor: token.floatButtonBackgroundColor,
    transition: "background-color " + token.motionDurationMid,
    '&:hover': {
      backgroundColor: token.colorFillContent
    }
  }, componentCls + "-content", (_ref13 = {}, (0, _defineProperty2["default"])(_ref13, componentCls + "-icon", {
    color: token.colorText
  }), (0, _defineProperty2["default"])(_ref13, componentCls + "-description", {
    display: 'flex',
    alignItems: 'center',
    lineHeight: token.fontSizeLG + "px",
    color: token.colorText,
    fontSize: token.fontSizeSM
  }), _ref13)))), (0, _defineProperty2["default"])(_ref19, componentCls + "-primary", (0, _defineProperty2["default"])({
    backgroundColor: token.colorPrimary
  }, componentCls + "-body", (0, _defineProperty2["default"])({
    backgroundColor: token.colorPrimary,
    transition: "background-color " + token.motionDurationMid,
    '&:hover': {
      backgroundColor: token.colorPrimaryHover
    }
  }, componentCls + "-content", (_ref16 = {}, (0, _defineProperty2["default"])(_ref16, componentCls + "-icon", {
    color: token.colorTextLightSolid
  }), (0, _defineProperty2["default"])(_ref16, componentCls + "-description", {
    display: 'flex',
    alignItems: 'center',
    lineHeight: token.fontSizeLG + "px",
    color: token.colorTextLightSolid,
    fontSize: token.fontSizeSM
  }), _ref16)))), _ref19;
};
// ============================== Export ==============================
var _default = (0, _internal.genComponentStyleHook)('FloatButton', function (token) {
  var colorTextLightSolid = token.colorTextLightSolid,
    colorBgElevated = token.colorBgElevated,
    controlHeightLG = token.controlHeightLG,
    marginXXL = token.marginXXL,
    marginLG = token.marginLG,
    fontSize = token.fontSize,
    fontSizeIcon = token.fontSizeIcon,
    controlItemBgHover = token.controlItemBgHover;
  var floatButtonToken = (0, _internal.mergeToken)(token, {
    floatButtonBackgroundColor: colorBgElevated,
    floatButtonColor: colorTextLightSolid,
    floatButtonHoverBackgroundColor: controlItemBgHover,
    floatButtonFontSize: fontSize,
    floatButtonIconSize: fontSizeIcon * 1.5,
    floatButtonSize: controlHeightLG,
    floatButtonInsetBlockEnd: marginXXL,
    floatButtonInsetInlineEnd: marginLG
  });
  return [floatButtonGroupStyle(floatButtonToken), sharedFloatButtonStyle(floatButtonToken), (0, _fade.initFadeMotion)(token)];
});
exports["default"] = _default;