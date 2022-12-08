import type * as React from 'react';
import type { ComponentToken as AlertComponentToken } from '../alert/style';
import type { ComponentToken as AnchorComponentToken } from '../anchor/style';
import type { ComponentToken as AvatarComponentToken } from '../avatar/style';
import type { ComponentToken as BackTopComponentToken } from '../back-top/style';
import type { ComponentToken as ButtonComponentToken } from '../button/style';
import type { ComponentToken as FloatButtonComponentToken } from '../float-button/style';
import type { ComponentToken as CalendarComponentToken } from '../calendar/style';
import type { ComponentToken as CardComponentToken } from '../card/style';
import type { ComponentToken as CarouselComponentToken } from '../carousel/style';
import type { ComponentToken as CascaderComponentToken } from '../cascader/style';
import type { ComponentToken as CheckboxComponentToken } from '../checkbox/style';
import type { ComponentToken as CollapseComponentToken } from '../collapse/style';
import type { ComponentToken as DatePickerComponentToken } from '../date-picker/style';
import type { ComponentToken as DividerComponentToken } from '../divider/style';
import type { ComponentToken as DropdownComponentToken } from '../dropdown/style';
import type { ComponentToken as DrawerComponentToken } from '../drawer/style';
import type { ComponentToken as EmptyComponentToken } from '../empty/style';
import type { ComponentToken as ImageComponentToken } from '../image/style';
import type { ComponentToken as InputNumberComponentToken } from '../input-number/style';
import type { ComponentToken as LayoutComponentToken } from '../layout/style';
import type { ComponentToken as ListComponentToken } from '../list/style';
import type { ComponentToken as MentionsComponentToken } from '../mentions/style';
import type { ComponentToken as MenuComponentToken } from '../menu/style';
import type { ComponentToken as MessageComponentToken } from '../message/style';
import type { ComponentToken as ModalComponentToken } from '../modal/style';
import type { ComponentToken as NotificationComponentToken } from '../notification/style';
import type { ComponentToken as PopconfirmComponentToken } from '../popconfirm/style';
import type { ComponentToken as PopoverComponentToken } from '../popover/style';
import type { ComponentToken as ProgressComponentToken } from '../progress/style';
import type { ComponentToken as RadioComponentToken } from '../radio/style';
import type { ComponentToken as RateComponentToken } from '../rate/style';
import type { ComponentToken as ResultComponentToken } from '../result/style';
import type { ComponentToken as SegmentedComponentToken } from '../segmented/style';
import type { ComponentToken as SelectComponentToken } from '../select/style';
import type { ComponentToken as SkeletonComponentToken } from '../skeleton/style';
import type { ComponentToken as SliderComponentToken } from '../slider/style';
import type { ComponentToken as SpaceComponentToken } from '../space/style';
import type { ComponentToken as SpinComponentToken } from '../spin/style';
import type { ComponentToken as StepsComponentToken } from '../steps/style';
import type { ComponentToken as TableComponentToken } from '../table/style';
import type { ComponentToken as TabsComponentToken } from '../tabs/style';
import type { ComponentToken as TagComponentToken } from '../tag/style';
import type { ComponentToken as TimelineComponentToken } from '../timeline/style';
import type { ComponentToken as TooltipComponentToken } from '../tooltip/style';
import type { ComponentToken as TransferComponentToken } from '../transfer/style';
import type { ComponentToken as TypographyComponentToken } from '../typography/style';
import type { ComponentToken as UploadComponentToken } from '../upload/style';
import type { ComponentToken as TourComponentToken } from '../tour/style';
export declare const PresetColors: readonly ["blue", "purple", "cyan", "green", "magenta", "pink", "red", "orange", "yellow", "volcano", "geekblue", "lime", "gold"];
type PresetColorKey = typeof PresetColors[number];
export type PresetColorType = Record<PresetColorKey, string>;
type ColorPaletteKeyIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type ColorPalettes = {
    [key in `${keyof PresetColorType}-${ColorPaletteKeyIndex}`]: string;
};
export interface ComponentTokenMap {
    Affix?: {};
    Alert?: AlertComponentToken;
    Anchor?: AnchorComponentToken;
    Avatar?: AvatarComponentToken;
    BackTop?: BackTopComponentToken;
    Badge?: {};
    Button?: ButtonComponentToken;
    Breadcrumb?: {};
    Card?: CardComponentToken;
    Carousel?: CarouselComponentToken;
    Cascader?: CascaderComponentToken;
    Checkbox?: CheckboxComponentToken;
    Collapse?: CollapseComponentToken;
    DatePicker?: DatePickerComponentToken;
    Descriptions?: {};
    Divider?: DividerComponentToken;
    Drawer?: DrawerComponentToken;
    Dropdown?: DropdownComponentToken;
    Empty?: EmptyComponentToken;
    FloatButton?: FloatButtonComponentToken;
    Form?: {};
    Grid?: {};
    Image?: ImageComponentToken;
    Input?: {};
    InputNumber?: InputNumberComponentToken;
    Layout?: LayoutComponentToken;
    List?: ListComponentToken;
    Mentions?: MentionsComponentToken;
    Notification?: NotificationComponentToken;
    Pagination?: {};
    Popover?: PopoverComponentToken;
    Popconfirm?: PopconfirmComponentToken;
    Rate?: RateComponentToken;
    Radio?: RadioComponentToken;
    Result?: ResultComponentToken;
    Segmented?: SegmentedComponentToken;
    Select?: SelectComponentToken;
    Skeleton?: SkeletonComponentToken;
    Slider?: SliderComponentToken;
    Spin?: SpinComponentToken;
    Statistic?: {};
    Switch?: {};
    Tag?: TagComponentToken;
    Tree?: {};
    TreeSelect?: {};
    Typography?: TypographyComponentToken;
    Timeline?: TimelineComponentToken;
    Transfer?: TransferComponentToken;
    Tabs?: TabsComponentToken;
    Calendar?: CalendarComponentToken;
    Steps?: StepsComponentToken;
    Menu?: MenuComponentToken;
    Modal?: ModalComponentToken;
    Message?: MessageComponentToken;
    Upload?: UploadComponentToken;
    Tooltip?: TooltipComponentToken;
    Table?: TableComponentToken;
    Space?: SpaceComponentToken;
    Progress?: ProgressComponentToken;
    Tour?: TourComponentToken;
}
export type OverrideToken = {
    [key in keyof ComponentTokenMap]: Partial<ComponentTokenMap[key]> & Partial<AliasToken>;
};
/** Final token which contains the components level override */
export type GlobalToken = AliasToken & ComponentTokenMap;
export interface SeedToken extends PresetColorType {
    /**
     * @desc 品牌主色
     */
    colorPrimary: string;
    /**
     * @desc 成功色
     */
    colorSuccess: string;
    /**
     * @desc 警戒色
     */
    colorWarning: string;
    /**
     * @desc 错误色
     */
    colorError: string;
    /**
     * @desc 信息色
     */
    colorInfo: string;
    /**
     * @desc 基础文本色
     */
    colorTextBase: string;
    /**
     * Base component background color. Will derivative container background color with this
     * @desc 基础背景色
     */
    colorBgBase: string;
    /**
     * @desc 字体
     */
    fontFamily: string;
    /**
     * @desc 基础字号
     */
    fontSize: number;
    /**
     * Border width of base components
     * @desc 基础线宽
     */
    lineWidth: number;
    /**
     * @desc 线条样式
     */
    lineType: string;
    /**
     * @desc 动画时长变化单位
     */
    motionUnit: number;
    /**
     * @desc 动画基础时长
     */
    motionBase: number;
    /**
     * @desc
     */
    motionEaseOutCirc: string;
    /**
     * @desc
     */
    motionEaseInOutCirc: string;
    /**
     * @desc
     */
    motionEaseInOut: string;
    /**
     * @desc
     */
    motionEaseOutBack: string;
    /**
     * @desc
     */
    motionEaseInBack: string;
    /**
     * @desc
     */
    motionEaseInQuint: string;
    /**
     * @desc
     */
    motionEaseOutQuint: string;
    /**
     * @desc
     */
    motionEaseOut: string;
    /**
     * @desc 基础圆角
     * @descEn Base border radius
     */
    borderRadius: number;
    /**
     * @desc 尺寸变化单位
     */
    sizeUnit: number;
    /**
     * @desc 尺寸基础大小
     */
    sizeStep: number;
    /**
     * @desc 组件箭头尺寸
     */
    sizePopupArrow: number;
    /**
     * @desc
     */
    controlHeight: number;
    /**
     * @desc 基础 zIndex
     * @descEn Base popup component zIndex
     */
    zIndexBase: number;
    /**  */
    /**
     * @desc 浮层基础 zIndex
     * @descEn Base zIndex of component like FloatButton, Affix which can be cover by large popup
     */
    zIndexPopupBase: number;
    /**
     * @desc 成功色
     * @descEn Define default Image opacity. Useful when in dark-like theme
     */
    opacityImage: number;
    /**
     * @desc 线框化
     */
    wireframe: boolean;
}
export interface NeutralColorMapToken {
    /**
     * @desc 一级文本色
     */
    colorText: string;
    /**
     * @desc 二级文本色
     */
    colorTextSecondary: string;
    /**
     * @desc 三级文本色
     */
    colorTextTertiary: string;
    /**
     * @desc 四级文本色
     */
    colorTextQuaternary: string;
    /**
     * @desc 一级填充色
     */
    colorFill: string;
    /**
     * @desc 二级填充色
     */
    colorFillSecondary: string;
    /**
     * @desc 三级填充色
     */
    colorFillTertiary: string;
    /**
     * @desc 四级填充色
     */
    colorFillQuaternary: string;
    /**
     * @desc 组件容器背景色
     */
    colorBgContainer: string;
    /**
     * @desc 浮层容器背景色
     */
    colorBgElevated: string;
    /**
     * @desc 布局背景色
     */
    colorBgLayout: string;
    /**
     * @desc
     */
    colorBgSpotlight: string;
    /**
     * @desc 一级边框色
     */
    colorBorder: string;
    /**
     * @desc 二级边框色
     */
    colorBorderSecondary: string;
}
export interface ColorMapToken extends NeutralColorMapToken {
    /**
     * @desc 主色的浅色背景颜色
     */
    colorPrimaryBg: string;
    /**
     * @desc 主色的浅色背景色悬浮态
     */
    colorPrimaryBgHover: string;
    /**
     * @desc 主色的描边色
     */
    colorPrimaryBorder: string;
    /**
     * @desc 主色的描边色悬浮态
     */
    colorPrimaryBorderHover: string;
    /**
     * @desc 主色的深色悬浮态
     */
    colorPrimaryHover: string;
    /**
     * @desc 品牌主色
     */
    colorPrimary: string;
    /**
     * @desc 主色的深色激活态
     */
    colorPrimaryActive: string;
    /**
     * @desc 主色的文本悬浮态
     */
    colorPrimaryTextHover: string;
    /**
     * @desc 主色的文本默认态
     */
    colorPrimaryText: string;
    /**
     * @desc 主色的文本激活态
     */
    colorPrimaryTextActive: string;
    /**
     * @desc 成功色的浅色背景颜色
     */
    colorSuccessBg: string;
    /**
     * @desc 成功色的浅色背景色悬浮态
     */
    colorSuccessBgHover: string;
    /**
     * @desc 成功色的描边色
     */
    colorSuccessBorder: string;
    /**
     * @desc 成功色的描边色悬浮态
     */
    colorSuccessBorderHover: string;
    /**
     * @desc 成功色的深色悬浮态
     */
    colorSuccessHover: string;
    /**
     * @desc 成功色
     */
    colorSuccess: string;
    /**
     * @desc 成功色的深色激活态
     */
    colorSuccessActive: string;
    /**
     * @desc 成功色的文本悬浮态
     */
    colorSuccessTextHover: string;
    /**
     * @desc 成功色的文本默认态
     */
    colorSuccessText: string;
    /**
     * @desc 成功色的文本激活态
     */
    colorSuccessTextActive: string;
    /**
     * @desc 警戒色的浅色背景颜色
     */
    colorWarningBg: string;
    /**
     * @desc 警戒色的浅色背景色悬浮态
     */
    colorWarningBgHover: string;
    /**
     * @desc 警戒色的描边色
     */
    colorWarningBorder: string;
    /**
     * @desc 警戒色的描边色悬浮态
     */
    colorWarningBorderHover: string;
    /**
     * @desc 警戒色的深色悬浮态
     */
    colorWarningHover: string;
    /**
     * @desc 警戒色
     */
    colorWarning: string;
    /**
     * @desc 警戒色的深色激活态
     */
    colorWarningActive: string;
    /**
     * @desc 警戒色的文本悬浮态
     */
    colorWarningTextHover: string;
    /**
     * @desc 警戒色的文本默认态
     */
    colorWarningText: string;
    /**
     * @desc 警戒色的文本激活态
     */
    colorWarningTextActive: string;
    /**
     * @desc 错误色的浅色背景颜色
     */
    colorErrorBg: string;
    /**
     * @desc 错误色的浅色背景色悬浮态
     */
    colorErrorBgHover: string;
    /**
     * @desc 错误色的描边色
     */
    colorErrorBorder: string;
    /**
     * @desc 错误色的描边色悬浮态
     */
    colorErrorBorderHover: string;
    /**
     * @desc 错误色的深色悬浮态
     */
    colorErrorHover: string;
    /**
     * @desc 错误色
     */
    colorError: string;
    /**
     * @desc 错误色的深色激活态
     */
    colorErrorActive: string;
    /**
     * @desc 错误色的文本悬浮态
     */
    colorErrorTextHover: string;
    /**
     * @desc 错误色的文本默认态
     */
    colorErrorText: string;
    /**
     * @desc 错误色的文本激活态
     */
    colorErrorTextActive: string;
    /**
     * @desc 信息色的浅色背景颜色
     */
    colorInfoBg: string;
    /**
     * @desc 信息色的浅色背景色悬浮态
     */
    colorInfoBgHover: string;
    /**
     * @desc 信息色的描边色
     */
    colorInfoBorder: string;
    /**
     * @desc 信息色的描边色悬浮态
     */
    colorInfoBorderHover: string;
    /**
     * @desc 信息色的深色悬浮态
     */
    colorInfoHover: string;
    /**
     * @desc 信息色
     */
    colorInfo: string;
    /**
     * @desc 信息色的深色激活态
     */
    colorInfoActive: string;
    /**
     * @desc 信息色的文本悬浮态
     */
    colorInfoTextHover: string;
    /**
     * @desc 信息色的文本默认态
     */
    colorInfoText: string;
    /**
     * @desc 信息色的文本激活态
     */
    colorInfoTextActive: string;
    /**
     * @desc 浮层的背景蒙层颜色
     */
    colorBgMask: string;
    colorWhite: string;
}
export interface SizeMapToken {
    sizeXXL: number;
    sizeXL: number;
    sizeLG: number;
    sizeMD: number;
    /** Same as size by default, but could be larger in compact mode */
    sizeMS: number;
    size: number;
    sizeSM: number;
    sizeXS: number;
    sizeXXS: number;
}
export interface HeightMapToken {
    /** @private Only Used for control inside component like Multiple Select inner selection item */
    controlHeightXS: number;
    controlHeightSM: number;
    controlHeightLG: number;
}
export interface CommonMapToken {
    lineWidthBold: number;
    motionDurationFast: string;
    motionDurationMid: string;
    motionDurationSlow: string;
    borderRadiusXS: number;
    borderRadiusSM: number;
    borderRadiusLG: number;
    borderRadiusOuter: number;
}
export interface MapToken extends SeedToken, ColorPalettes, ColorMapToken, SizeMapToken, HeightMapToken, CommonMapToken {
}
export interface AliasToken extends MapToken {
    colorFillContentHover: string;
    colorFillAlter: string;
    colorBgContainerDisabled: string;
    colorFillContent: string;
    colorBorderBg: string;
    colorSplit: string;
    colorTextPlaceholder: string;
    colorTextDisabled: string;
    colorTextHeading: string;
    colorTextLabel: string;
    colorTextDescription: string;
    colorTextLightSolid: string;
    colorBgTextHover: string;
    colorBgTextActive: string;
    /** Weak action. Such as `allowClear` or Alert close button */
    colorIcon: string;
    /** Weak action hover color. Such as `allowClear` or Alert close button */
    colorIconHover: string;
    colorLink: string;
    colorLinkHover: string;
    colorLinkActive: string;
    colorHighlight: string;
    controlOutline: string;
    colorWarningOutline: string;
    colorErrorOutline: string;
    fontSizeSM: number;
    fontSize: number;
    fontSizeLG: number;
    fontSizeXL: number;
    /** Operation icon in Select, Cascader, etc. icon fontSize. Normal is same as fontSizeSM */
    fontSizeIcon: number;
    fontSizeHeading1: number;
    fontSizeHeading2: number;
    fontSizeHeading3: number;
    fontSizeHeading4: number;
    fontSizeHeading5: number;
    /** For heading like h1, h2, h3 or option selected item */
    fontWeightStrong: number;
    lineHeight: number;
    lineHeightLG: number;
    lineHeightSM: number;
    lineHeightHeading1: number;
    lineHeightHeading2: number;
    lineHeightHeading3: number;
    lineHeightHeading4: number;
    lineHeightHeading5: number;
    controlOutlineWidth: number;
    controlItemBgHover: string;
    controlItemBgActive: string;
    controlItemBgActiveHover: string;
    controlInteractiveSize: number;
    controlItemBgActiveDisabled: string;
    paddingXXS: number;
    paddingXS: number;
    paddingSM: number;
    padding: number;
    paddingMD: number;
    paddingLG: number;
    paddingXL: number;
    paddingContentHorizontalLG: number;
    paddingContentHorizontal: number;
    paddingContentHorizontalSM: number;
    paddingContentVerticalLG: number;
    paddingContentVertical: number;
    paddingContentVerticalSM: number;
    marginXXS: number;
    marginXS: number;
    marginSM: number;
    margin: number;
    marginMD: number;
    marginLG: number;
    marginXL: number;
    marginXXL: number;
    opacityLoading: number;
    boxShadow: string;
    boxShadowSecondary: string;
    linkDecoration: React.CSSProperties['textDecoration'];
    linkHoverDecoration: React.CSSProperties['textDecoration'];
    linkFocusDecoration: React.CSSProperties['textDecoration'];
    controlPaddingHorizontal: number;
    controlPaddingHorizontalSM: number;
    screenXS: number;
    screenXSMin: number;
    screenXSMax: number;
    screenSM: number;
    screenSMMin: number;
    screenSMMax: number;
    screenMD: number;
    screenMDMin: number;
    screenMDMax: number;
    screenLG: number;
    screenLGMin: number;
    screenLGMax: number;
    screenXL: number;
    screenXLMin: number;
    screenXLMax: number;
    screenXXL: number;
    screenXXLMin: number;
    screenXXLMax: number;
    /** Used for DefaultButton, Switch which has default outline */
    controlTmpOutline: string;
}
export {};
