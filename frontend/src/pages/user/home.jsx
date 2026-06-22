import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Server_URL } from "../../utils/config";
import Preloader from "../../components/Preloader";
import categoryImage from "../../assets/category.png";
import booksImage from "../../assets/book.png";
import studentsImage from "../../assets/students.png";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
 

  const [stats, setStats] = useState({
    totalCategories: 0,
    totalBooks: 0,
    totalActiveStudents: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`${Server_URL}home`);

      console.log("HOME API RESPONSE:", data);

      setStats(
        data?.stats || {
          totalCategories: 0,
          totalBooks: 0,
          totalActiveStudents: 0,
        }
      );

      setCategories(data?.categories || []);
      setNewArrivals(data?.newArrivals || []);

    } catch (error) {
      console.error("Error fetching home data:", error);

      setStats({
        totalCategories: 0,
        totalBooks: 0,
        totalActiveStudents: 0,
      });

      setCategories([]);
      setNewArrivals([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Preloader />;

  return (
    <div className="library-homepage">

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">

            <div className="stat-cardhome">
              <h3><span className="dashboad-icon"><img src={categoryImage} alt="Category" /></span>{stats?.totalCategories || 0}+</h3>
              <p>Total Categories</p>
            </div>

            <div className="stat-cardhome">
              <h3><span className="dashboad-icon"><img src={booksImage} alt="Book" /></span>{stats?.totalBooks || 0}+</h3>
              <p>Total Books</p>
            </div>

            <div className="stat-cardhome">
              <h3><span className="dashboad-icon"><img src={studentsImage} alt="Student" /></span>{stats?.totalActiveStudents || 0}</h3>
              <p>Active Students</p>
            </div>

          </div>
        </div>
      </section>

      <section className="categories-section">
        <h2 className="dashboard-title">Categories</h2>

        {categories.length === 0 ? (
          <p>No categories found.</p>
        ) : (
          categories.map((cat, index) => (
            <div
              key={index}
              className="category-card"
              onClick={() =>
                navigate(`/books?category=${encodeURIComponent(cat.category)}`)
              }
              style={{ cursor: "pointer" }}
            >
              <h3>{cat.category}</h3>
              <p>Books: {cat.count}</p>
            </div>
          ))
        )}
      </section>

      <section className="new-arrivals-section">
        <h2 className="dashboard-title">New Arrivals</h2>

        {newArrivals.length === 0 ? (
          <p>No books found.</p>
        ) : (
          newArrivals.map((book) => (
            <div
              key={book._id}
              className="homebook-card"
              onClick={() => navigate(`/bookdetails/${book._id}`)}
              style={{ cursor: "pointer" }}
            >
              <h3>{book.title}</h3>
              <p>{book.author}</p>
            </div>
          ))
        )}
      </section>

    </div>
  );
}