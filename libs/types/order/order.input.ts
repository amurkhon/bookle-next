import { OrderStatus, PaymentStatus, PaymentMethod } from '../../enums/order.enum';
import { Direction } from '../../enums/common.enum';
import { ShippingAddress, BillingAddress, OrderItem } from './order';

export interface OrderItemInput {
	propertyId: string;
	quantity: number;
}

export interface ShippingAddressInput {
	fullName: string;
	address: string;
	city: string;
	postalCode: string;
	country: string;
}

export interface CreateOrderInput {
	items: OrderItemInput[];
	shippingAddress: ShippingAddressInput;
	paymentMethod?: PaymentMethod;
	notes?: string;
}

// Legacy interface for backward compatibility
export interface OrderInput {
	memberId: string;
	items: OrderItem[];
	shippingAddress?: ShippingAddress;
	billingAddress?: BillingAddress;
	paymentMethod?: PaymentMethod;
	notes?: string;
}

export interface OrderUpdate {
	_id: string;
	orderStatus?: OrderStatus;
	paymentStatus?: PaymentStatus;
	shippingAddress?: ShippingAddress;
	billingAddress?: BillingAddress;
	notes?: string;
}

interface OrderSearch {
	orderStatus?: string; // Backend expects string, not array
	paymentStatus?: string; // Backend expects string, not array
	orderNumber?: string;
}

export interface OrdersInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: number; // Backend expects Int (number), not Direction enum
	search?: OrderSearch; // Backend expects optional search
}
