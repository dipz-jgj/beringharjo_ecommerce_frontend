import axios, { AxiosError, type AxiosResponse } from "axios";
import { redirect } from "react-router-dom";
import useAppQueryStore from "../store";

export const url = import.meta.env.VITE_API_BASE_URL;

export interface GetAllResponse<T> {
  results: T[];
  meta?: {
    total: number | null;
    lastPage: number | null;
    currentPage: number | null;
    perPage: number | null;
    prev: number | null;
    next: number | null;
  };
}

interface APIResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/",
  //   baseURL: `${url}/api/`,
});

// Menambahkan access token JWT pada setiap REQUEST API
// axiosInstance.interceptors.request.use((config) => {
//   // const accessToken = localStorage.getItem("accessToken");

//   // const authStore = useAppQueryStore((s) => s.userState);
//   const userState = useAppQueryStore.getState().userState;
//   const accessToken = userState.accessToken;
//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }
//   return config;
// });

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     const { userState, setUserState, clearUserState } =
//       useAppQueryStore.getState();
//     const { refreshToken, tenantId, userId, sessionId } = userState;

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       refreshToken
//     ) {
//       originalRequest._retry = true;
//       try {
//         const refreshTokenPayload = {
//           refresh_token: refreshToken,
//           tenant_id: tenantId,
//           user_id: userId,
//           session_id: sessionId,
//         };
//         const { data } = await axiosInstance.post(
//           "auth/refresh-token",
//           refreshTokenPayload
//         );

//         console.log("Regenerate access token: " + data.newAccessToken);

//         setUserState({ ...userState, accessToken: data.newAccessToken });

//         originalRequest.headers.Authorization = `Bearer ${data.newAccessToken}`;

//         // ulangi request API
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         localStorage.clear();
//         redirect("/login");
//       }
//     }

//     // Jika bukan kasus yang ditangani (misalnya 403), lempar error kembali
//     return Promise.reject(error);
//   }
// );

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAllById = async (
    id: number | string | undefined,
    subPath?: string,
    params?: Record<string, any>
  ) => {
    const url = subPath
      ? `${this.endpoint}/${id}/${subPath}`
      : `${this.endpoint}/${id}`;

    const config = { params };

    return await axiosInstance
      .get<GetAllResponse<T>>(url, config)
      .then((res) => res.data);
  };

  get = async (id?: number | string) => {
    const url = id ? `${this.endpoint}/${id}` : this.endpoint;
    return await axiosInstance.get<T>(url).then((res) => res.data);
  };

  getWithPath = async <R>(
    paths: string[],
    params?: Record<string, any>,
    withPagination: boolean = false
  ) => {
    const url = paths.filter(Boolean).join("/");
    const config = { params };

    return await axiosInstance.get(url, config).then((res) => {
      if (withPagination) {
        return res.data as GetAllResponse<R>;
      } else {
        return res.data as R;
      }
    });
  };

  post = async (data: any): Promise<APIResponse<T>> => {
    const isFormData = data instanceof FormData;

    const config = isFormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : {};

    const response = await axiosInstance.post<APIResponse<T>>(
      this.endpoint,
      data,
      config
    );
    return response.data;
  };

  put = async (
    id?: number | string,
    data?: any,
    customPath?: string
  ): Promise<T> => {
    const isFormData = data instanceof FormData;

    const config = isFormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : {};

    let url = this.endpoint;

    if (customPath) {
      url += `/${customPath}`;
    } else if (id !== undefined && id !== null) {
      url += `/${id}`;
    }

    const response = await axiosInstance.put<T>(url, data ?? {}, config);

    return response.data;
  };

  delete = async (id: number | string): Promise<{ mesage: string }> => {
    const response = await axiosInstance.delete(`${this.endpoint}/${id}`);
    return response.data;
  };
}

export default APIClient;
