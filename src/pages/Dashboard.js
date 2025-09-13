// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerTable from "../components/CustomerTable";
import TopCustomersChart from "../components/TopCustomersChart";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [metrics, setMetrics] = useState({ totalCustomers: 0, totalOrders: 0, totalRevenue: 0 });
  const [orders, setOrders] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL; // ✅ use env

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchWithAuth = async (endpoint, setter) => {
      try {
        const res = await fetch(`${BACKEND_URL}${endpoint}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.status === 401 || res.status === 403 || (data.error && data.error.toLowerCase().includes("invalid"))) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        setter(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    const run = async () => {
      setLoading(true);
      await Promise.all([
        fetchWithAuth("/api/dashboard/metrics", setMetrics),
        fetchWithAuth("/api/dashboard/orders", setOrders),
        fetchWithAuth("/api/dashboard/top-customers", setTopCustomers),
      ]);
      setLoading(false);
    };

    run();
  }, [navigate, BACKEND_URL]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Insight Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <section>
            <h2>Totals</h2>
            <p>Total Customers: {metrics.totalCustomers ?? 0}</p>
            <p>Total Orders: {metrics.totalOrders ?? 0}</p>
            <p>Total Revenue: ${Number(metrics.totalRevenue ?? 0).toFixed(2)}</p>
          </section>

          <section style={{ marginTop: 20 }}>
            <h2>Revenue Over Time</h2>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart
                  data={orders.map(o => ({
                    date: new Date(o.order_date).toLocaleDateString(),
                    orders: o.orders_count,
                    revenue: Number(o.revenue),
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="orders" stroke="#8884d8" />
                  <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section style={{ marginTop: 20 }}>
            <h2>Top Customers</h2>
            <CustomerTable customers={topCustomers} />
          </section>

          <section style={{ marginTop: 20 }}>
            <h2>Top Customers - Bar Chart</h2>
            <TopCustomersChart customers={topCustomers} />
          </section>
        </>
      )}
    </div>
  );
}
