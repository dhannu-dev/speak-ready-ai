export type InterviewPhase = "select" | "session" | "feedback";

export type JobRole = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
};

export type InterviewQuestion = {
  id: number;
  question: string;
};

export type CategoryScore = {
  label: string;
  score: number;
  maxScore: number;
};

export type InterviewFeedback = {
  overallScore: number;
  categoryScores: CategoryScore[];
  strengths: string[];
  improvements: string[];
};

export const jobRoles: JobRole[] = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    description: "Backend, frontend, full-stack development roles",
    icon: "💻",
    color: "blue",
  },
  {
    id: "product-manager",
    title: "Product Manager",
    description: "Product strategy, roadmap, and cross-functional leadership",
    icon: "📋",
    color: "violet",
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    description: "Machine learning, analytics, and data-driven decisions",
    icon: "📊",
    color: "emerald",
  },
  {
    id: "marketing",
    title: "Marketing Manager",
    description: "Brand strategy, campaigns, and growth marketing",
    icon: "📣",
    color: "amber",
  },
  {
    id: "designer",
    title: "UI/UX Designer",
    description: "User research, wireframing, and design systems",
    icon: "🎨",
    color: "rose",
  },
  {
    id: "business-analyst",
    title: "Business Analyst",
    description: "Requirements gathering, process improvement, and data analysis",
    icon: "📈",
    color: "cyan",
  },
];

export const questionsByRole: Record<string, InterviewQuestion[]> = {
  "software-engineer": [
    { id: 1, question: "Tell me about yourself and your experience as a software engineer." },
    { id: 2, question: "Describe a challenging technical problem you solved recently. How did you approach it?" },
    { id: 3, question: "How do you ensure code quality and maintainability in your projects?" },
    { id: 4, question: "Tell me about a time you had to collaborate with a difficult teammate. How did you handle it?" },
    { id: 5, question: "Where do you see yourself in the next 5 years in the tech industry?" },
  ],
  "product-manager": [
    { id: 1, question: "Walk me through your experience managing a product from ideation to launch." },
    { id: 2, question: "How do you prioritize features when you have limited engineering resources?" },
    { id: 3, question: "Describe a time when you had to say no to a stakeholder. How did you handle it?" },
    { id: 4, question: "How do you measure the success of a product feature after launch?" },
    { id: 5, question: "Tell me about a product decision that didn't go as planned. What did you learn?" },
  ],
  "data-scientist": [
    { id: 1, question: "Tell me about your background and what drew you to data science." },
    { id: 2, question: "Describe a project where you used machine learning to solve a real-world problem." },
    { id: 3, question: "How do you handle missing or dirty data in your analysis?" },
    { id: 4, question: "Explain a complex technical concept to a non-technical stakeholder." },
    { id: 5, question: "How do you stay current with the latest developments in AI and data science?" },
  ],
  marketing: [
    { id: 1, question: "Tell me about your marketing experience and a campaign you're proud of." },
    { id: 2, question: "How do you approach creating a marketing strategy for a new product?" },
    { id: 3, question: "Describe a time when a campaign didn't perform as expected. What did you do?" },
    { id: 4, question: "How do you measure ROI on marketing campaigns across different channels?" },
    { id: 5, question: "How do you stay ahead of marketing trends and adapt your strategy?" },
  ],
  designer: [
    { id: 1, question: "Walk me through your design process from brief to final deliverable." },
    { id: 2, question: "Tell me about a time you received harsh feedback on your design. How did you respond?" },
    { id: 3, question: "How do you balance user needs with business goals in your designs?" },
    { id: 4, question: "Describe your experience working with developers to implement your designs." },
    { id: 5, question: "How do you ensure your designs are accessible to all users?" },
  ],
  "business-analyst": [
    { id: 1, question: "Tell me about your experience gathering and documenting business requirements." },
    { id: 2, question: "Describe a situation where you identified a process improvement that saved time or money." },
    { id: 3, question: "How do you handle conflicting requirements from different stakeholders?" },
    { id: 4, question: "Tell me about a time you used data to influence a business decision." },
    { id: 5, question: "How do you ensure your analysis accurately reflects the business needs?" },
  ],
};

export const mockFeedback: InterviewFeedback = {
  overallScore: 8.2,
  categoryScores: [
    { label: "Confidence", score: 8, maxScore: 10 },
    { label: "Clarity", score: 9, maxScore: 10 },
    { label: "Grammar", score: 7, maxScore: 10 },
    { label: "Relevance", score: 9, maxScore: 10 },
  ],
  strengths: [
    "Clear and structured responses with strong examples",
    "Good use of the STAR method for behavioral questions",
    "Confident tone and professional vocabulary",
    "Strong eye contact and engagement throughout",
  ],
  improvements: [
    "Some answers could be more concise — aim for 1-2 minutes per response",
    "Include more quantifiable achievements (numbers, percentages)",
    "Practice smoother transitions between topics",
    "Work on reducing filler words like 'um' and 'uh'",
  ],
};
