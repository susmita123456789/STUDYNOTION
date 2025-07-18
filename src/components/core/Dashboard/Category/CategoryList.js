import CreateCategoryForm from "./CreateCategoryForm";
import { useSelector } from "react-redux";

export default function CategoryList() {
  const categories = useSelector((state) => state.course.categories);

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">Manage Categories</h1>
      <CreateCategoryForm />
      <div className="mt-6 space-y-4">
        {categories && categories.length > 0 ? (
          categories.map((cat) => (
            <div key={cat._id} className="p-4 border rounded-md bg-gray-800 text-white">
              <h3 className="text-lg font-semibold">{cat.name}</h3>
              <p className="text-sm text-gray-300">{cat.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No categories found.</p>
        )}
      </div>
    </div>
  );
}
