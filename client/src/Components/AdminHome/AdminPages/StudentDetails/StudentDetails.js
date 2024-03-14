import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentList from "./StudentList";
import SearchBar from "../../../Search/Search";
import { Header } from "rsuite";
import { getUsersAction } from "../../../../redux/action/userControls";

function AdminStudentList() {
  const dispatch = useDispatch();
  const studentList = useSelector((state) => state.userControls?.students);
  const [selectedId, setSelectedId] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState(false);

  useEffect(() => {
    dispatch(getUsersAction());
  }, [dispatch, deleteStatus]);

  const handleSearch = (record) => {
    setSelectedId((prevIds) => [...prevIds, record]);
  };
  const clearSelectedIds = () => {
    setSelectedId([]);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0vh 5vw",
        width: "80vw",
        height: "90vh",
      }}
    >
      <Header>
        <h1 style={{ textAlign: "center", marginBottom: "1vh" }}>
          Student Details
        </h1>
        <div
          style={{
            display: "flex",
            direction: "row",
            width: "70.32vw",
            justifyContent: "space-between",
            margin: "1vh 1vw",
          }}
        >
          <SearchBar
            data={studentList}
            onSearch={handleSearch}
            clearSelectedId={clearSelectedIds}
          />
        </div>
      </Header>
      <StudentList
        data={studentList}
        selectedId={selectedId}
        setDeleteStatus={setDeleteStatus}
      />
    </div>
  );
}

export default AdminStudentList;
