// lib/palette.ts
export const PALETTE = {
    softTerracotta: "#845D44",
    terracotta: "#B88768",
    olive: "#686248",
    sand: "#A59886",
    smokey: "#756F63",
    stone: "#908779",
    offwhite: "#C1B8A7",
  } as const;
  
  export type BrandColor = keyof typeof PALETTE;
  