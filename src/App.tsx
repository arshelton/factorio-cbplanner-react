import { Toaster } from "react-hot-toast";
import Header from "./header/Header";
import HelpModal from "./header/HelpModal";
import HotkeysModal from "./header/HotkeysModal";
import RoadMapModal from "./header/RoadMapModal";
import IconMenu from "./icons-menu/IconMenu";
import GlobalKeyListener from "./key-state/GlobalKeyListener";
import Grid from "./main-layout/Grid";

function App() {
  console.log("BASE_URL is: ", import.meta.env.BASE_URL);

  return (
    <div>
      <Toaster />
      <GlobalKeyListener />
      <IconMenu />
      <HelpModal />
      <HotkeysModal />
      <RoadMapModal />
      <div className="w-screen h-screen flex flex-col">
        <Header />
        <Grid />
      </div>
    </div>
  );
}

export default App;
