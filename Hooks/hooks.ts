import * as XLSX from "xlsx";

export const handleSelect = (
  e: React.ChangeEvent<HTMLInputElement>,
  setSelected: any,
  selected: string[]
) => {
  const { value, checked } = e.target;
  if (checked) {
    setSelected([...selected, value]);
  } else {
    setSelected(selected.filter((item) => item !== value));
  }
};
