import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { GET_ORDERS } from '../../../apollo/user/query';
import { OrdersInquiry } from '../../types/order/order.input';
import { OrderStatus, PaymentStatus } from '../../enums/order.enum';
import { NEXT_PUBLIC_REACT_APP_API_URL } from '../../config';

export default function OrderHistory() {
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const [page, setPage] = useState(1);
	const limit = 10;

	const inquiry: OrdersInquiry = {
		page,
		limit,
		sort: 'createdAt',
		direction: -1, // -1 for DESC, 1 for ASC (backend expects Int)
		// Note: Backend doesn't support memberId in search, orders are filtered by authenticated user automatically
	};

	const { data, loading, error, refetch } = useQuery(GET_ORDERS, {
		variables: { input: inquiry },
		skip: !user._id,
		fetchPolicy: 'network-only',
	});

	useEffect(() => {
		if (user._id) {
			const updatedInquiry: OrdersInquiry = {
				...inquiry,
				page,
			};
			refetch({ input: updatedInquiry });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user._id, page]);

	const orders = data?.getOrders?.list || [];
	const total = data?.getOrders?.metaCounter?.[0]?.total || 0;
	const totalPages = Math.ceil(total / limit);

	const getStatusColor = (status: OrderStatus) => {
		switch (status) {
			case OrderStatus.COMPLETED:
				return '#4caf50';
			case OrderStatus.PROCESSING:
				return '#ff9800';
			case OrderStatus.CANCELLED:
				return '#f44336';
			case OrderStatus.REFUNDED:
				return '#9e9e9e';
			case OrderStatus.PENDING:
				return '#2196f3';
			default:
				return '#9e9e9e';
		}
	};

	const getPaymentStatusColor = (status: PaymentStatus) => {
		switch (status) {
			case PaymentStatus.PAID:
				return '#4caf50';
			case PaymentStatus.PROCESSING:
				return '#ff9800';
			case PaymentStatus.FAILED:
				return '#f44336';
			case PaymentStatus.REFUNDED:
				return '#9e9e9e';
			case PaymentStatus.PENDING:
				return '#2196f3';
			default:
				return '#9e9e9e';
		}
	};

	if (!user._id) {
		return (
			<div className="order-history-wrapper">
				<div className="order-cart-empty">
					<h2>Please log in to view your orders</h2>
					<button className="order-btn-primary" onClick={() => router.push('/account/join')}>
						Login
					</button>
				</div>
			</div>
		);
	}

	if (loading) {
		return (
			<div className="order-history-wrapper">
				<div className="order-loading">Loading orders...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="order-history-wrapper">
				<div className="order-error">Error loading orders. Please try again.</div>
			</div>
		);
	}

	if (orders.length === 0) {
		return (
			<div className="order-history-wrapper">
				<div className="order-cart-empty">
					<div className="empty-icon">📦</div>
					<h2>No orders yet</h2>
					<p>Start shopping to see your orders here!</p>
					<button className="order-btn-primary" onClick={() => router.push('/books')}>
						Start Shopping
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="order-history-wrapper">
			<div className="order-history-header">
				<h1>My Orders</h1>
				<p className="order-count">Total: {total} orders</p>
			</div>

			<div className="order-orders-list">
				{orders.map((order: any) => (
					<div key={order._id} className="order-order-card">
						<div className="order-order-header">
							<div className="order-order-info">
								<h3>Order #{order.orderNumber}</h3>
								<p className="order-order-date">
									{new Date(order.createdAt as string).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
								</p>
							</div>
							<div className="order-statuses">
								<span
									className="order-status-badge"
									style={{ backgroundColor: getStatusColor(order.orderStatus) }}
								>
									{order.orderStatus}
								</span>
								<span
									className="order-payment-badge"
									style={{ backgroundColor: getPaymentStatusColor(order.paymentStatus) }}
								>
									{order.paymentStatus}
								</span>
							</div>
						</div>

						<div className="order-items-preview">
							{order.items?.slice(0, 3).map((item: any, index: number) => {
								// Handle both backend response (propertyTitle, propertyData) and frontend structure (property object)
								const propertyTitle = item.propertyTitle || item.propertyData?.propertyTitle || item.property?.propertyTitle || 'Book';
								// Try propertyData first (backend), then property (frontend), then fallback
								const imagePath = item.propertyData?.propertyImages?.[0]
									? `${NEXT_PUBLIC_REACT_APP_API_URL}/${item.propertyData.propertyImages[0]}`
									: item.property?.propertyImages?.[0]
									? `${NEXT_PUBLIC_REACT_APP_API_URL}/${item.property.propertyImages[0]}`
									: (item as any).propertyImage
									? `${NEXT_PUBLIC_REACT_APP_API_URL}/${(item as any).propertyImage}`
									: '/img/banner/header1.svg';
								return (
									<div key={index} className="order-preview-item">
										<img src={imagePath} alt={propertyTitle} />
										<div className="order-preview-info">
											<p>{propertyTitle}</p>
											<span>Qty: {item.quantity || 1}</span>
										</div>
									</div>
								);
							})}
							{order.items?.length > 3 && (
								<div className="order-more-items">+{order.items.length - 3} more</div>
							)}
						</div>

						<div className="order-order-footer">
							<div className="order-order-total">
								<span>Total:</span>
								<strong>${order.totalAmount?.toFixed(2)}</strong>
							</div>
							<button
								className="order-btn-secondary"
								onClick={() => router.push(`/order/${order._id}`)}
							>
								View Details
							</button>
						</div>
					</div>
				))}
			</div>

			{totalPages > 1 && (
				<div className="order-pagination">
					<button
						className="order-page-btn"
						onClick={() => setPage(page - 1)}
						disabled={page === 1}
					>
						Previous
					</button>
					<span className="order-page-info">
						Page {page} of {totalPages}
					</span>
					<button
						className="order-page-btn"
						onClick={() => setPage(page + 1)}
						disabled={page >= totalPages}
					>
						Next
					</button>
				</div>
			)}
		</div>
	);
}
