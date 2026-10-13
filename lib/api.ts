
// // const API_URL =
// //   process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

// // async function apiRequest<T>(
// //   endpoint: string,
// //   options?: RequestInit
// // ): Promise<T> {
// //   const response = await fetch(`${API_URL}${endpoint}`, options);
// //   const data = await response.json().catch(() => ({}));

// //   if (!response.ok) {
// //     throw new Error(
// //       typeof data.detail === "string"
// //         ? data.detail
// //         : "Backend request failed."
// //     );
// //   }

// //   return data as T;
// // }

// // export function uploadDocument(file: File) {
// //   const formData = new FormData();
// //   formData.append("file", file);

// //   return apiRequest<{
// //     message: string;
// //     file_id: string;
// //     filename: string;
// //   }>("/api/upload", {
// //     method: "POST",
// //     body: formData,
// //   });
// // }

// // export function askQuestion(question: string, fileId: string) {
// //   return apiRequest<{
// //     answer: string;
// //     file_id: string;
// //   }>("/api/chat", {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //     },
// //     body: JSON.stringify({ question, file_id: fileId }),
// //   });
// // }

// // export function checkBackend() {
// //   return apiRequest<{
// //     status: string;
// //     message: string;
// //   }>("/");
// // }
// const API_URL =
//   process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

// async function apiRequest<T>(
//   endpoint: string,
//   options?: RequestInit
// ): Promise<T> {
//   const response = await fetch(`${API_URL}${endpoint}`, options);
//   const data = await response.json().catch(() => ({}));

//   if (!response.ok) {
//     throw new Error(
//       typeof data.detail === "string"
//         ? data.detail
//         : "Backend request failed."
//     );
//   }

//   return data as T;
// }

// export function uploadDocument(file: File) {
//   const formData = new FormData();
//   formData.append("file", file);

//   return apiRequest<{
//     message: string;
//     file_id: string;
//     filename: string;
//   }>("/api/upload", {
//     method: "POST",
//     body: formData,
//   });
// }

// export function ingestUrl(url: string) {
//   return apiRequest<{
//     message: string;
//     file_id: string;
//     filename: string;
//   }>("/api/url", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ url }),
//   });
// }

// export function askQuestion(question: string, fileId: string) {
//   return apiRequest<{
//     answer: string;
//     file_id: string;
//   }>("/api/chat", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ question, file_id: fileId }),
//   });
// }

// export function checkBackend() {
//   return apiRequest<{
//     status: string;
//     message: string;
//   }>("/");
// }
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, options);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      typeof data.detail === "string"
        ? data.detail
        : "Backend request failed."
    );
  }

  return data as T;
}

export function uploadDocument(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return apiRequest<{
    message: string;
    file_id: string;
    filename: string;
  }>("/api/upload", {
    method: "POST",
    body: formData,
  });
}

export function ingestUrl(url: string) {
  return apiRequest<{
    message: string;
    file_id: string;
    filename: string;
  }>("/api/url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });
}

export function askQuestion(question: string, fileId: string) {
  return apiRequest<{
    answer: string;
    file_id: string;
  }>("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question, file_id: fileId }),
  });
}

export function checkBackend() {
  return apiRequest<{
    status: string;
    message: string;
  }>("/");
}