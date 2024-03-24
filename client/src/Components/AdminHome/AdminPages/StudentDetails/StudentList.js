import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Table, Button, List } from "rsuite";
import { deleteStudentAction } from "../../../../redux/action/userControls";
import { useDispatch } from "react-redux";

const { Column, HeaderCell, Cell } = Table;

const StudentList = ({ data, selectedId, setDeleteStatus }) => {
  const dispatch = useDispatch();
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    setStudentData(
      selectedId.length > 0
        ? data.filter((item) => selectedId.includes(item._id))
        : data
    );
  }, [selectedId, data]);

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete the student?`)) {
      dispatch(deleteStudentAction(id, setDeleteStatus));
    }
  };

  return (
    <div
      style={{
        width: "70.32vw",
        maxHeight: "73vh",
        overflowY: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        margin: "auto",
      }}
    >
      <Table
        height={500}
        data={studentData}
        onRowClick={(rowData) => {
          console.log(rowData);
        }}
        affixHeader={0}
      >
        <Column width={100}>
          <HeaderCell>UID</HeaderCell>
          <Cell dataKey="uid" />
        </Column>

        <Column width={200}>
          <HeaderCell>NAME</HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column width={100}>
          <HeaderCell>BATCH</HeaderCell>
          <Cell dataKey="batch" />
        </Column>

        <Column width={100}>
          <HeaderCell>BRANCH</HeaderCell>
          <Cell dataKey="branch" />
        </Column>

        <Column width={100}>
          <HeaderCell>CONTACT</HeaderCell>
          <Cell>
            {(rowData) => {
              return String(rowData.contact);
            }}
          </Cell>
        </Column>

        <Column width={400}>
          <HeaderCell>COLLEGE EMAIL</HeaderCell>
          <Cell dataKey="college_email" />
        </Column>

        <Column width={80} fixed="right">
          <HeaderCell>...</HeaderCell>
          <Cell style={{ padding: "6px" }}>
            {(rowData) => (
              <Button
                appearance="link"
                onClick={() => handleDelete(rowData._id)}
              >
                Delete
              </Button>
            )}
          </Cell>
        </Column>
      </Table>
    </div>
  );
};

export default StudentList;
