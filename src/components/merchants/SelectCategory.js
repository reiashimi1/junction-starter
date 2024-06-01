import SelectInput from "@/core/inputs/SelectInput";
import * as React from "react";
import { useEffect, useState } from "react";
import API from "@/helpers/APIServices/API";
import { isArrayEmpty } from "@/helpers/functions";
import { useDispatch } from "react-redux";
import { showErrorToast } from "@/app/GlobalRedux/Features/toastSlice";

const SelectCategory = ({
  selectedId,
  selectedValue,
  onSelect,
  required = true,
  customLabel = false,
}) => {
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    // API.get("/api/categories")
    //   .then((response) => {
    //     const categories = response.data;
    //     const mappedCategories = categories.map((category) => {
    //       return { label: category.name, value: category.id };
    //     });
    setCategories([{ label: "Test", value: "test" }]);
    //   })
    //   .catch(() => dispatch(showErrorToast("Could not get categories...")));
  }, [dispatch]);

  useEffect(() => {
    if (!!selectedId && !isArrayEmpty(categories)) {
      const selectedCategory = categories.find(
        (category) => category.value === selectedId,
      );
      onSelect(selectedCategory.value);
    }
  }, [selectedId, categories]);

  return (
    <div className="flex flex-1">
      <SelectInput
        label="Category"
        value={selectedValue}
        onChange={onSelect}
        id="city"
        items={categories}
        minWidth="300"
        required={required}
        className="flex flex-1"
        customLabel={customLabel}
      />
    </div>
  );
};

export default SelectCategory;
