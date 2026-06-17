import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const analyzeEnglishText = async (text) => {
  const prompt = `You are an English teacher for Hindi-speaking students.
  Analyze the following English text and return only valid JSON in this format.
  IMPORTANT: All Hindi text must be written in Hinglish (Roman/English script), NOT in Devanagari script. For example write "aapkaafi achha likhte ho" NOT "आप काफी अच्छा लिखते हो".
  
  JSON format:
  {
    "correctedText" : "Corrected English version",
    "summaryHindi" : "Summary in Hinglish using Roman script",
    "mistakes": [
    {
      "wrong": "wrong phrase",
      "correct": "correct phrase",
      "explanationHindi": "Explanation in Hinglish using Roman script"
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
  "personalizedExercises": ["Exercise in Hinglish using Roman script"],
  "motivationHindi": "Motivation message in Hinglish using Roman script"

  }
  
  User text : "${text}"

  Return ONLY JSON, no extra text.
  `;

  const result = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.1-8b-instant",
    temperature: 0.7,
  });

  const rawText = result.choices[0].message.content;

  const jsonMatch = rawText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Invalid response from Groq");
  }

  return JSON.parse(jsonMatch[0]);
};
