import { NotificationGroup, NotificationStatus, NotificationType } from "../../enums/notification.enum";


export interface NotificationInput {
    notificationType: NotificationType;
    notificationGroup: NotificationGroup;
    notificationTitle: string;
    notificationDesc?: string;
    receiverId: string;
    propertyId?: string;
    articleId?: string;
    authorId?: string;
}

export interface NotificationsInquiry {
    status: NotificationStatus;
}