import React, { useState, useContext } from "react";
import { ActionContext } from "../../context/ActionContext";
import { Input, Space } from "antd";
import "./index.css";

const { Search } = Input;

const Index = () => {
  const action = useContext(ActionContext);
  const handleInputChange = action.handleInputChange;

  return (
    <div className="search-bar ">
      <Search
        placeholder="input search text"
        // onSearch={(e) => handleInputChange(e)}
        onChange={(e) => handleInputChange(e)}
        enterButton
      />
    </div>
  );
};

export default Index;
