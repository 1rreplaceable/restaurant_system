import React, { useState } from "react";

interface Menu {
  id: number;
  name: string;
  price: number;
}

const MenuManagement = () => {
  const [menus, setMenus] = useState<Menu[]>([
    { id: 1, name: "메뉴1", price: 10000 },
    { id: 2, name: "메뉴2", price: 12000 },
  ]);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const openModal = (menu: Menu | null = null) => {
    setSelectedMenu(menu || { id: Date.now(), name: "", price: 0 });
    setIsEditing(!!menu);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMenu(null);
    setIsModalOpen(false);
  };

  const handleSave = () => {
    if (!selectedMenu) return;

    if (isEditing) {
      setMenus(
        menus.map((menu) => (menu.id === selectedMenu.id ? selectedMenu : menu))
      );
    } else {
      setMenus([
        ...menus,
        { id: Date.now(), name: selectedMenu.name, price: selectedMenu.price },
      ]);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    setMenus(menus.filter((menu) => menu.id !== id));
  };

  return (
    <div className="h-screen bg-white p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">메뉴 관리</h1>
      <button
        onClick={() => openModal()}
        className="mb-4 px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
      >
        메뉴 추가
      </button>
      <ul className="divide-y divide-gray-300">
        {menus.map((menu) => (
          <li
            key={menu.id}
            className="flex justify-between items-center p-4 hover:bg-gray-100 transition"
          >
            <div>
              <h2 className="text-lg font-medium text-gray-700">{menu.name}</h2>
              <p className="text-sm text-gray-500">{menu.price}원</p>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => openModal(menu)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              >
                수정
              </button>
              <button
                onClick={() => handleDelete(menu.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "메뉴 수정" : "메뉴 추가"}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="메뉴 이름"
                value={selectedMenu?.name || ""}
                onChange={(e) =>
                  setSelectedMenu((prev) =>
                    prev ? { ...prev, name: e.target.value } : null
                  )
                }
                className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="가격"
                value={selectedMenu?.price || ""}
                onChange={(e) =>
                  setSelectedMenu((prev) =>
                    prev ? { ...prev, price: +e.target.value } : null
                  )
                }
                className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
