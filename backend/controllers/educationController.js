import Education from "../models/Education.js";

export const getEducation = async (req, res) => {
  try {
    const education = await Education.find().sort({ year: -1 });
    res.status(200).json(education);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEducation = async (req, res) => {
  const edu = new Education(req.body);
  try {
    const newEdu = await edu.save();
    res.status(201).json(newEdu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Education deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const updatedEdu = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedEdu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};