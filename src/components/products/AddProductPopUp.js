import FormPopUp from "@/core/modals/FormPopUp";
import CustomInput from "@/core/inputs/CustomInput";
import * as React from "react";
import { useState } from "react";
import FileInput from "@/core/inputs/FileInput";
import { useDispatch } from "react-redux";
import useValidate from "@/hooks/useValidate";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import { Add } from "@mui/icons-material";
import productValidator from "@/helpers/validators/productValidator";
import SelectCategory from "@/components/categories/SelectCategory";
import {
  showErrorToast,
  showSuccessToast,
} from "@/app/GlobalRedux/Features/toastSlice";
import ImageAPI from "@/helpers/APIServices/ImageAPI";

const AddProductPopUp = ({ addPopUp, setAddPopUp, onSuccess }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [discount, setDiscount] = useState("");
  const [image, setImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);
  const [thirdImage, setThirdImage] = useState(null);
  const [fourthImage, setFourthImage] = useState(null);

  const dispatch = useDispatch();
  const { clearError, getError, validateErrors } = useValidate();

  const addProduct = () => {
    const errors = validateErrors(
      {
        name,
        stock,
        price,
        image,
        category_id: category,
      },
      productValidator,
    );
    if (errors) {
      return;
    }
    let payload = new FormData();
    payload.append("name", name);
    payload.append("description", description);
    payload.append("image_1", image);
    payload.append("image_2", secondImage);
    payload.append("image_3", thirdImage);
    payload.append("image_4", fourthImage);
    payload.append("stock", stock);
    payload.append("price", price);
    payload.append("category_id", category);
    payload.append("discount_price", discount);
    dispatch(showLoader("Please wait"));
    ImageAPI.post("/api/admin/products", payload)
      .then(() => {
        dispatch(showSuccessToast("Product created successfully"));
        onSuccess();
        setAddPopUp(false);
      })
      .catch(() => {
        dispatch(showErrorToast("Something went wrong"));
      })
      .finally(() => dispatch(hideLoader()));
  };

  return (
    <FormPopUp
      title="Create new product"
      open={addPopUp}
      setOpen={setAddPopUp}
      handleSubmit={addProduct}
      submitButtonText="Add"
      submitButtonColor="primary"
      maxWidth="xl"
      icon={<Add />}
    >
      <div className="flex flex-col space-y-8">
        <div className="flex sm:flex-row flex-col justify-between sm:space-x-4 sm:space-y-0 space-y-4">
          <CustomInput
            label="Name"
            placeholder="Enter name"
            handleChange={(value) => clearError("name", value, setName)}
            value={name}
            error={getError("name")}
            required
            className="flex-1"
          />
          <CustomInput
            label="Description"
            placeholder="Enter description"
            handleChange={(value) =>
              clearError("description", value, setDescription)
            }
            value={description}
            error={getError("description")}
            multiline
            className="flex-1"
          />
        </div>
        <div className="flex md:flex-row flex-col justify-between md:space-x-4">
          <div className="flex sm:flex-row flex-col w-full justify-between sm:space-x-2 sm:space-y-0 space-y-4 mb:mb-0 mb-8">
            <SelectCategory
              selectedValue={category}
              onSelect={setCategory}
              required
              customLabel
            />
            <CustomInput
              label="Price"
              type="number"
              placeholder="Enter price"
              handleChange={(value) => clearError("price", value, setPrice)}
              value={price}
              error={getError("price")}
              className="flex-1"
              required
            />
          </div>
          <div className="flex sm:flex-row flex-col w-full justify-between sm:space-x-2 sm:space-y-0 space-y-4">
            <CustomInput
              label="Stock"
              type="number"
              placeholder="Enter stock"
              handleChange={(value) => clearError("stock", value, setStock)}
              value={stock}
              error={getError("stock")}
              required
              className="flex-1"
            />
            <CustomInput
              label="Discount price"
              placeholder="Enter discount price"
              type="number"
              handleChange={(value) =>
                clearError("discount", value, setDiscount)
              }
              value={discount}
              error={getError("discount")}
              className="flex-1"
              required
            />
          </div>
        </div>
        <div className="flex md:flex-row flex-col w-full space-x-2">
          <div className="flex flex-col justify-between space-y-2 w-full">
            <FileInput
              label="First image"
              handleChange={(value) => clearError("image", value, setImage)}
              allowPreviewImage
              error={getError("image")}
            />
            <FileInput
              label="Third image"
              handleChange={setThirdImage}
              allowPreviewImage
            />
          </div>
          <div className="flex flex-col justify-between space-y-2 w-full">
            <FileInput
              label="Second image"
              handleChange={setSecondImage}
              allowPreviewImage
            />
            <FileInput
              label="Fourth image"
              handleChange={setFourthImage}
              allowPreviewImage
            />
          </div>
        </div>
      </div>
    </FormPopUp>
  );
};

export default AddProductPopUp;
