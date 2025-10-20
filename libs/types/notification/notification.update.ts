import { NotificationGroup, NotificationStatus, NotificationType } from "../../enums/notification.enum";


export interface NotificationUpdateInput {
    _id: string;
    notificationStatus: NotificationStatus;
    notificationType?: NotificationType;
    notificationGroup?: NotificationGroup;
    notificationTitle?: string;
    notificationDesc?: string;
    receiverId?: string;
    propertyId?: string;
    articleId?: string;
}