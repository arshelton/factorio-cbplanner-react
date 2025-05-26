import { TabKey } from "./menuTypes";

type Props = {
  tabs: TabKey[];
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
};

function TabSelector({ tabs, activeTab, setActiveTab }: Props) {
  return (
    <div className="tabs my-4">
      {tabs.map((tab) => (
        <a
          key={tab}
          className={`tab tab-bordered ${
            activeTab === tab ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab.toUpperCase().replace(/-/g, " ") as string}
        </a>
      ))}
    </div>
  );
}

export default TabSelector;
