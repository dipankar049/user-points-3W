import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function UserCard({ user, rank, refreshUsers }) {
  const [recentPoints, setRecentPoints] = useState(null);
  const [animating, setAnimating] = useState(false);
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleClaim = async (id) => {
    try {
      const res = await axios.post(`http://localhost:8000/api/claim/${id}`);
      const gained = res.data.pointsClaimed;
      setRecentPoints(gained);
      setAnimating(true);
      await delay(500);
      await refreshUsers();

      setTimeout(() => {
        setRecentPoints(null);
        setAnimating(false);
      }, 1000);
    } catch (err) {
      alert("Failed to claim points");
      console.error(err);
    }
  };

  const rankColors = {
    1: "from-yellow-400 to-yellow-600",
    2: "from-gray-400 to-gray-600",
    3: "from-orange-400 to-orange-600",
  };

  const avatarBorder = rankColors[rank] || "from-blue-200 to-blue-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-md flex justify-between items-center border border-gray-200 hover:shadow-lg transition-all"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Rank */}
        <div className="text-lg sm:text-2xl font-bold text-gray-700 w-6 sm:w-10 text-right">
          #{rank}
        </div>

        {/* Avatar */}
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${avatarBorder} flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-inner`}
        >
          {user.name[0].toUpperCase()}
        </div>

        {/* Info */}
        <div>
          <p className="font-semibold text-sm sm:text-lg text-gray-800 tracking-wide">
            {user.name}
          </p>
          <p className="text-xs sm:text-sm text-gray-600">
            Total Points:{" "}
            <span className="font-medium text-gray-700">{user.totalPoints}</span>

            {/* +points effect */}
            <AnimatePresence>
              {recentPoints !== null && (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.8 }}
                  className="ml-2 text-2xl text-green-600 font-semibold"
                >
                  +{recentPoints}
                </motion.span>
              )}
            </AnimatePresence>
          </p>
        </div>
      </div>

      {/* Claim Button */}
      <button
        onClick={() => handleClaim(user._id)}
        disabled={animating}
        className={`ml-2 sm:ml-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base font-medium shadow-md transition-transform duration-200 ${
          animating ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        Claim
      </button>
    </motion.div>
  );
}
