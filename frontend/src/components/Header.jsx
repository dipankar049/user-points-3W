import { Plus, History } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({ onAddUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToHome = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const goToClaimHistory = () => {
    if (location.pathname !== "/claim-history") {
      navigate("/claim-history");
    }
  };

  return (
    <header className="flex justify-between items-center px-4 py-3 shadow-sm bg-white sticky top-0 z-50">
      {/* Left: Logo / App Name */}
      <h1
        onClick={goToHome}
        className="text-xl sm:text-2xl font-bold text-blue-700 cursor-pointer"
        title="Go to Home"
      >
        🏅 PointRank
      </h1>

      {/* Right: Action Buttons */}
      <div className="flex gap-4 items-center">
        <button
          onClick={onAddUser}
          className="text-blue-600 hover:text-blue-800"
          title="Add User"
        >
          <Plus size={24} />
        </button>
        <button
          onClick={goToClaimHistory}
          className="text-gray-700 hover:text-black"
          title="Claim History"
        >
          <History size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
