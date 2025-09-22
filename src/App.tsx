import { Toaster } from "react-hot-toast";
import Header from "./header/Header";
import HelpModal from "./header/HelpModal";
import HotkeysModal from "./header/HotkeysModal";
import RoadMapModal from "./header/RoadMapModal";
import IconMenu from "./icons-menu/IconMenu";
import GlobalKeyListener from "./key-state/GlobalKeyListener";
import Grid from "./main-layout/Grid";
import RouteOverlaySVG from "./routes-layout/RouteOverlaySVG";
import useRouteController from "./routes-layout/useRouteController";
import RouteIconsTooltip from "./routes-layout/RouteIconsTooltip";

function App() {
  useRouteController();

  return (
    <div className="min-h-dvh flex flex-col">
      <Toaster />
      <GlobalKeyListener />

      <IconMenu />
      <HelpModal />
      <HotkeysModal />
      <RoadMapModal />

      <RouteIconsTooltip />

      <Header />
      <div className="relative flex-1 overflow-hidden">
        <Grid />
        <RouteOverlaySVG />
      </div>
    </div>
  );
}

export default App;
