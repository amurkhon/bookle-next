import { NoticeCategory, NoticeStatus } from "../../enums/notice.enum";
import { TotalCounter } from "../property/property";


export interface Notice {
    noticeCategory: NoticeCategory;
    noticeStatus: NoticeStatus;
    noticeTitle: string;
    noticeContent: string;
    memberId: string;
}

export interface Notices {
    list: Notice[];
    metaCounter: TotalCounter[];
}