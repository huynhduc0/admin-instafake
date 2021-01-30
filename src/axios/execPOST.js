export const execPOST = (url, body) => {
    return fetch(url, {
    mode:'no-cors',
    method: "POST",
    headers: {
      "Content-Type": "application/json"
   },
    body: JSON.stringify(body)
  });
};