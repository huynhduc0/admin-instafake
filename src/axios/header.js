export const header = {
    "Content-Type": "application/json",
    "Authorization": "Bearer "+localStorage.getItem('token')
}
export const formDataHeader = {
    "Content-Type": "multipart/form-data",
    "Authorization":  "Bearer "+ localStorage.getItem('token')
}