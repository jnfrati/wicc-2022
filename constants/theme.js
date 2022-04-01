/* eslint-disable */
const AntDColors = require("./colors");
const spacing = require("./spacing");

const { generate, ...colors } = AntDColors;
const { neutrals } = AntDColors;
const WICCPurple = generate("#552685");
const WICCBlue = generate("#3D31A4");

const theme = {
  colors: colors,
  spaces: spacing.spaces,
  default: {
    // Custom variables
    baseUnit: spacing.baseUnit,
    // Ant Design Variables
    primaryColor: colors.purple.primary,
    borderColorBase: neutrals[4],
    borderColorSplit: neutrals[3],
  },
};

/** Override Ant Design variables */
const modifiedVariables = {
  "@primary-color": theme.default.primaryColor,
  "@border-color-base": theme.default.borderColorBase,
  "@border-color-split": theme.default.borderColorSplit,
  "@border-radius-base": `${theme.default.baseUnit}px`,
  "@layout-body-background": "#cfd2ff",
  "@layout-footer-background": "transparent",
  "@layout-header-background": theme.colors.purple[9],
  "@layout-trigger-background": theme.colors.purple[8],
  "@menu-dark-bg": theme.colors.purple[8]
};

module.exports = { theme, modifiedVariables };
