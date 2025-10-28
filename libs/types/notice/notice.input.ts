import { NoticeCategory } from "../../enums/notice.enum";


export interface NoticeInput {
    noticeCategory: NoticeCategory;
    noticeTitle: string;
    noticeContent: string;
}