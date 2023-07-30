import AxiosConfig from "../../config/Axiosconfig"



export function getAllSellers(data) {

    return new Promise((resolve, reject) => {
        AxiosConfig.get('/admin/sellers/all').then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err);
        })
    })
}

export function SellerAproval(id, data) {

    return new Promise((resolve, reject) => {
        AxiosConfig.put(`/admin/sellers/approval/${id}`, data).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err);
        })
    })
}


export function SellerAprovalUnBlock(id, data) {

    return new Promise((resolve, reject) => {
        AxiosConfig.put(`/admin/sellers/approvalunblock/${id}`, data).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err);
        })
    })
}