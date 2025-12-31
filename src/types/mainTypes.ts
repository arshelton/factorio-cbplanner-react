export type Icons = string[];

export type BusCell = {
  routes: Icons;
};
export type RegularCell = {
  icons: Icons;
};
export type EmptyCell = null;
export type Cell = BusCell | RegularCell | EmptyCell;
export type Grid = Map<string, Cell>;

export enum RoutePosition {
  TopLeft,
  Top,
  TopRight,
  Left,
  Center,
  Right,
  BottomLeft,
  Bottom,
  BottomRight,
  Bus,
}
export type RoutePoint = {
  key: string;
  position: RoutePosition;
};
export type Route = {
  path: RoutePoint[];
  icon: string | null;
};
export type RouteMap = Map<number, Route>;

export type Coord = [number, number];
