import { useState } from "react";
import TabSelector from "./TabSelector";
import IconGrid from "./IconGrid";
import layoutConfig from "./layout-config.json";
import sslayout from "./sslayout.json";

const categories = Object.keys(layoutConfig);

function IconMenu() {
  const [activeTab, setActiveTab] = useState<string>(categories[0]);

  return (
    <dialog id="menu-modal" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">Select Icon</h3>
        <TabSelector
          tabs={categories}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <IconGrid rows={layoutConfig[activeTab]} sslayout={sslayout} />
      </div>
    </dialog>
  );
}

export default IconMenu;
