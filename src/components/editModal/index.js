import React, { useContext } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Modal, Button, Input, Select } from "antd";
import { ActionContext } from "../../context/ActionContext";
import { ROLES } from "../../Constants";

const { Option } = Select;

const Index = ({ recordKey }) => {
  const action = useContext(ActionContext);
  const showModal = action.showModal;
  const isModalVisible = action.isModalVisible;
  const handleCancel = action.handleCancel;
  const record = action.record;
  const form = action.form;
  const onEditRow = action.onEditRow;
  const OnSubmitForm = action.OnSubmitForm;
  const setRecord = action.setRecord;
  const onEditRole = action.onEditRole;
  const error = action.error;

  return (
    <>
      <Button
        type="primary"
        onClick={() => (setRecord(recordKey), showModal())}
      >
        Edit
      </Button>
      <Modal
        visible={isModalVisible}
        onOk={() => OnSubmitForm()}
        onCancel={handleCancel}
      >
        <h3>Email</h3>
        <Input
          value={form?.email || record?.email}
          onChange={(e) => onEditRow(e, "email")}
          className="input-bar"
        />
        {error && <small style={{ color: "red" }}>{error}</small>}
        <h3>Name</h3>
        <Input
          value={form?.name || record?.name}
          onChange={(e) => onEditRow(e, "name")}
          className="input-bar"
        />
        <h3>Role</h3>
        <Select
          value={form?.role || record?.role}
          onChange={(value) => onEditRole(value)}
          className="input-bar input-select"
        >
          {ROLES.map((i) => (
            <Option value={i.value}>{i.text}</Option>
          ))}
          ){" "}
        </Select>
      </Modal>
    </>
  );
};

export default Index;
