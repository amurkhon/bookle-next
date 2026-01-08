import { OrderStatus, PaymentStatus, PaymentMethod } from '../../enums/order.enum';
import { Property } from '../property/property';
import { Member } from '../member/member';

export interface OrderItem {
	_id?: string;
	propertyId: string;
	property?: Property;
	propertyData?: Property; // Backend response field
	quantity: number;
	price: number;
	subtotal: number;
	// Backend response fields
	propertyTitle?: string;
	propertyPrice?: number;
}

export interface Order {
	_id: string;
	memberId: string;
	member?: Member;
	memberData?: Member; // Backend uses memberData
	items: OrderItem[];
	totalAmount: number;
	// Optional fields - backend may not return breakdown
	subtotal?: number;
	tax?: number;
	shipping?: number;
	discount?: number;
	orderStatus: OrderStatus;
	paymentStatus: PaymentStatus;
	paymentMethod?: PaymentMethod;
	paymentId?: string;
	paymentIntentId?: string;
	transactionId?: string;
	shippingAddress?: ShippingAddress;
	billingAddress?: BillingAddress; // Not returned by backend, kept for compatibility
	orderNumber: string;
	notes?: string;
	completedAt?: Date | string;
	cancelledAt?: Date | string;
	createdAt: Date | string;
	updatedAt: Date | string;
}

export interface ShippingAddress {
	fullName: string;
	address: string;
	city: string;
	state?: string; // Optional for backend response
	zipCode?: string; // Optional for backend response (backend uses postalCode)
	postalCode?: string; // Backend response field
	country: string;
	phone?: string; // Optional for backend response
}

export interface BillingAddress {
	fullName: string;
	address: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
}

export interface Orders {
	list: Order[];
	metaCounter: { total: number }[];
}
