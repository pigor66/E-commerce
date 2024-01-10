import { notification } from "antd";

export default function NotificationComponent(title: string, description: string, type: 'success' | 'error') {
    const [api, contextHolder] = notification.useNotification();

    function openNotification(title: string, description: string, type: 'success' | 'error') {
        api[type]({
            message: title,
            description: description,
        });
    };
    return (

        <>
            {contextHolder}

        </>
    )
}
