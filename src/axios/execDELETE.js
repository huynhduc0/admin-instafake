


export const execDELETE = (url, body) => {
    return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
   },
    body: JSON.stringify(body)
  });
};