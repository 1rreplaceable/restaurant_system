import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import api from "../../config/api";
import useRestaurantStore from "../../stores/restaurantStore";
import { FaArrowLeft, FaPlus, FaArrowsAltV, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Category {
  id: number;
  name: string;
  seq: number;
}

const CategoryManagement = () => {
  const { restaurantId } = useRestaurantStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await api.get(`/api/admin/categories/${restaurantId}`);
      setCategories(
        (response.data as Category[]).sort(
          (a: Category, b: Category) => a.seq - b.seq
        )
      );
    } catch (error) {
      console.error("카테고리 가져오기 실패:", error);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      const response = await api.post("/api/admin/categories", {
        name: newCategoryName,
        restaurantId,
      });
      setCategories((prev) =>
        [...prev, response.data as Category].sort((a, b) => a.seq - b.seq)
      );
      setNewCategoryName("");
    } catch (error) {
      console.error("카테고리 추가 실패:", error);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await api.delete(`/api/admin/categories/${id}`);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("카테고리 삭제 실패:", error);
    }
  };

  const handleDragEnd = async (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    setCategories((prevCategories) => {
      const reorderedCategories = Array.from(prevCategories);
      const [movedCategory] = reorderedCategories.splice(source.index, 1);
      reorderedCategories.splice(destination.index, 0, movedCategory);

      const updatedCategories = reorderedCategories.map((cat, index) => ({
        ...cat,
        seq: index + 1,
      }));

      updateCategoryOrder(updatedCategories);
      return updatedCategories;
    });
  };

  const updateCategoryOrder = async (categories: any) => {
    try {
      const payload = categories.map(({ id, seq }: any) => ({ id, seq }));
      await api.put("/api/admin/categories/reorder", payload);
    } catch (error) {
      console.error("순서 업데이트 실패:", error);
    }
  };

  useEffect(() => {
    if (restaurantId) {
      fetchCategories();
    }
  }, [restaurantId]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <header className="flex justify-between items-center mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-800">카테고리 관리</h1>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors duration-200"
          >
            <FaArrowLeft className="text-sm" />
            <span>뒤로가기</span>
          </button>
        </header>

        <div className="flex items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="새 카테고리 이름"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          />
          <button
            onClick={handleAddCategory}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
          >
            <span>추가</span>
            <FaPlus className="text-sm" />
          </button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="categories">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2 bg-white rounded-lg p-4"
              >
                {categories.map((category, index) => (
                  <Draggable
                    key={category.id}
                    draggableId={category.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex justify-between items-center p-4 bg-gray-50 rounded-lg mb-2 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <FaArrowsAltV className="text-gray-400" />
                          <span className="text-lg font-medium text-gray-700">
                            {category.name}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center gap-2"
                        >
                          <span>삭제</span>
                          <FaTrash className="text-sm" />
                        </button>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default CategoryManagement;
