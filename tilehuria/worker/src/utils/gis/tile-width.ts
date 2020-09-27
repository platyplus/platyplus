const TILE_WIDTHS = [
  360,
  180,
  90,
  45,
  22.5,
  11.25,
  5.625,
  2.813,
  1.406,
  0.703,
  0.352,
  0.176,
  0.088,
  0.044,
  0.022,
  0.011,
  0.005,
  0.003,
  0.001,
  0.0005,
  0.00025
]
// * See: https://wiki.openstreetmap.org/wiki/Zoom_levels
export const tileWidth = (zoomLevel: number): number =>
  TILE_WIDTHS[zoomLevel] || 0
