
import { notification } from 'antd';
import 'antd/dist/antd.css';
import { Redirect } from 'react-router-dom';

export const notificationComponent = (type, message) => {
    var placement = 'topRight';
    notification[type]({
        message: `Notification`,
        duration: 2,
        description: message, placement,
    });
};

export const getCount = (array) => {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        count += array[i].count;
    }
    return count;
}
export const getSubtotal = (array) => {
    var subtotal = 0;
    for (var i = 0; i < array.length; i++) {
        // count += array[i].count;
        subtotal += (array[i].count * array[i].price)
    }
    return subtotal;
}
export const addToCart = (value, count) => {
    // let countLocalStorage = localStorage.getItem('count');
    // if (!countLocalStorage) {
    //     localStorage.setItem("count", count)
    // }
    // else {
    //     localStorage.setItem("count", parseInt(countLocalStorage) + parseInt(count))
    // }

    let data = {
        productName: value.productName,
        id: value.id,
        categoriesId: value.categoriesId,
        description: value.description,
        price: value.price,
        count: count,
        url: value.url
    }

    let arrayLocalStorage = JSON.parse(localStorage.getItem("arrayOrder")) || [];
    let flag = false;
    for (var i = 0; i < arrayLocalStorage.length; i++) {
        if (arrayLocalStorage[i].id == value.id) {
            arrayLocalStorage[i].count += count;
            flag = true;

        }
    }


    if (flag == false) {
        arrayLocalStorage.push(data)
    }
    localStorage.setItem("arrayOrder", JSON.stringify(arrayLocalStorage));
    localStorage.setItem("subtotal", parseInt(total(arrayLocalStorage)))

    notificationComponent('success', `Đã thêm ${value.productName} vào giỏ hàng !!!`)

}
export const total = (array) => {
    let total = 0;
    array.map(v => {
        total += (parseInt(v.price) * parseInt(v.count))
    })
    return total;
}
export const sosanh = (str) => {
    str = str.toLowerCase();

    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, ' ');

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');
    return str;
}

export const handleSignout = (role) => {

        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('arrayOrder')
        localStorage.removeItem('count');
        localStorage.removeItem('role');
        notificationComponent('success', 'Logout success')
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    

}