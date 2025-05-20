import IconMenu from "./icons-menu/IconMenu";
import GlobalKeyListener from "./key-state/GlobalKeyListener";
import Grid from "./main-layout/Grid";

function App() {
  return (
    <div>
      <GlobalKeyListener />
      <Grid />
      <IconMenu />
    </div>
  );
}

export default App;
