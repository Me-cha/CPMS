import React, { useEffect, useState } from "react";
import { Table, Button, List } from "rsuite";

const { Column, HeaderCell, Cell } = Table;

const StudentList = ({ data, selectedId }) => {
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    setStudentData(
      selectedId.length > 0
        ? data.filter((item) => selectedId.includes(item._id))
        : data
    );
  }, [selectedId, data]);

  return (
    <div
      style={{
        width: "70.32vw",
        maxHeight: "73vh",
        overflowY: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
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
      </Table>
    </div>
  );
};

export default StudentList;
