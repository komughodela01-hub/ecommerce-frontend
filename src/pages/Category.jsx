import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Auth.css";
import Sidebar from "../components/Sidebar";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function Category() {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    parentId: "",
    status: true,
  });

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  // =========================
  // GET ALL CATEGORIES
  // =========================
  const getCategories = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/category/getAllCategory`,
        {
          headers: getAuthHeaders(),
        }
      );

      setCategories(res.data.data || []);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to get categories"
      );
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

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
      parentId: "",
      status: true,
    });

    setImage(null);
    setIsEdit(false);
  };

  // =========================
  // EDIT CATEGORY
  // =========================
  const editCategory = (item) => {
    setForm({
      id: item._id,
      name: item.name || "",
      description: item.description || "",
      parentId: item.parentId || "",
      status: item.status === "Y" || item.status === true,
    });

    setImage(null);
    setIsEdit(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // CREATE / UPDATE CATEGORY
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("status", form.status ? "Y" : "N");

      if (form.parentId) {
        formData.append("parentId", form.parentId);
      }

      if (image) {
        formData.append("profileImage", image);
      }

      // =========================
      // UPDATE
      // =========================
      if (isEdit) {
        formData.append("id", form.id);

        await axios.post(
          `${BASE_URL}/admin/category/updateCategory`,
          formData,
          {
            headers: {
              ...getAuthHeaders(),
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Category Updated Successfully");
      }

      // =========================
      // CREATE
      // =========================
      else {
        await axios.post(
          `${BASE_URL}/admin/category/createCategory`,
          formData,
          {
            headers: {
              ...getAuthHeaders(),
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Category Created Successfully");
      }

      await getCategories();
      resetForm();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          (isEdit
            ? "Failed to update category"
            : "Failed to create category")
      );
    }
  };

  // =========================
  // DELETE CATEGORY
  // =========================
  const deleteCategory = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/admin/category/deleteCategory`,
        {
          id,
        },
        {
          headers: getAuthHeaders(),
        }
      );

      alert("Category Deleted Successfully");

      await getCategories();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete category"
      );
    }
  };

  return (
    <div className="admin-layout">
      <div className="dashbord">
        <Sidebar />

        <h1>Category Management</h1>

        {/* =========================
            CREATE / UPDATE FORM
        ========================= */}

        <form onSubmit={handleSubmit} className="category-form">
          <h2>
            {isEdit ? "Update Category" : "Create Category"}
          </h2>

          <input
            type="text"
            placeholder="Category Name"
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
            type="text"
            placeholder="Parent Id"
            name="parentId"
            value={form.parentId}
            onChange={handleChange}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files?.[0] || null)
            }
          />

          <button type="submit">
            {isEdit ? "Update Category" : "Create Category"}
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

        {/* =========================
            ALL CATEGORIES
        ========================= */}

        <h2>All Categories</h2>

        <table className="category-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.length > 0 ? (
              categories.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>

                  <td>{item.description}</td>

                  <td>
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => editCategory(item)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() =>
                        deleteCategory(item._id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">
                  No Categories Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Category;
