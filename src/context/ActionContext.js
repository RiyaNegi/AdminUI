import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import uuid from "react-uuid";
import { API_URL } from "../Constants";

export const ActionContext = createContext();

export const ActionProvider = ({ children }) => {
  const [data, setData] = useState();
  const [filteredInfo, setFilteredInfo] = useState(null);
  const [sortedInfo, setSortedInfo] = useState(null);
  const [selectedRows, setSelectedRow] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [record, setRecord] = useState(null);
  const [form, setForm] = useState({});
  const [error, setError] = useState(null);
  const [searchedList, setSearchedList] = useState(null);

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo(null);
    setSelectedRow([]);
  };

  const handleInputChange = (e) => {
    const newData = data.filter(
      (i) =>
        i.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        i.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
        i.role.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchedList(newData);
  };

  const getData = () => {
    axios.get(API_URL).then((res) => {
      const newDataArray = res.data.map((i) => ({ ...i, key: uuid() }));
      setData(newDataArray);
    });
  };

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRow(selectedRowKeys);
  };

  const onDelete = () => {
    const newData = data.filter((i) => !selectedRows.includes(i.key));
    setData(newData);
    setSearchedList(newData);
    clearFilters();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setRecord(null);
    setForm(null);
    setError(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setRecord(null);
    setForm(null);
    setError(false);
  };

  const onEditRow = (event, name) => {
    event.preventDefault();
    setForm({ ...form, [name]: event.target.value });
  };

  const onEditRole = (value) => {
    setForm({ ...form, role: value });
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const OnSubmitForm = () => {
    if ((form.email && validateEmail(form.email)) || !form.email) {
      const rec = data.find((val) => val.key === form.key);
      const newData = data;
      const Index = newData.findIndex((val) => val.key === form.key);
      newData[Index] = { ...rec, ...form };
      setSearchedList(newData);
      handleCancel();
    } else if (!validateEmail(form.email)) {
      setError("Enter valid email");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setForm({ ...form, key: record?.key });
  }, [record]);
  return (
    <>
      <ActionContext.Provider
        value={{
          data: data,
          handleChange: handleChange,
          clearFilters: clearFilters,
          filteredInfo: filteredInfo,
          sortedInfo: sortedInfo,
          handleInputChange: handleInputChange,
          onSelectChange: onSelectChange,
          selectedRows: selectedRows,
          onDelete: onDelete,
          isModalVisible: isModalVisible,
          showModal: showModal,
          handleOk: handleOk,
          handleCancel: handleCancel,
          record: record,
          form: form,
          setRecord: setRecord,
          onEditRow: onEditRow,
          OnSubmitForm: OnSubmitForm,
          onEditRole: onEditRole,
          error: error,
          searchedList: searchedList,
        }}
      >
        {children}
      </ActionContext.Provider>
    </>
  );
};
