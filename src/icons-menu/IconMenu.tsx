import { useState } from "react";
import TabSelector from "./TabSelector";
import IconGrid from "./IconGrid";
import layoutConfig from "./layout-config.json";
import { TabKey } from "./menuTypes";

const categories = Object.keys(layoutConfig) as TabKey[];

function IconMenu() {
  const [activeTab, setActiveTab] = useState<TabKey>(categories[0]);

  return (
    <dialog id="menu-modal" className="modal">
      <div className="modal-box w-11/12 max-w-5xl mt-10 h-[80vh] overflow-y-auto">
        <h3 className="font-bold text-lg">Select Icon</h3>
        <TabSelector
          tabs={categories}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <IconGrid rows={layoutConfig[activeTab]} />
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default IconMenu;
