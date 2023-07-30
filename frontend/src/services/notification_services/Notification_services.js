import AxiosConfig from "../../config/Axiosconfig"


export function Createnotification(data) {
    return new Promise((resolve, reject) => {
        AxiosConfig.post('/nofication/create', data).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            return reject(err);
        })
    })
}

export function CreatenotificationSeller(data) {
    return new Promise((resolve, reject) => {
        AxiosConfig.post('/nofication/createseller', data).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            return reject(err);
        })
    })
}


export function Getenotification(data) {
    return new Promise((resolve, reject) => {
        AxiosConfig.post('/nofication/getall', data).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            return reject(err);
        })
    })
}

export function GetenotificationSeller(data) {
    return new Promise((resolve, reject) => {
        AxiosConfig.post('/nofication/getallseller', data).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            return reject(err);
        })
    })
}
export function Updatenotification(data) {
    return new Promise((resolve, reject) => {
        AxiosConfig.put(`/nofication/update`, data).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            return reject(err);
        })
    })
}

export function UpdatenotificationSeller() {
    return new Promise((resolve, reject) => {
        AxiosConfig.put(`/nofication/updateseller`).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            return reject(err);
        })
    })
}