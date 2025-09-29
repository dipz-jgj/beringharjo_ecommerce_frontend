import React from "react";
import { ProductCategory } from "../../types";

interface CategoryFilterProps {
  categories: ProductCategory[];
  selectedCategory: ProductCategory | null;
  onCategorySelect: (category: ProductCategory | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="font-semibold text-lg mb-4">Categories</h3>
      <div className="space-y-2">
        <button
          onClick={() => onCategorySelect(null)}
          className={`w-full text-left p-2 rounded ${
            selectedCategory === null
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-200"
          }`}
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategorySelect(category)}
            className={`w-full text-left p-2 rounded capitalize ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {category.replace("_", "")}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
