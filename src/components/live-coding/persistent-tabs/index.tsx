import React, { useEffect, useState } from 'react';

const TABS = [
  {
    id: 1,
    title: 'First Tab',
    body: 'This is tab 1',
  },
  {
    id: 2,
    title: 'Second Tab',
    body: 'This is tab 2',
  },
  {
    id: 3,
    title: 'Third Tab',
    body: 'This is tab 3',
  },
];

const PersistTabs = () => {
  const [activeTab, setActiveTab] = useState<{
    id: number;
    title: string;
    body: string;
  } | null>(null);

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
    window.localStorage.setItem('tab', JSON.stringify(tab));
  };

  useEffect(() => {
    const storedValue = JSON.parse(window?.localStorage.getItem('tab')) ?? {};

    if (storedValue) {
      setActiveTab(storedValue);
    }
  }, []);

  return (
    <div>
      <h1>Persistent Tabs</h1>

      {TABS.map((tab) => {
        return (
          <button key={tab.id} onClick={() => handleTabSelect(tab)}>
            {tab.title}
          </button>
        );
      })}

      <div>
        {activeTab?.body ? <p> {activeTab?.body} </p> : <p>Tab Not Selected</p>}
      </div>
    </div>
  );
};

export default PersistTabs;
