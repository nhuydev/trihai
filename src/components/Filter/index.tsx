import React from "react";
import { Dropdown, Radio } from "@nextui-org/react";
const Filter = ({ handleChangeSort }: { handleChangeSort: any }) => {
  const [selected, setSelected] = React.useState<any>(new Set(["hoa_loa_kèn"]));

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  return (
    <div className="flex justify-between items-center mb-2">
      <Radio.Group
        aria-label="sort"
        onChange={handleChangeSort}
        orientation="horizontal"
        color="secondary"
        size="md"
        defaultValue="gia"
      >
        <Radio value="gia">Giá</Radio>
        <Radio value="ten">Tên</Radio>
      </Radio.Group>
      <Dropdown>
        <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
          {selectedValue}
        </Dropdown.Button>
        <Dropdown.Menu
          aria-label="Single selection actions"
          color="secondary"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selected}
          onSelectionChange={setSelected}
        >
          <Dropdown.Item key="hoa_loa_kèn">Hoa Loa Kèn</Dropdown.Item>
          <Dropdown.Item key="number">Number</Dropdown.Item>
          <Dropdown.Item key="date">Date</Dropdown.Item>
          <Dropdown.Item key="single_date">Single Date</Dropdown.Item>
          <Dropdown.Item key="iteration">Iteration</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Filter;
