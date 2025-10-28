import { NoticeCategory, NoticeStatus } from "../../enums/notice.enum";


export interface NotificationUpdateInput {
    _id: string;
    noticeStatus: NoticeStatus;
    noticeCategory?: NoticeCategory;
    noticeTitle?: string;
    noticeContent?: string;
    memberId?: string;
}