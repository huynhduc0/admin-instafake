const SERVER_URL = "http://congchuabuoito.southeastasia.cloudapp.azure.com/"
// const SERVER_URL = "http://localhost:8080/"
export const LOGIN_URL = SERVER_URL+"login"
export const GET_USER = SERVER_URL+"admin/user"
export const GET_REPORT_POST = SERVER_URL+"admin/report/post"
export const GET_POST = SERVER_URL+"admin/post"
export const POST_HANDLE = SERVER_URL+"admin/post/handle"
export const POST_HANDLE_POST = SERVER_URL+"admin/report/post/handle"
export const MAIN_URL_DETAIL = "http://congchuabuoito.southeastasia.cloudapp.azure.com:6969/details.html?id="
export const PROFILE_URL_DETAIL = "http://congchuabuoito.southeastasia.cloudapp.azure.com:6969/profile.html?id="
export function getAvatar(url){
    return url?(url.startsWith("http")?url:SERVER_URL+"img/"+url):null
}