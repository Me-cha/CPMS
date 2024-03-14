import { SearchIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import ReactSearchBox from "react-search-box";
import { Dropdown } from "rsuite";
import { Table, Button, List } from "rsuite";
import "./sb.css";

const Search = ({ data, onSearch, clearSelectedId }) => {
  const [selectedValue, setSelectedValue] = useState("name");

  const searchData = data
    ? data.map((item) =>
        item
          ? {
              key: item._id,
              value: item[selectedValue],
            }
          : {}
      )
    : [];

  const handleSelect = (record) => {
    onSearch(record.item.key);
  };

  return (
    <div className="searchbox flex items-center">
      <Dropdown
        title={selectedValue}
        onSelect={(value) => setSelectedValue(value)}
      >
        <Dropdown.Item eventKey="name">Name</Dropdown.Item>
        <Dropdown.Item eventKey="uid">UID</Dropdown.Item>
      </Dropdown>
      <ReactSearchBox
        placeholder="Search"
        autoFocus={true}
        leftIcon={<SearchIcon />}
        iconBoxSize={"25px"}
        data={searchData}
        onSelect={handleSelect}
      />
      <Button onClick={clearSelectedId}>Clear Filter</Button>
    </div>
  );
};

export default Search;
