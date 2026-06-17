import { PracticeAttempt } from "../models/practiceAttempt.model.js";
import { analyzeEnglishText } from "../services/groq.service.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const analyzePractice = asyncHandler(async (req, res) => {
  const { mode, prompt, text } = req.body;
  if (!text || text.length < 10) {
    throw new ApiError(400, "Text must be at least 10 characters");
  }

  const feedback = await analyzeEnglishText(text);
  const attempt = await PracticeAttempt.create({
    user: req.user._id,
    mode,
    prompt: prompt || "",
    originalText: text,
    feedback,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, attempt, "message send successfully"));
});
