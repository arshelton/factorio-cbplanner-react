export type Icons = string[];
export type SideRoutes = {
  left: Icons;
  right: Icons;
  top: Icons;
  bottom: Icons;
};
export type BusCell = {
  routes: Icons;
};
export type RegularCell = {
  icons: Icons;
  sideRoutes: SideRoutes;
};
export type EmptyCell = null;
export type Cell = BusCell | RegularCell | EmptyCell;
export type Grid = Map<string, Cell>;
export type Coord = [number, number];
