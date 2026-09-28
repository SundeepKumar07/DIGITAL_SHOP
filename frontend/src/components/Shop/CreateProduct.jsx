import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineCloudUpload, AiOutlineClose } from "react-icons/ai";
import { categoriesData } from "../../static/data.jsx";
import { createProduct } from "../../redux/actions/productAction.js";
import { clearProductErrors, clearProductSuccess } from "../../redux/slices/productSlice.js";

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { isLoading, success, error } = useSelector((state) => state.product);
  
  const fileInputRef = useRef(null);
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
      toast.error("Discount price cannot be greater than original price");
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
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearProductErrors());
    }
    if (success) {
      toast.success("Product created successfully!");
      dispatch(clearProductSuccess());
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
      navigate("/shop/create-product");
    }
  }, [dispatch, error, success, navigate]);

  return (
    <div className="w-full mx-4 sm:mx-8 mt-4 bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-gray-100 h-[83vh] overflow-y-auto no-scrollbar">
      <h5 className="text-2xl font-bold text-gray-800 text-center mb-8">
        Create Product Listing
      </h5>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
        {/* NAME */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={onChangeValue}
            required
            placeholder="Enter product title name..."
            className="w-full h-[45px] border border-gray-200 px-4 rounded-xl text-sm focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 focus:outline-none transition-all placeholder:text-gray-400"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={form.description}
            onChange={onChangeValue}
            required
            placeholder="Provide a comprehensive product description detailed review..."
            className="w-full border border-gray-200 px-4 py-3 rounded-xl text-sm focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 focus:outline-none transition-all placeholder:text-gray-400 resize-none"
          />
        </div>

        {/* CATEGORY & TAGS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={onChangeValue}
              required
              className="w-full h-[45px] border border-gray-200 px-4 rounded-xl text-sm focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 focus:outline-none transition-all text-gray-700"
            >
              <option value="" className="text-gray-400">Choose Category</option>
              {categoriesData.map((item) => (
                <option key={item.title} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Tags <span className="text-gray-400 font-normal">(comma separated)</span>
            </label>
            <input
              id="tags"
              type="text"
              name="tags"
              value={form.tags}
              onChange={onChangeValue}
              placeholder="e.g. summer, classic, leather"
              className="w-full h-[45px] border border-gray-200 px-4 rounded-xl text-sm focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 focus:outline-none transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* PRICES & STOCK GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="originalPrice" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Original Price <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">USD</span>
              <input
                id="originalPrice"
                type="number"
                name="originalPrice"
                value={form.originalPrice}
                onChange={onChangeValue}
                required
                placeholder="0.00"
                className="w-full h-[45px] border border-gray-200 pl-14 pr-4 rounded-xl text-sm focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 focus:outline-none transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="discountPrice" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Discount Price <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">USD</span>
              <input
                id="discountPrice"
                type="number"
                name="discountPrice"
                value={form.discountPrice}
                onChange={onChangeValue}
                required
                placeholder="0.00"
                className="w-full h-[45px] border border-gray-200 pl-14 pr-4 rounded-xl text-sm focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 focus:outline-none transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="stock" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Stock Quantity <span className="text-red-500">*</span>
            </label>
            <input
              id="stock"
              type="number"
              name="stock"
              value={form.stock}
              onChange={onChangeValue}
              required
              placeholder="Available units"
              className="w-full h-[45px] border border-gray-200 px-4 rounded-xl text-sm focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 focus:outline-none transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* IMAGE UPLOAD PANEL */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Product Images <span className="text-red-500">*</span> <span className="text-xs text-gray-400 font-normal">(Max 6 files)</span>
          </label>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
            className="border-2 border-dashed border-gray-200 hover:border-teal-500 hover:bg-teal-50/10 p-8 text-center rounded-2xl cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group"
          >
            <AiOutlineCloudUpload size={32} className="text-gray-400 group-hover:text-teal-600 transition-colors" />
            <p className="text-sm text-gray-600 font-medium">
              Drag & Drop images here or <span className="text-teal-600 hover:underline">browse files</span>
            </p>
            <input
              type="file"
              multiple
              ref={fileInputRef}
              hidden
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files)}
            />
          </div>
        </div>

        {/* IMAGE PREVIEW MATRIX */}
        {form.images.length > 0 && (
          <div className="flex flex-wrap gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
            {form.images.map((file, index) => (
              <div key={index} className="relative group w-[90px] h-[90px]">
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-full object-cover rounded-xl border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-600 active:scale-90"
                >
                  <AiOutlineClose size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ACTIONS TRIGGER BUTTON */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[50px] bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-all duration-200 active:scale-[0.99] disabled:bg-teal-600/50 disabled:cursor-not-allowed shadow-sm shadow-teal-600/10 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              "Publish Product Listing"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;