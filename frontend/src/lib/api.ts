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
