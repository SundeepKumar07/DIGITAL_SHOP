import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { categoriesData } from "../../static/data.jsx";
import { createProduct } from "../../redux/actions/productAction.js";
import { clearProductSuccess } from "../../redux/slices/productSlice.js";

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { isLoading, success, error, product } = useSelector((state) => state.product);
  const fileInputRef = useRef(null);
  console.log(product);
  const [form, setForm] = useState({
    images: [],
    name: "",
    description: "",
    category: "",
    tags: "",
    originalPrice: "",
    discountPrice: "",
    stock: "",
  });

  const onChangeValue = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ---------------- IMAGE HANDLING ---------------- */

  const handleImageChange = (files) => {
    const selectedFiles = Array.from(files);

    if (form.images.length + selectedFiles.length > 6) {
      toast.error("Maximum 6 images allowed");
      return;
    }

    setForm({
      ...form,
      images: [...form.images, ...selectedFiles],
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleImageChange(e.dataTransfer.files);
  };

  const removeImage = (index) => {
    const updatedImages = form.images.filter((_, i) => i !== index);
    setForm({ ...form, images: updatedImages });
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!seller?._id) {
      toast.error("Seller not found");
      return;
    }

    if (Number(form.discountPrice) > Number(form.originalPrice)) {
      toast.error("Discount cannot be greater than original price");
      return;
    }

    if (form.images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    const newForm = new FormData();

    Object.keys(form).forEach((key) => {
      if (key !== "images") {
        newForm.append(key, form[key]);
      }
    });

    form.images.forEach((image) => {
      newForm.append("images", image);
    });

    newForm.append("shopId", seller._id);

      dispatch(createProduct(newForm));
      // Reset form
      setForm({
        images: [],
        name: "",
        description: "",
        category: "",
        tags: "",
        originalPrice: "",
        discountPrice: "",
        stock: "",
      });
  };

  useEffect(()=> {
    if(error){
      toast.error(error);
    }
    if(success){
      toast.success("Product created successfully");
      dispatch(clearProductSuccess());
      navigate("/shop-dashboard");
    }
  }, [dispatch, error, success]);

  return (
    <div className="w-[90%] sm:w-[80%] bg-white shadow rounded p-4 sm:p-6 h-[80vh] overflow-y-scroll no-scrollbar">
      <h5 className="text-2xl font-semibold text-center mb-6">
        Create Product
      </h5>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* NAME */}
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={onChangeValue}
            required
            placeholder="Enter Product Name"
            className="w-full h-[45px] border px-3 rounded"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={onChangeValue}
            required
            placeholder="Enter Product Description"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label htmlFor="category" className="block font-medium mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={onChangeValue}
            required
            className="w-full h-[45px] border px-3 rounded"
          >
            <option value="">Choose Category</option>
            {categoriesData.map((item) => (
              <option key={item.title} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        {/* TAGS */}
        <div>
          <label htmlFor="tags" className="block font-medium mb-1">
            Tags (comma separated)
          </label>
          <input
            id="tags"
            type="text"
            name="tags"
            value={form.tags}
            onChange={onChangeValue}
            placeholder="Enter Product Tags"
            className="w-full h-[45px] border px-3 rounded"
          />
        </div>

        {/* PRICES */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="originalPrice" className="block font-medium mb-1">
              Original Price <span className="text-red-500">*</span>
            </label>
            <input
              id="originalPrice"
              type="number"
              name="originalPrice"
              value={form.originalPrice}
              onChange={onChangeValue}
              required
              placeholder="Enter Original Price"
              className="w-full h-[45px] border px-3 rounded"
            />
          </div>

          <div>
            <label htmlFor="discountPrice" className="block font-medium mb-1">
              Discount Price <span className="text-red-500">*</span>
            </label>
            <input
              id="discountPrice"
              type="number"
              name="discountPrice"
              value={form.discountPrice}
              onChange={onChangeValue}
              required
              placeholder="Enter Discount Price"
              className="w-full h-[45px] border px-3 rounded"
            />
          </div>
        </div>

        {/* STOCK */}
        <div>
          <label htmlFor="stock" className="block font-medium mb-1">
            Stock Quantity <span className="text-red-500">*</span>
          </label>
          <input
            id="stock"
            type="number"
            name="stock"
            value={form.stock}
            onChange={onChangeValue}
            required
            placeholder="Enter Stock"
            className="w-full h-[45px] border px-3 rounded"
          />
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="block font-medium mb-2">
            Product Images <span className="text-red-500">*</span>
          </label>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed p-6 text-center rounded cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          >
            Drag & Drop Images Here or Click to Upload (Max 6)
            <input
              type="file"
              multiple
              ref={fileInputRef}
              hidden
              onChange={(e) => handleImageChange(e.target.files)}
            />
          </div>
        </div>

        {/* IMAGE PREVIEW */}
        <div className="flex flex-wrap gap-3">
          {form.images.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-[90px] h-[90px] object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 rounded"
              >
                X
              </button>
            </div>
          ))}
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
        >
          {isLoading ? "Creating Product..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;