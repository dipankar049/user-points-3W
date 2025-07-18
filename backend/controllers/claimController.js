const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// Claim random points for user
exports.claimPoints = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const points = Math.floor(Math.random() * 10) + 1;
    user.totalPoints += points;
    await user.save();

    const history = new ClaimHistory({ userId, pointsClaimed: points });
    await history.save();

    res.json({ message: 'Points claimed', user, pointsClaimed: points });
  } catch (err) {
    res.status(500).json({ message: 'Claim failed', error: err.message });
  }
};

// Get leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      name: user.name,
      totalPoints: user.totalPoints
    }));
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch leaderboard' });
  }
};

// Get claim history for all users
exports.getClaimHistory = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const [total, history] = await Promise.all([
      ClaimHistory.countDocuments(),
      ClaimHistory.find()
        .populate("userId", "name")
        .sort({ claimedAt: -1 })
        .skip(skip)
        .limit(limit)
    ]);

    res.status(200).json({
      data: history,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("Claim history fetch error:", err);
    res.status(500).json({ message: "Failed to fetch claim history" });
  }
};