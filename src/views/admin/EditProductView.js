"use client";

import Layout from "@/layouts/UserLayout/Layout";
import {useEffect, useState} from "react";
import CustomInput from "@/core/inputs/CustomInput";
import SelectInput from "@/core/inputs/SelectInput";
import FileInput from "@/core/inputs/FileInput";
import SubmitButton from "@/core/buttons/SubmitButton";
import * as React from "react";
import { Edit } from "@mui/icons-material";
import API from "@/helpers/APIServices/API";

const EditProductView = ({ id }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [firstImage, setFirstImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);
  const [thirdImage, setThirdImage] = useState(null);
  const [fourthImage, setFourthImage] = useState(null);

  const onSubmit = () => {};

  const getProduct = () => {
    API.get(`/api/product/${id}`)
  }

  useEffect(() => {
    getProduct();
  }, [id]);

  return (
    <Layout>
      <div className="mt-20 m-3 p-5 bg-slate-100 rounded-lg shadow-lg">
        <div className="flex justify-between my-5">
          <div className="text-xl font-semibold">All categories</div>
        </div>
        <div className="flex flex-col mb-5">
          <div className="flex md:flex-row flex-col justify-around ml-2 mr-3">
            <CustomInput
              label="Name"
              placeholder="Enter name"
              handleChange={setName}
              value={name}
              required
              className="flex-1 md:mr-3 md:mb-0 mb-5"
            />
            <CustomInput
              label="Description"
              placeholder="Enter description"
              handleChange={setDescription}
              value={description}
              multiline
              className="flex-1 md:ml-3"
            />
          </div>
          <div className="flex md:flex-row flex-col md:my-5 my-3">
            <SelectInput
              label="Category"
              value={category}
              onChange={setCategory}
              id="product-category"
              items={[{ label: "test", value: "test" }]}
              minWidth="300"
              className="flex flex-1"
            />
            <div className="flex flex-1 ml-3 md:mt-0 mt-5">
              <CustomInput
                label="Stock"
                placeholder="Stock amount"
                handleChange={setStock}
                value={stock}
                type="number"
                required
                className="flex-1 mr-3"
              />
              <CustomInput
                label="Price"
                placeholder="Enter price"
                handleChange={setPrice}
                value={price}
                type="number"
                required
                className="flex-1 mr-3"
              />
            </div>
          </div>
          <div className="flex justify-around">
            <FileInput
              label="Upload first image"
              handleChange={setFirstImage}
              allowPreviewImage
            />
            <FileInput
              label="Upload second image"
              handleChange={setSecondImage}
              allowPreviewImage
            />
          </div>
          <div className="flex justify-around mt-10">
            <FileInput
              label="Upload third image"
              handleChange={setThirdImage}
              allowPreviewImage
            />
            <FileInput
              label="Upload fourth image"
              handleChange={setFourthImage}
              allowPreviewImage
            />
          </div>
        </div>
        <SubmitButton
          // variant="contained"
          text="Edit product"
          handleClick={onSubmit}
          icon={<Edit className="mr-2" />}
          className="flex justify-end"
        />
      </div>
      {/*<div className="fixed z-40 opacity-80 bottom-0 inset-x-0 bg-purple-300 h-16 flex space-x-4 items-center justify-center">*/}
      {/*  <SubmitButton text="Create product" handleClick={onSubmit} />*/}
      {/*</div>*/}
    </Layout>
  );
};

export default EditProductView;
