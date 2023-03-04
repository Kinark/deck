// import { transparentize } from 'polished';

import { colors } from './colors';

export type PalleteStructure = typeof lightPalette;

const lightPalette = {
   card: colors.lightBlue,
   cardSection: colors.lighterBlue,
   body: colors.almostWhite,
   secondary: colors.darkAlmostWhite,
   accent: colors.yellow,
   buttonBg: colors.lighterBlue,
   buttonColor: colors.almostWhite,
   bg: colors.blue,
   white: colors.white,
   success: colors.green,
   error: colors.red,
};

const darkPalette: PalleteStructure = {
   ...lightPalette,
};

export const palletes: {
   light: PalleteStructure;
   dark: PalleteStructure;
} = {
   dark: darkPalette,
   light: lightPalette,
};
