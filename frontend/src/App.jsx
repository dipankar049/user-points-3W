import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import AddUserModal from "./components/AddUserModal";
import axios from "axios";
import ClaimHistory from "./pages/ClaimHistory";
const baseUrl = import.meta.env.VITE_API_URL;

function App() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/api/users`);
      const sorted = res.data.sort((a, b) => b.totalPoints - a.totalPoints);
      setUsers(sorted);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <BrowserRouter>
      <Header onAddUser={() => setShowAddModal(true)} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              users={users}
              loading={loading}
              refreshUsers={fetchUsers}
            />
          }
        />
        <Route path="/claim-history" element={<ClaimHistory />} />
      </Routes>

      {/* Global modal rendering */}
      <AddUserModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        refreshUsers={fetchUsers}
      />

    </BrowserRouter>
  );
}

export default App;
