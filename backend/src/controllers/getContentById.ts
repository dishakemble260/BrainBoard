import { Request, Response } from "express";
import { ContentModel } from "../models/content";

export const getContentById = async (req: Request, res: Response) => {
  const { contentId } = req.params;

  if (!contentId) {
    return res.status(400).json({ message: "Content ID is required" });
  }

  try {
    const contentData = await ContentModel.findById(contentId);

    if (!contentData) {
      return res.status(404).json({ message: "Content not found" });
    }

    return res.status(200).json(contentData); // returns flat object
  } catch (error) {
    console.error("Error fetching content:", error);
    return res.status(500).json({ message: "Failed to fetch content" });
  }
};
