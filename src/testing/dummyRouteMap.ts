import { Route, RouteMap, RoutePoint, RoutePosition } from "../types/mainTypes";

export default function getDummyRouteMap(): RouteMap {
  const dummyRouteMap: RouteMap = new Map<number, Route>();

  const dummyRoute: Route = {
    icon: "rail",
    path: [],
  };

  const dummyPath: RoutePoint[] = [
    {
      key: "0,0",
      position: RoutePosition.Center,
    },
    {
      key: "0,0",
      position: RoutePosition.Right,
    },
    {
      key: "0,0",
      position: RoutePosition.TopRight,
    },
    {
      key: "0,1",
      position: RoutePosition.TopLeft,
    },
    {
      key: "0,1",
      position: RoutePosition.Top,
    },
    {
      key: "0,1",
      position: RoutePosition.TopRight,
    },
    {
      key: "0,1",
      position: RoutePosition.Right,
    },
    {
      key: "0,1",
      position: RoutePosition.BottomRight,
    },
  ];
  dummyRoute.path.push(...dummyPath);
  dummyRouteMap.set(0, dummyRoute);

  return dummyRouteMap;
}
