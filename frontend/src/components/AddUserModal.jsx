import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const AddUserModal = ({ show, onClose, refreshUsers }) => {
  const [newUserName, setNewUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddUser = async () => {
    if (!newUserName.trim()) {
      alert("Name is required!");
      return;
    }
    try {
      setLoading(true);
      await axios.post("http://localhost:8000/api/users", {
        name: newUserName,
      });
      setNewUserName("");
      onClose();
      refreshUsers();
    } catch (err) {
      alert("Failed to add user (maybe duplicate name)");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 bg-white p-6 rounded-2xl shadow-2xl w-11/12 sm:w-96 border border-blue-100"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
              onClick={onClose}
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
              ➕ Add New User
            </h2>

            <input
              type="text"
              placeholder="Enter user name"
              className="w-full border border-gray-300 p-2 rounded-md mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              autoFocus
              disabled={loading}
            />

            <div className="flex justify-end gap-3">
              <button
                className="text-gray-600 hover:text-black text-sm"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm disabled:opacity-60"
                onClick={handleAddUser}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddUserModal;