import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50">
      <header className="p-6 bg-blue-700 text-white text-center shadow-md">
        <h1 className="text-2xl font-semibold tracking-wide">
          관리자 대시보드
        </h1>
      </header>

      <div className="flex flex-wrap justify-center items-center gap-8 mt-16">
        <Link
          to="/admin/menu-management"
          className="w-60 h-36 bg-white rounded-lg shadow-md flex flex-col justify-center items-center border hover:border-blue-700 transition-all duration-300"
        >
          <div className="text-blue-700 text-xl font-medium">메뉴 관리</div>
        </Link>

        <Link
          to="/admin/table-status"
          className="w-60 h-36 bg-white rounded-lg shadow-md flex flex-col justify-center items-center border hover:border-yellow-500 transition-all duration-300"
        >
          <div className="text-yellow-500 text-xl font-medium">테이블 상태</div>
        </Link>

        <Link
          to="/admin/settings"
          className="w-60 h-36 bg-white rounded-lg shadow-md flex flex-col justify-center items-center border hover:border-red-500 transition-all duration-300"
        >
          <div className="text-red-500 text-xl font-medium">설정 관리</div>
        </Link>
        <Link
          to="/admin/category-management"
          className="w-60 h-36 bg-white rounded-lg shadow-md flex flex-col justify-center items-center border hover:border-green-500 transition-all duration-300"
        >
          <div className="text-green-500 text-xl font-medium">
            카테고리 관리
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
