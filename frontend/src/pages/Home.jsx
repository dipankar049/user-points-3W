import UserCard from "../components/UserCard";

const Home = ({ users, loading, refreshUsers }) => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🏆 Leaderboard</h1>

      {loading ? (
        <div className="text-center py-12 text-lg font-semibold text-blue-600 animate-pulse">
          Loading users...
        </div>
      ) : (
        <div className="grid gap-4">
          {users.map((user, idx) => (
            <UserCard
              key={user._id}
              user={user}
              rank={idx + 1}
              refreshUsers={refreshUsers}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;