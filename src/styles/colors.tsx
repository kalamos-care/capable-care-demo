export const BLACK = "black";
export const BUTTON_CHOICE_BLUE = "buttonChoiceBlue";
export const CANARY = "canary";
export const CANARY_DARK = "canaryDark";
export const CANARY_LIGHT = "canaryLight";
export const DARK_BLUE = "darkBlue";
export const DARK_GREY = "darkGrey";
export const DARK_LAPIS = "darkLapis";
export const DARK_SPRING = "darkSpring";
export const DISABLED_GREY = "disabledGrey";
export const INDIGO = "indigo";
export const INDIGO_DARK = "indigoDark";
export const INDIGO_LIGHT = "indigoLight";
export const INNER_BORDER = "innerBorder";
export const LAPIS = "lapis";
export const LAPIS_ACCENT = "lapisAccent";
export const LIGHT_GREY_1 = "lightGrey1";
export const LIGHT_GREY_2 = "lightGrey2";
export const LIGHT_GREY_3 = "lightGrey3";
export const LIGHT_GREY_4 = "lightGrey4";
export const LIGHT_GREY_5 = "lightGrey5";
export const LIGHT_GREY_6 = "lightGrey6";
export const LIGHT_LAPIS = "lightLapis";
export const LIGHT_SPRING = "lightSpring";
export const RUBY = "ruby";
export const RUBY_DARK = "rubyDark";
export const RUBY_LIGHT = "rubyLight";
export const SPRING = "spring";
export const SWITCH_GREEN_1 = "switchGreen1";
export const SWITCH_GREEN_2 = "switchGreen2";
export const AVATAR_BLUE = "avatarBlue";
export const APPROVED_GREEN = "approvedGreen";
export const SWITCH_THUMB = "switchThumb";
export const SWITCH_THUMB_DISABLED = "switchThumbDisabled";
export const SWITCH_THUMB_DISABLED_CHECKED = "switchThumbDisabledChecked";
export const SWITCH_TRACK = "switchTrack";
export const TABLE_HOVER = "tableHover";
export const WHITE = "white";

export const colors = {
  [BLACK]: "#000",
  [CANARY]: "#F8BE39",
  [CANARY_DARK]: "#c18e00",
  [CANARY_LIGHT]: "#fff06c",
  [DARK_BLUE]: "#1B2348",
  [DARK_GREY]: "#40404F",
  [DARK_LAPIS]: "#000096",
  [DARK_SPRING]: "#3bb874",
  [INDIGO]: "#0000BD",
  [INDIGO_DARK]: "#00008b",
  [INDIGO_LIGHT]: "#5f38f1",
  [INNER_BORDER]: "#E5E5E5",
  [LAPIS]: "#0e00c8",
  [LAPIS_ACCENT]: "#0000C80D",
  [LIGHT_GREY_1]: "#CBCBCB1A",
  [LIGHT_GREY_2]: "#CBCBCB",
  [LIGHT_GREY_3]: "#E5E5E5",
  [LIGHT_GREY_4]: "#e0e0e0",
  [LIGHT_GREY_5]: "#C4C4C4",
  [LIGHT_GREY_6]: "#f5f5f5",
  [DISABLED_GREY]: "#939395",
  [LIGHT_LAPIS]: "#6239fd",
  [LIGHT_SPRING]: "#ecfcf1",
  [RUBY]: "#DA114D",
  [RUBY_DARK]: "#a10026",
  [RUBY_LIGHT]: "#ff5878",
  [SPRING]: "#73EBA3",
  [SWITCH_GREEN_1]: "#00AD79",
  [SWITCH_GREEN_2]: "#89D9C2",
  [APPROVED_GREEN]: "#356A4A",
  [AVATAR_BLUE]: "#0058AD",
  [SWITCH_TRACK]: "#21212114",
  [SWITCH_THUMB]: "#979797",
  [SWITCH_THUMB_DISABLED]: "rgba(0, 0, 0, 0.6)",
  [SWITCH_THUMB_DISABLED_CHECKED]: "#a7dfbd",
  [BUTTON_CHOICE_BLUE]: "#3c3cc7",
  [WHITE]: "#fff",
  [TABLE_HOVER]: "#efefef",
};

export type CapableColor = keyof typeof colors;

export const statusColors = {
  success: colors[SPRING],
  info: colors[LAPIS],
  warning: colors[CANARY],
  error: colors[RUBY],
} as const;

export const statusTextColors = {
  success: colors[BLACK],
  info: colors[WHITE],
  warning: colors[BLACK],
  error: colors[WHITE],
} as const;
