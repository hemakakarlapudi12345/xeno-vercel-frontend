// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerTable from "../components/CustomerTable";
import TopCustomersChart from "../components/TopCustomersChart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    totalCustomers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    avgOrderValue: 0,
    repeatCustomers: 0,
  });
  const [orders, setOrders] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchWithAuth = async (url, setter) => {
      try {
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (
          res.status === 401 ||
          res.status === 403 ||
          (data.error && data.error.toLowerCase().includes("invalid"))
        ) {
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
        fetchWithAuth("http://localhost:5000/api/dashboard/metrics", setMetrics),
        fetchWithAuth(
          `http://localhost:5000/api/dashboard/orders${
            dateRange.start && dateRange.end
              ? `?start=${dateRange.start}&end=${dateRange.end}`
              : ""
          }`,
          setOrders
        ),
        fetchWithAuth(
          "http://localhost:5000/api/dashboard/top-customers",
          setTopCustomers
        ),
      ]);
      setLoading(false);
    };

    run();
  }, [navigate, dateRange]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <div className="dashboard">
      <style>{`
        .dashboard {
          padding: 20px;
          font-family: Arial, sans-serif;
          background: #f9fafc;
        }
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .dashboard-header h1 {
          margin: 0;
          color: #333;
        }
        .logout-btn {
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          background: #ff4d4f;
          color: white;
          cursor: pointer;
          transition: 0.3s;
        }
        .logout-btn:hover {
          background: #d9363e;
        }
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }
        .metric-card {
          background: white;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }
        .metric-card:hover {
          transform: translateY(-3px);
        }
        .metric-card h3 {
          margin: 0 0 10px 0;
          font-size: 16px;
          color: #555;
        }
        .metric-card p {
          font-size: 20px;
          font-weight: bold;
          color: #111;
        }
        .filters {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }
        .filters input, .filters button {
          padding: 6px 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
        }
        .filters button {
          background: #007bff;
          color: white;
          cursor: pointer;
        }
        .filters button:hover {
          background: #0056b3;
        }
        section {
          margin-top: 30px;
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        section h2 {
          margin-bottom: 15px;
          color: #333;
        }
      `}</style>

      <div className="dashboard-header">
        <h1>Insight Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Metrics */}
          <section>
            <h2>Key Metrics</h2>
            <div className="metrics-grid">
              <div className="metric-card">
                <h3>Total Customers</h3>
                <p>{metrics.totalCustomers ?? 0}</p>
              </div>
              <div className="metric-card">
                <h3>Total Orders</h3>
                <p>{metrics.totalOrders ?? 0}</p>
              </div>
              <div className="metric-card">
                <h3>Total Revenue</h3>
                <p>${Number(metrics.totalRevenue ?? 0).toFixed(2)}</p>
              </div>
              <div className="metric-card">
                <h3>Avg. Order Value</h3>
                <p>${Number(metrics.avgOrderValue ?? 0).toFixed(2)}</p>
              </div>
              <div className="metric-card">
                <h3>Repeat Customers</h3>
                <p>{metrics.repeatCustomers ?? 0}</p>
              </div>
            </div>
          </section>

          {/* Date Filters */}
          <section>
            <h2>Filters</h2>
            <div className="filters">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              />
              <button onClick={() => setDateRange({ start: "", end: "" })}>
                Reset
              </button>
            </div>
          </section>

          {/* Orders & Revenue Line Chart */}
          <section>
            <h2>Orders & Revenue Over Time</h2>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart
                  data={orders.map((o) => ({
                    date: new Date(o.order_date).toLocaleDateString(),
                    orders: o.orders_count,
                    revenue: Number(o.revenue),
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#8884d8" />
                  <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Pie Chart */}
          <section>
            <h2>Customer Contribution (Revenue Share)</h2>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={topCustomers.map((c) => ({
                      name: c.customer_name,
                      value: Number(c.total_spent),
                    }))}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {topCustomers.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Top Customers Table */}
          <section>
            <h2>Top Customers - Table</h2>
            <CustomerTable customers={topCustomers} />
          </section>

          {/* Top Customers Bar Chart */}
          <section>
            <h2>Top Customers - Bar Chart</h2>
            <TopCustomersChart customers={topCustomers} />
          </section>
        </>
      )}
    </div>
  );
}
