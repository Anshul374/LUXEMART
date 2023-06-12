import React, { useEffect, useState } from "react";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import Metadata from "../Metadata/Metadata";
import ErrorAlert from "../ErrorAlert/ErrorAlert";

import {
  ADMIN_EDIT_PRODUCT_CLEAR_ERRORS,
  adminEditProduct,
} from "../../features/admin/adminProductEditSlice";
import { fetchProductDetails } from "../../features/product/productDetailsSlice";

const UpdateProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = useSelector((state) => state.updateProduct);
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );

  // console.log(product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  useEffect(() => {
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (!product || (product && product._id !== id)) {
      dispatch(fetchProductDetails(id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
    }
    if (updateError) {
      setTimeout(() => {
        dispatch(ADMIN_EDIT_PRODUCT_CLEAR_ERRORS());
      }, 3000);
    }
    if (updateSuccess) {
      navigate("/admin/dashboard");
    }
  }, [updateSuccess, navigate, updateError, product, dispatch, id]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const productData = {
      name,
      price,
      description,
      category,
      stock,
      images,
    };
    dispatch(adminEditProduct({ id, productData }));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    setOldImages([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <Metadata title="Update Product" />
      {loading || updateLoading ? (
        <Loading />
      ) : (
        <div className="dashboard">
          <Sidebar />
          <div className="newProductContainer">
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={updateProductSubmitHandler}
            >
              <h1>Update Product</h1>
              <div>
                <SpellcheckIcon />
                <input
                  type="text"
                  placeholder="Product Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <AttachMoneyIcon />
                <input
                  type="number"
                  placeholder="Price"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <DescriptionIcon />
                <textarea
                  placeholder="Product Description"
                  value={description}
                  cols="30"
                  rows="1"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <AccountTreeIcon />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {/* <option value="">Choose Category</option> */}
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <StorageIcon />
                <input
                  type="number"
                  placeholder="Stock"
                  required
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div id="createProductFormFile">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={updateProductImagesChange}
                  multiple
                />
              </div>
              <div id="createProductFormImage">
                {oldImages &&
                  oldImages.map((image, index) => {
                    return (
                      <img src={image.url} alt="Product Preview" key={index} />
                    );
                  })}
              </div>
              <div id="createProductFormImage">
                {imagesPreview.map((image, index) => {
                  return <img src={image} alt="Product Preview" key={index} />;
                })}
              </div>
              <Button
                id="createProductBtn"
                type="submit"
                disabled={loading ? true : false}
              >
                Create
              </Button>
            </form>
          </div>
        </div>
      )}
      {updateError && <ErrorAlert error={updateError} />}
    </>
  );
};

export default UpdateProduct;
