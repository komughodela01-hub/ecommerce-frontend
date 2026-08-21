import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import "../css/Auth.css";
import Sidebar from "../components/Sidebar";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

function Product() {
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    status: true,
  });

  // =========================
  // GET ALL PRODUCTS
  // =========================
  const getProducts = useCallback(async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/product/getAllProduct`,
        {
          headers: getAuthHeaders(),
        }
      );

      console.log("Products:", res.data);

      setProducts(res.data.data || []);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to get products"
      );
    }
  }, []);

  // =========================
  // USE EFFECT
  // =========================
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setForm({
      id: "",
      name: "",
      description: "",
      price: "",
      stock: "",
      status: true,
    });

    setImage(null);
    setIsEdit(false);
  };

  // =========================
  // EDIT PRODUCT
  // =========================
  const editProduct = (item) => {
    setForm({
      id: item._id,
      name: item.name || "",
      description: item.description || "",
      price: item.price || "",
      stock: item.stock || "",
      status:
        item.status === "Y" ||
        item.status === true ||
        item.status === "active",
    });

    setImage(null);
    setIsEdit(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // CREATE / UPDATE PRODUCT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append(
        "description",
        form.description
      );
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      formData.append(
        "status",
        form.status ? "Y" : "N"
      );

      if (image) {
        formData.append("image", image);
      }

      // =========================
      // UPDATE PRODUCT
      // =========================
      if (isEdit) {
        formData.append("id", form.id);

        await axios.post(
          `${BASE_URL}/admin/product/updateProduct`,
          formData,
          {
            headers: {
              ...getAuthHeaders(),
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        alert(
          "Product Updated Successfully"
        );
      }

      // =========================
      // CREATE PRODUCT
      // =========================
      else {
        await axios.post(
          `${BASE_URL}/admin/product/createProduct`,
          formData,
          {
            headers: {
              ...getAuthHeaders(),
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        alert(
          "Product Created Successfully"
        );
      }

      await getProducts();
      resetForm();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          (isEdit
            ? "Failed to update product"
            : "Failed to create product")
      );
    }
  };

  // =========================
  // DELETE PRODUCT
  // =========================
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/admin/product/deleteProduct`,
        {
          id,
        },
        {
          headers: getAuthHeaders(),
        }
      );

      alert(
        "Product Deleted Successfully"
      );

      await getProducts();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete product"
      );
    }
  };

  return (
    <div>
      <Sidebar />

      <div className="main-content">
        <h1>Product Management</h1>

        {/* CREATE / UPDATE FORM */}

        <form
          onSubmit={handleSubmit}
          className="category-form"
        >
          <h2>
            {isEdit
              ? "Update Product"
              : "Create Product"}
          </h2>

          <input
            type="text"
            placeholder="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            placeholder="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            placeholder="Price"
            name="price"
            value={form.price}
            onChange={handleChange}
            min="0"
            required
          />

          <input
            type="number"
            placeholder="Stock"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            min="0"
            required
          />

          <select
            name="status"
            value={form.status ? "Y" : "N"}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                status:
                  e.target.value === "Y",
              }))
            }
          >
            <option value="Y">
              Active
            </option>

            <option value="N">
              Inactive
            </option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(
                e.target.files?.[0] || null
              )
            }
          />

          <button type="submit">
            {isEdit
              ? "Update Product"
              : "Create Product"}
          </button>

          {isEdit && (
            <button
              type="button"
              onClick={resetForm}
              className="cancel-btn"
            >
              Cancel Edit
            </button>
          )}
        </form>

        <hr />

        {/* ALL PRODUCTS */}

        <h2>All Products</h2>

        <table className="category-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((item) => (
                <tr key={item._id}>
                  {/* IMAGE */}

                  <td>
                    {item.image ? (
                      <img
                        src={`${BASE_URL}/${item.image}`}
                        alt={item.name}
                        width="70"
                        height="70"
                        style={{
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>

                  {/* NAME */}

                  <td>{item.name}</td>

                  {/* DESCRIPTION */}

                  <td>
                    {item.description}
                  </td>

                  {/* PRICE */}

                  <td>₹{item.price}</td>

                  {/* STOCK */}

                  <td>{item.stock}</td>

                  {/* STATUS */}

                  <td>
                    {item.status === "Y" ||
                    item.status === true ||
                    item.status === "active" ? (
                      <span
                        style={{
                          color: "green",
                          fontWeight: "bold",
                        }}
                      >
                        Active
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "red",
                          fontWeight: "bold",
                        }}
                      >
                        Inactive
                      </span>
                    )}
                  </td>

                  {/* ACTION */}

                  <td>
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() =>
                        editProduct(item)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() =>
                        deleteProduct(
                          item._id
                        )
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Product;
