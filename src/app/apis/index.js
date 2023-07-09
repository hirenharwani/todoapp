import { apiRoutes } from "../utils/index";

const customFetch = async (url, { body, ...customConfig }) => {
  //API call header
  const headers = {
    "Content-type": "application/json; charset=UTF-8;",
  };

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  try {
    const ApiResponse = await fetch(url, config);
    const data = await ApiResponse.json();
    if (ApiResponse.ok) {
      return {
        data: data,
        success: true,
      };
    } else {
      return {
        message: ApiResponse.statusText,
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getToDos = () => {
  return customFetch(apiRoutes.listToDos(), {
    method: "GET",
  });
};

export const addToDo = (body) => {
  return customFetch(apiRoutes.addToDo(), { method: "POST", body: body });
};

export const updateToDo = (body, toDoId) => {
  return customFetch(apiRoutes.updateToDo(toDoId), {
    method: "PUT",
    body: body,
  });
};

export const deleteToDo = (toDoId) => {
  return customFetch(apiRoutes.deleteToDo(toDoId), {
    method: "DELETE",
  });
};
