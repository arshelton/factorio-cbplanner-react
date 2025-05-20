type Props = {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
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
          {tab}
        </a>
      ))}
    </div>
  );
}

export default TabSelector;
