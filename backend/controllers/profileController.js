import Profile from "../models/Profile.js";

export const getProfile = async (req, res) => {
  try {
    // There is usually only one profile, so we grab the first one
    const profile = await Profile.findOne();
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    // Updates the first document found (since you are the only user)
    // upsert: true means "create it if it doesn't exist"
    const updatedProfile = await Profile.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};