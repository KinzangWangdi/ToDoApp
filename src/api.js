

import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_MOCKAPI_URL,
  headers: { "content-type": "application/json" },
  timeout: 5000,
});

http.interceptors.response.use(({ data }) => data);

export const api = {
  todos: {
    getAll(params = {}) {
      return http
        .get("todos", { params })
        .catch((error) =>
          error?.response.status === 404 ? [] : Promise.reject(error)
        );
    },

    create(data) {
      return http.post("todos", data);
    },

    update(id, data) {
      return http.put(`todos/${id}`, data);
    },

    delete(id) {
      return http.delete(`todos/${id}`);
    },
  },
};


// const BASE_URL = import.meta.env.VITE_MOCKAPI_URL;

// export const api = {
//     todos: {
//         getAll(params = {}) {
//             const searchParams = new URLSearchParams(params).toString();
//             return fetch(`${BASE_URL}todos?${searchParams}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             })
//             .then((response) => {
//                 if (response.ok) return response.json();
//                 if (response.status === 404) return [];
//             });
//         }
//         create(data) {
//             return fetch(`${BASE_URL}todos`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data),
//             })
//             .then((response) => !!response.ok && response.json());
//         }
//         update(id, data) {
//             return fetch(`${BASE_URL}todos/${id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data),
//             })
//             .then((response) => !!response.ok && response.json());
//         },
//         delete(id) {
//             return fetch(`${BASE_URL}todos/${id}`, {
//                 method: 'DELETE',
//             })
//             .then((response) => !!response.ok && response.json());
//         }
//     }
// }