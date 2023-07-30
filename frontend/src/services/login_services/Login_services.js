import AxiosConfig from "../../config/Axiosconfig"



export function Sellerregiter(data) {

    return new Promise((resolve, reject) => {
        AxiosConfig.post('/auth/seller/register', data).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err);
        })
    })
}


export function SellerLogin(data) {

    return new Promise((resolve, reject) => {
        AxiosConfig.post('/auth/seller/login', data).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err);
        })
    })
}
export function SellerGetcurrentuser(data) {



    return new Promise((resolve, reject) => {
        AxiosConfig.post(`/auth/seller/currentuser`, data).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err?.response?.data);
        })
    })
}

// update

export function SellerUpdateprofile(id, data) {



    return new Promise((resolve, reject) => {
        AxiosConfig.put(`/auth/seller/update/${id}`, data).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err?.response?.data);
        })
    })
}


// admin module



export function AdminLogin(data) {
    return new Promise((resolve, reject) => {
        AxiosConfig.post(`/auth/admin/login`, data).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err?.response?.data);
        })
    })
}

export function AdminGetUser(data) {
    return new Promise((resolve, reject) => {
        AxiosConfig.post(`/auth/admin/currentuser`, data).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err?.response?.data);
        })
    })
}




// enduser login



export function Enduserregiter(data) {

    return new Promise((resolve, reject) => {
        AxiosConfig.post('/auth/enduser/register', data).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err);
        })
    })
}

export function EnduserLogin(data) {

    return new Promise((resolve, reject) => {
        AxiosConfig.post('/auth/enduser/login', data).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err);
        })
    })
}


export function EnduserGetdata(data) {

    return new Promise((resolve, reject) => {
        AxiosConfig.post('/auth/enduser/currentuser', data).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err);
        })
    })
}

