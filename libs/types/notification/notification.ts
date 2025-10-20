import { NotificationGroup, NotificationStatus, NotificationType } from "../../enums/notification.enum";
import { BoardArticle } from "../board-article/board-article";
import { Member } from "../member/member";
import { Property, TotalCounter } from "../property/property";



export interface Notification {
    _id: string;
    notificationType: NotificationType;
    notificationGroup: NotificationGroup;
    notificationStatus: NotificationStatus;
    notificationTitle: string;
    notificationDesc?: string;
    authorId: string;
    receiverId: string;
    propertyId?: string;
    articleId?: string;
    createdAt: Date;
    updatedAt: Date;

    // from aggregation

    memberData?: Member;
    propertyData?: Property;
    articleData?: BoardArticle;  
}

export interface Notifications {
    list: Notification[];
    metaCounter: TotalCounter[];
}