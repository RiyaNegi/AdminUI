import React, { useState, useContext } from "react";
import { Table, Button, Space } from "antd";
import "antd/dist/antd.css";
import { ActionContext } from "../../context/ActionContext";
import "./index.css";
import EditModal from "../editModal";
import { ROLES } from "../../Constants";

const Index = () => {
  const action = useContext(ActionContext);
  const data = action.data;
  const filteredInfo = action.filteredInfo;
  const sortedInfo = action.sortedInfo;
  const handleChange = action.handleChange;
  const onSelectChange = action.onSelectChange;
  const selectedRows = action.selectedRows;
  const onDelete = action.onDelete;
  const setRecord = action.setRecord;
  const searchedList = action.searchedList;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: ROLES,
      filteredValue: filteredInfo?.role || null,
      onFilter: (value, record) => record.role.includes(value),
      sorter: (a, b) => a.role.length - b.role.length,
      sortOrder: sortedInfo?.columnKey === "role" && sortedInfo?.order,
      ellipsis: true,
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      render: (_, record) => <EditModal recordKey={record} />,
    },
  ];
  const hasSelected = selectedRows.length > 0;
  const rowSelection = {
    selectedRows,
    onChange: onSelectChange,
  };

  return (
    <>
      <Button type="primary" onClick={onDelete} disabled={!hasSelected}>
        Delete
      </Button>
      <span style={{ marginLeft: 8 }}>
        {hasSelected ? `Selected ${selectedRows.length} items` : ""}
      </span>
      <Table
        columns={columns}
        rowSelection={rowSelection}
        dataSource={searchedList || data}
        onChange={handleChange}
      />
    </>
  );
};

export default Index;
