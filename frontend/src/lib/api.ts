export type BackendStatus = {
  message: string;
  environment: string;
  serverTime: string;
};

export type TestingApiResponse = {
  statusCode: number;
  data: string;
  message: string;
  success: boolean;
};

export type RegisterApiResponse = {
  name: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  statusCode: number;
  data: {
    _id: string;
    name: string;
    email: string;
  };
  message: string;
  success: boolean;
};

export type LogoutResponse = {
  statusCode: number;
  message: string;
  success: boolean;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type PracticeInput = {
  mode: string;
  prompt: string;
  text: string;
};

export type PracticeResponse = {
  statusCode: number;
  data: {
    _id: string;
    user: string;
    mode: string;
    prompt: string;
    originalText: string;
    feedback: {
      correctedText: string;
      summaryHindi: string;
      level: string;
      scores: {
        grammar: number;
        clarity: number;
        vocabulary: number;
        overall: number;
      };
      mistakes: {
        wrong: string;
        correct: string;
        explanationHindi: string;
      }[];
      weakAreas: string[];
      personalizedExercises: string[];
      motivationHindi: string;
    };
  };
  message: string;
  success: boolean;
};

export type LoginResponse = {
  statusCode: number;
  data: {
    user: {
      _id: string;
      name: string;
      email: string;
    };
    accessToken: string;
    refreshToken: string;
  };
  message: string;
  success: boolean;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getBackendStatus(): Promise<BackendStatus> {
  const response = await fetch(`${API_URL}/api/v1/status`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Backend request failed with status ${response.status}`);
  }

  return response.json();
}

export async function getTestingApi(): Promise<TestingApiResponse> {
  const response = await fetch(`${API_URL}/testing`);

  if (!response.ok) {
    throw new Error(`Testing API failed with status ${response.status}`);
  }

  return response.json();
}

export const registerUser = async (
  input: RegisterApiResponse,
): Promise<RegisterApiResponse> => {
  const response = await fetch(`${API_URL}/api/v1/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(input),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }
  return data;
};

export const loginUser = async (input: LoginInput): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/api/v1/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(input),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export const logout = async (): Promise<LogoutResponse> => {
  const response = await fetch(`${API_URL}/api/v1/users/logout`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Logout failed");
  }

  return data;
};

export const practiceAPI = async (
  input: PracticeInput,
): Promise<PracticeResponse> => {
  const response = await fetch(`${API_URL}/api/v1/practice/analyze`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(input),
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "response failed");
  }

  return data;
};
