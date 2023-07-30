import AxiosConfig from "../../config/Axiosconfig"



export function getProductLists(data) {

    return new Promise((resolve, reject) => {
        AxiosConfig.post('/admin/product/allproducts', data).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err);
        })
    })
}


export function ApprovalProduct(data) {

    return new Promise((resolve, reject) => {
        AxiosConfig.put(`/admin/product/approval/${data}`).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err);
        })
    })
}

export function ApprovalProductRejected(data) {

    return new Promise((resolve, reject) => {
        AxiosConfig.put(`/admin/product/approvalreject/${data}`).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err);
        })
    })
}
