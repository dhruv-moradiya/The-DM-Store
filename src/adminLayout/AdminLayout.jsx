import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'

function AdminLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <AdminSidebar />
      <Outlet />
    </div>
  )
}

export default AdminLayout