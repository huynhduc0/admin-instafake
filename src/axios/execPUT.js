


export const execPUT = (url, body) => {
    return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
   },
    body: JSON.stringify(body)
  });
};