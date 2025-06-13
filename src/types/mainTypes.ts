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
  id: string;
  path: RoutePoint[];
  icon: string;
};
export type RouteMap = Map<string, Route>;

export type Coord = [number, number];
