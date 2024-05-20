import FormPopUp from "@/core/modals/FormPopUp";
import CustomInput from "@/core/inputs/CustomInput";
import * as React from "react";
import { useEffect, useState } from "react";
import FileInput from "@/core/inputs/FileInput";
import { useDispatch } from "react-redux";
import useValidate from "@/hooks/useValidate";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import { Edit } from "@mui/icons-material";
import productValidator from "@/helpers/validators/productValidator";
import SelectCategory from "@/components/categories/SelectCategory";
import {
  showErrorToast,
  showSuccessToast,
} from "@/app/GlobalRedux/Features/toastSlice";
import {appendToPayload, isObjectEmpty} from "@/helpers/functions";
import ImageAPI from "@/helpers/APIServices/ImageAPI";

const EditProductPopUp = ({ product, editPopUp, setEditPopUp, onSuccess }) => {
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

  const editProduct = () => {
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
    appendToPayload(payload, "image_1", image, product?.image_1, image);
    appendToPayload(payload, "image_2", secondImage, product?.image_2, image);
    appendToPayload(payload, "image_3", thirdImage, product?.image_3), image;
    appendToPayload(payload, "image_4", fourthImage, product?.image_4, image);
    payload.append("stock", stock);
    payload.append("price", price);
    payload.append("category_id", category);
    payload.append("discount_price", discount);
    dispatch(showLoader("Please wait"));
    ImageAPI.post(`/api/admin/products/${product.id}/edit`, payload)
      .then(() => {
        dispatch(showSuccessToast("Product updated successfully"));
        onSuccess();
        setEditPopUp(false);
      })
      .catch((err) => {
        dispatch(showErrorToast(err.response.data.message));
      })
      .finally(() => dispatch(hideLoader()));
  };

  useEffect(() => {
    if (!isObjectEmpty(product)) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setStock(product.stock);
      setDiscount(product.discount_price);
      setImage(product.image_1);
      setSecondImage(product.image_2);
      setThirdImage(product.image_3);
      setFourthImage(product.image_4);
    }
  }, [product]);

  return (
    <FormPopUp
      title="Edit product"
      open={editPopUp}
      setOpen={setEditPopUp}
      handleSubmit={editProduct}
      submitButtonText="Edit"
      submitButtonColor="primary"
      maxWidth="xl"
      icon={<Edit />}
    >
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between space-x-4">
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
          <div className="flex w-full justify-between space-x-2 mb:mb-0 mb-8">
            <SelectCategory
              selectedId={product.category_id}
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
          <div className="flex w-full justify-between space-x-2">
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
              image={image}
              previousImage={image}
              error={getError("image")}
            />
            <FileInput
              label="Third image"
              handleChange={setThirdImage}
              allowPreviewImage
              image={thirdImage}
              previousImage={thirdImage}
            />
          </div>
          <div className="flex flex-col justify-between space-y-2 w-full">
            <FileInput
              label="Second image"
              handleChange={setSecondImage}
              allowPreviewImage
              image={secondImage}
              previousImage={secondImage}
            />
            <FileInput
              label="Fourth image"
              handleChange={setFourthImage}
              allowPreviewImage
              image={fourthImage}
              previousImage={fourthImage}
            />
          </div>
        </div>
      </div>
    </FormPopUp>
  );
};

export default EditProductPopUp;
