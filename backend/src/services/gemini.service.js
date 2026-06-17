import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
console.log("env", process.env.GEMINI_API_KEY);

console.log("Key Loaded:", !!process.env.GEMINI_API_KEY);
console.log("Key Prefix:", process.env.GEMINI_API_KEY?.substring(0, 10));

export const analyzeEnglishText = async (text) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = `You are an English teacher for Hindi-speaking students.
  Analyze the following English text and return only valid JSON in this format : 
  {
    "correctedText" : "Corrected English version",
    "summaryHindi" : "Hinglish me summary",
     "mistakes": [
    {
      "wrong": "wrong phrase",
      "correct": "correct phrase",
      "explanationHindi": "Hindi explanation"
    }
  ],
  "scores": {
    "grammar": 7,
    "clarity": 7,
    "vocabulary": 6,
    "overall": 7
  },
  "level": "Beginner",
  "weakAreas": ["Grammar"],
  "personalizedExercises": ["Exercise 1 in Hindi"],
  "motivationHindi": "Hindi motivation message in Hinglish"

  }
  
  User text : "${text}"

  Return ONLY JSON, no extra text.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const rawText = response.text();

  const jsonMatch = rawText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Invalid response from Gemini");
  }

  return JSON.parse(jsonMatch[0]);
};
