import React from "react";
import "./Admin.css";
import SearchBar from "./searchBar";
import DataTable from "./DataTable";

const Index = () => {
  return (
    <div className="data-body">
      <SearchBar />
      <div className="data-table">
        <DataTable />
      </div>
    </div>
  );
};

export default Index;
