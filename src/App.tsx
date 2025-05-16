import GlobalKeyListener from "./key-state/GlobalKeyListener";
import Grid from "./main-layout/Grid";

function App() {
  return (
    <div>
      <GlobalKeyListener />
      <Grid />
    </div>
  );
}

export default App;
