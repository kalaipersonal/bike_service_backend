import { message } from "antd"

export const ToastMessageSuccess = (data) => {
    return message.success(data);
}

export const ToastMessageError = (data) => {
    return message.error(data);
}