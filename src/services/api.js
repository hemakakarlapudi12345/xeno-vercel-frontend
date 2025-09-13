import axios from "axios";

// ✅ Backend runs on port 3000
const API_BASE = "http://localhost:3000/api";

// Create axios instance with default headers
const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  },
});

// -------- Dashboard Metrics --------
export const getDashboardData = async () => {
  try {
    const { data } = await axiosInstance.get("/dashboard/metrics");
    return {
      totalCustomers: data.totalCustomers ?? data.total_customers ?? 0,
      totalOrders: data.totalOrders ?? data.total_orders ?? 0,
      totalRevenue: parseFloat(data.totalRevenue ?? data.total_revenue ?? 0),
    };
  } catch (err) {
    console.error("❌ Error fetching dashboard metrics:", err.message);
    return { totalCustomers: 0, totalOrders: 0, totalRevenue: 0 };
  }
};

// -------- Orders --------
export const getOrders = async () => {
  try {
    const { data } = await axiosInstance.get("/dashboard/orders");
    return Array.isArray(data)
      ? data.map((item) => ({
          order_date: item.order_date || item.date || "",
          orders_count: parseInt(item.orders_count ?? item.count ?? 0),
          revenue: parseFloat(item.revenue ?? 0),
        }))
      : [];
  } catch (err) {
    console.error("❌ Error fetching orders:", err.message);
    return [];
  }
};

// -------- Top Customers --------
export const getTopCustomers = async () => {
  try {
    const { data } = await axiosInstance.get("/dashboard/top-customers");
    return Array.isArray(data)
      ? data.map((c) => ({
          customer_id: c.customer_id ?? c.id,
          first_name: c.first_name ?? "",
          last_name: c.last_name ?? "",
          email: c.email ?? c.customer_email ?? "",
          city: c.city ?? "-",
          state: c.state ?? "-",
          total_spent: parseFloat(c.total_spent ?? c.spend ?? 0),
        }))
      : [];
  } catch (err) {
    console.error("❌ Error fetching top customers:", err.message);
    return [];
  }
};
