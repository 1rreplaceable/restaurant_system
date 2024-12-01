import React from 'react';

const categories = ['안주', '튀김', '주류', '음료', '추가메뉴', '포장메뉴'];

const CategoryTabs: React.FC<{ onSelect: (category: string) => void }> = ({ onSelect }) => {
  return (
    <div className="flex flex-col space-y-2 bg-gray-800 text-white p-2">
      {categories.map((category) => (
        <button
          key={category}
          className="px-4 py-2 rounded hover:bg-gray-600"
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
