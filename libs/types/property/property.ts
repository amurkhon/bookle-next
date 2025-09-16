import { PropertyCategory, PropertyStatus } from '../../enums/property.enum';
import { Member } from '../member/member';

export interface MeLiked {
	memberId: string;
	likeRefId: string;
	myFavorite: boolean;
}

export interface TotalCounter {
	total: number;
}

export interface Property {
	_id: string;
	propertyCategory: PropertyCategory;
	propertyStatus: PropertyStatus;
	propertyTitle: string;
	propertyPrice: number;
	propertyAuthor: string;
	propertyPages: number;
	isbn: string;
	propertyViews: number;
	propertyLikes: number;
	propertyComments: number;
	propertyRank: number;
	propertyImages: string[];
	propertyLanguages: string[];
	propertyDesc?: string;
	propertyDownloads: number;
	propertyFile: string;
	memberId: string;
	propertyAudio: string;
	deletedAt?: Date;
	publicationDate: Date;
	createdAt: Date;
	updatedAt: Date;
	/** from aggregation **/
	meLiked?: MeLiked[];
	memberData?: Member;
}

export interface Properties {
	list: Property[];
	metaCounter: TotalCounter[];
}
