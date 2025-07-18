import { useEffect, useState, useRef } from "react";
import axios from "axios";

const ClaimHistory = () => {
  const [claims, setClaims] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const pageRef = useRef(1);

  const fetchClaims = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const currentPage = pageRef.current;
      const res = await axios.get(`http://localhost:8000/api/claim/history?page=${currentPage}&limit=10`);

      setClaims((prev) => [...prev, ...res.data.data]);
      setHasMore(currentPage < res.data.totalPages);
      pageRef.current += 1;
    } catch (err) {
      console.error("Failed to fetch claims", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchedOnceRef = useRef(false);

  useEffect(() => {
    if (!fetchedOnceRef.current) {
      fetchClaims();
      fetchedOnceRef.current = true;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      if (nearBottom && hasMore && !loading) {
        fetchClaims();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-center text-blue-700">
        📜 Claim History
      </h1>

      <div className="space-y-4">
        {claims.map((claim) => (
          <div
            key={claim._id}
            className="flex justify-between items-center p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
          >
            <div>
              <p className="font-semibold text-gray-800">{claim.userId.name}</p>
              <p className="text-sm text-gray-500">
                {new Date(claim.claimedAt).toLocaleString()}
              </p>
            </div>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              +{claim.pointsClaimed} pts
            </span>
          </div>
        ))}
        {loading && <p className="text-center text-blue-500">Loading...</p>}
        {!hasMore && !loading && (
          <p className="text-center text-gray-400 text-sm">No more claim history.</p>
        )}
      </div>
    </div>
  );
};

export default ClaimHistory;