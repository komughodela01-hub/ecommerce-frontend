
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Auth.css";
import Sidebar from "../components/Sidebar";

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


  const getCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3003/admin/category/getAllCategory",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to get categories");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


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

    // Form ke top par le jayega
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("description", form.description);

      if (form.parentId) {
        formData.append("parentId", form.parentId);
      }

      formData.append("status", form.status ? "Y" : "N");

      // Image only if selected
      if (image) {
        formData.append("profileImage", image);
      }

      // =========================
      // UPDATE
      // =========================
      if (isEdit) {
        formData.append("id", form.id);

        await axios.post(
          "http://localhost:3003/admin/category/updateCategory",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
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
          "http://localhost:3003/admin/category/createCategory",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Category Created Successfully");
      }

      // Refresh categories
      await getCategories();

      // Reset form
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
  // Delete Category
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
        "http://localhost:3003/admin/category/deleteCategory",
        {
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Category Deleted Successfully");

      getCategories();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message || "Failed to delete category"
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
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button type="submit">
            {isEdit ? "Update Category" : "Create Category"}
          </button>

          {/* Cancel button only in edit mode */}
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
                    {/* EDIT / UPDATE */}
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => editCategory(item)}
                    >
                      Edit
                    </button>

                    {/* DELETE */}
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => deleteCategory(item._id)}
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

