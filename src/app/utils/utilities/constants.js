const apiRoute = "https://jsonplaceholder.typicode.com";
export const apiRoutes = {
  listToDos: () => `${apiRoute}/posts`,
  addToDo: () => `${apiRoute}/posts`,
  updateToDo: (toDoID) => `${apiRoute}/posts/${toDoID}`,
  deleteToDo: (toDoID) => `${apiRoute}/posts/${toDoID}`,
};
