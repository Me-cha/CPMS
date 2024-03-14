import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Table, Button, List } from "rsuite";
import { deleteCoordinatorAction } from "../../../../redux/action/coordinatorControls";
import { useDispatch } from "react-redux";

const { Column, HeaderCell, Cell } = Table;

const CoordinatorList = ({ data, setDeleteStatus }) => {
  const dispatch = useDispatch();
  const [coordinatorData, setCoordinatorData] = useState([]);

  useEffect(() => {
    setCoordinatorData(data);
  }, [data]);

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete the Co-ordinator?`)) {
      dispatch(deleteCoordinatorAction(id, setDeleteStatus));
    }
  };

  return (
    <div
      style={{
        width: "63.84vw",
        maxHeight: "73vh",
        overflowY: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <Table height={500} data={coordinatorData} affixHeader={0}>
        <Column width={100}>
          <HeaderCell>UID</HeaderCell>
          <Cell dataKey="uid" />
        </Column>

        <Column width={200}>
          <HeaderCell>NAME</HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column width={100}>
          <HeaderCell>BRANCH</HeaderCell>
          <Cell dataKey="branch" />
        </Column>

        <Column width={100}>
          <HeaderCell>CONTACT</HeaderCell>
          <Cell dataKey="contact" />
        </Column>

        <Column width={400}>
          <HeaderCell>COLLEGE EMAIL</HeaderCell>
          <Cell dataKey="email" />
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

export default CoordinatorList;
