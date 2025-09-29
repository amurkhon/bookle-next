import { PropertyCategory, PropertyLocation, PropertyStatus, PropertyType } from '../../enums/property.enum';
import { Direction } from '../../enums/common.enum';

export interface PropertyInput {
	propertyCategory: PropertyCategory;
	propertyType: PropertyType;
	propertyTitle: string;
	propertyPrice: number;
	propertyPages: number;
	isbn: string;
	propertyAuthor: string;
	propertyImages: string[];
	propertyLanguages: string[];
	propertyFile?: string;
	propertyAudio?: string;
	propertyDesc?: string;
	publicationDate: string;
	memberId?: string;
}

interface PISearch {
	memberId?: string;
	categoryList?: PropertyCategory[];
	typeList?: PropertyType[];
	roomsList?: Number[];
	options?: string[];
	bedsList?: Number[];
	pricesRange?: Range;
	periodsRange?: PeriodsRange;
	pagesRange?: Range;
	text?: string;
}

export interface PropertiesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: PISearch;
}

interface APISearch {
	propertyStatus?: PropertyStatus;
}

export interface AuthorPropertiesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: APISearch;
}

interface ALPISearch {
	propertyStatus?: PropertyStatus;
	propertyCategoryList?: PropertyCategory[];
}

export interface AllPropertiesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ALPISearch;
}

interface Range {
	start: number;
	end: number;
}

interface PeriodsRange {
	start: Date | number;
	end: Date | number;
}
