export interface OffsetsMap {
  [ksy: string]: number;
}

export interface ColorSchemeOffsets {
  light: OffsetsMap;
  dark: OffsetsMap;
}

export type ColorWeightMap = {
  [weight: string]: {
    hex: string;
    rgb: string;
    weight: number;
  };
};
