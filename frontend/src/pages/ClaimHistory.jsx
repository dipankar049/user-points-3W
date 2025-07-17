import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

const ClaimHistory = () => {
  const [claims, setClaims] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const seenIds = useRef(new Set());

  const observer = useRef();

  const lastClaimRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchClaims = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8000/api/claim/history?page=${page}&limit=10`);
      const newData = res.data.data.filter((item) => !seenIds.current.has(item._id));

      newData.forEach((item) => seenIds.current.add(item._id));
      setClaims((prev) => [...prev, ...newData]);

      setHasMore(page < res.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch claims", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims(page);
  }, [page]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-center text-blue-700">
        📜 Claim History
      </h1>

      <div className="space-y-4">
        {claims.map((claim, idx) => {
          const isLast = claims.length === idx + 1;
          return (
            <div
              key={claim._id}
              ref={isLast ? lastClaimRef : null}
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
          );
        })}
        {loading && <p className="text-center text-blue-500">Loading more...</p>}
        {!hasMore && !loading && (
          <p className="text-center text-gray-400 text-sm">No more claim history.</p>
        )}
      </div>
    </div>
  );
};

export default ClaimHistory;