import React from "react";
import { Dropdown, Radio } from "@nextui-org/react";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import readXlsxFile from "read-excel-file";

const Filter = ({
  handleChangeSort,
  handleChangeFilter,
}: {
  handleChangeSort: any;
  handleChangeFilter?: any;
}) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [categories, setCategories] = React.useState([]);

  const [selected, setSelected] = React.useState<any>(
    new Set(["Chọn_danh_mục"])
  );

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  const selectedKey = (selected: any) => selected.replaceAll(" ", "_");

  React.useEffect(() => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      readXlsxFile(acceptedFiles[0]).then((rows: any) => {
        // console.log(" rows", rows.flat()[0]);
        if (rows.flat().every((i) => typeof i === "string")) {
          setCategories(rows.flat());
          setSelected([selectedKey(rows.flat()[0])]);
          toast.success("Tải lên danh sách danh mục thành công!");
        } else {
          return toast.error("Sai định dạng danh mục!");
        }
      });
    }
  }, [acceptedFiles]);

  React.useEffect(() => {
    handleChangeFilter && handleChangeFilter(selected);
  }, [selected]);

  return (
    <div className="flex justify-between items-center mb-2">
      <Radio.Group
        aria-label="sort"
        onChange={handleChangeSort}
        orientation="horizontal"
        color="secondary"
        size="md"
        // defaultValue="gia"
      >
        <Radio value="gia">Giá</Radio>
        <Radio value="ten">Tên</Radio>
      </Radio.Group>
      <Dropdown>
        {categories && categories.length > 0 ? (
          <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
            {selectedValue}
          </Dropdown.Button>
        ) : (
          <div {...getRootProps({ className: "dropzone" })}>
            <input
              {...getInputProps()}
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 ">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                {selectedValue}
              </span>
            </button>
          </div>
        )}

        {categories && categories.length > 0 && (
          <Dropdown.Menu
            aria-label="Single selection actions"
            color="secondary"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selected}
            onSelectionChange={setSelected}
          >
            {categories.map((category: any, index) => (
              <Dropdown.Item key={selectedKey(category)}>
                {category}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        )}
      </Dropdown>
    </div>
  );
};

export default Filter;
