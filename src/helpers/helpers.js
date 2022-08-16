export const update = function (articlesArr, id) {
  return articlesArr.filter((art) => !(art.id === id));
};

export const saveLocalStorage = function (value) {
  localStorage.setItem("tienda", JSON.stringify(value));
};
