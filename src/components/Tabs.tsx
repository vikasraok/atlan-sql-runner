import React from "react";

const Tabs = () => {
  return (
    <div className="flex">
      <div className="tab w-32 px-4 py-2 border-b-2 border-transparent hover:border-blue-500 cursor-pointer">Tab 1</div>
      <div className="tab w-32 px-4 py-2 border-b-2 border-transparent hover:border-blue-500 cursor-pointer">Tab 2</div>
      <div className="tab w-32 px-4 py-2 border-b-2 border-blue-500 cursor-pointer">Tab 3</div>
    </div>
  );
};

export default Tabs;
