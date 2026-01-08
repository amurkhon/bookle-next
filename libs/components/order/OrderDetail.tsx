import React from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ORDER } from '../../../apollo/user/query';
import { CANCEL_ORDER } from '../../../apollo/user/mutation';
import { OrderStatus, PaymentStatus } from '../../enums/order.enum';
import { NEXT_PUBLIC_REACT_APP_API_URL } from '../../config';
import Swal from 'sweetalert2';
import { sweetErrorHandling } from '../../sweetAlert';

export default function OrderDetail() {
	const router = useRouter();
	const { id } = router.query;

	const { data, loading, error, refetch } = useQuery(GET_ORDER, {
		variables: { input: id },
		skip: !id,
	});

	const [cancelOrder] = useMutation(CANCEL_ORDER);

	const order = data?.getOrder;

	const handleCancelOrder = async () => {
		if (!order?._id) return;

		Swal.fire({
			title: 'Cancel Order?',
			text: 'Are you sure you want to cancel this order?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#6c63ff',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, cancel it!',
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					await cancelOrder({
						variables: { input: order._id },
					});
					Swal.fire('Cancelled!', 'Your order has been cancelled.', 'success');
					refetch();
				} catch (err: any) {
					sweetErrorHandling(err).then();
				}
			}
		});
	};

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

	if (loading) {
		return (
			<div className="order-detail-wrapper">
				<div className="order-loading">Loading order details...</div>
			</div>
		);
	}

	if (error || !order) {
		return (
			<div className="order-detail-wrapper">
				<div className="order-cart-empty">
					<h2>Order not found</h2>
					<button className="order-btn-primary" onClick={() => router.push('/order')}>
						Back to Orders
					</button>
				</div>
			</div>
		);
	}

	const canCancel = order.orderStatus === OrderStatus.PENDING || (order.orderStatus === OrderStatus.PROCESSING && order.paymentStatus !== PaymentStatus.PAID);

	return (
		<div className="order-detail-wrapper">
			<button className="order-btn-back" onClick={() => router.push('/order')}>
				← Back to Orders
			</button>

			<div className="order-detail-header">
				<div>
					<h1>Order #{order.orderNumber}</h1>
					<p className="order-order-date">
						Placed on {new Date(order.createdAt as string).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
							hour: '2-digit',
							minute: '2-digit',
						})}
					</p>
				</div>
				<div className="order-status-section">
					<div className="order-status-group">
						<label>Order Status</label>
						<span
							className="order-status-badge order-status-large"
							style={{ backgroundColor: getStatusColor(order.orderStatus) }}
						>
							{order.orderStatus}
						</span>
					</div>
					<div className="order-status-group">
						<label>Payment Status</label>
						<span
							className="order-status-badge order-status-large"
							style={{
								backgroundColor:
									order.paymentStatus === PaymentStatus.PAID
										? '#4caf50'
										: order.paymentStatus === PaymentStatus.FAILED
										? '#f44336'
										: order.paymentStatus === PaymentStatus.PROCESSING
										? '#ff9800'
										: order.paymentStatus === PaymentStatus.REFUNDED
										? '#9e9e9e'
										: '#2196f3',
							}}
						>
							{order.paymentStatus}
						</span>
					</div>
				</div>
			</div>

			<div className="order-detail-content">
				<div className="order-items-section">
					<h2>Order Items</h2>
					<div className="order-items-list">
						{order.items?.map((item: any, index: number) => {
							// Handle both backend response (propertyTitle, propertyPrice, propertyData) and frontend structure (property object)
							const propertyTitle = item.propertyTitle || item.propertyData?.propertyTitle || item.property?.propertyTitle || 'Book';
							const propertyPrice = item.propertyPrice || item.price || 0;
							const quantity = item.quantity || 1;
							const subtotal = item.subtotal || (propertyPrice * quantity);
							const propertyAuthor = item.propertyData?.propertyAuthor || item.property?.propertyAuthor || 'Unknown';
							// Try propertyData first (backend), then property (frontend), then fallback
							const imagePath = item.propertyData?.propertyImages?.[0]
								? `${NEXT_PUBLIC_REACT_APP_API_URL}/${item.propertyData.propertyImages[0]}`
								: item.property?.propertyImages?.[0]
								? `${NEXT_PUBLIC_REACT_APP_API_URL}/${item.property.propertyImages[0]}`
								: (item as any).propertyImage
								? `${NEXT_PUBLIC_REACT_APP_API_URL}/${(item as any).propertyImage}`
								: '/img/banner/header1.svg';
							return (
								<div key={item._id || item.propertyId || index} className="order-detail-item">
									<div className="order-item-image">
										<img src={imagePath} alt={propertyTitle} />
									</div>
									<div className="order-item-info">
										<h3>{propertyTitle}</h3>
										<p>by {propertyAuthor}</p>
										<div className="order-item-meta">
											<span>Price: ${propertyPrice.toFixed(2)}</span>
											<span>Quantity: {quantity}</span>
										</div>
									</div>
									<div className="order-item-subtotal">
										<strong>${subtotal.toFixed(2)}</strong>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				<div className="order-info-section">
					{order.shippingAddress && (
						<div className="order-info-card">
							<h3>Shipping Address</h3>
							<div className="order-address-info">
								<p>{order.shippingAddress.fullName}</p>
								<p>{order.shippingAddress.address}</p>
								<p>
									{order.shippingAddress.city}
									{order.shippingAddress.state && `, ${order.shippingAddress.state}`}
									{order.shippingAddress.postalCode && ` ${order.shippingAddress.postalCode}`}
									{order.shippingAddress.zipCode && ` ${order.shippingAddress.zipCode}`}
								</p>
								<p>{order.shippingAddress.country}</p>
								{order.shippingAddress.phone && <p>Phone: {order.shippingAddress.phone}</p>}
							</div>
						</div>
					)}

					{order.billingAddress && (
						<div className="order-info-card">
							<h3>Billing Address</h3>
							<div className="order-address-info">
								<p>{order.billingAddress.fullName}</p>
								<p>{order.billingAddress.address}</p>
								<p>
									{order.billingAddress.city}, {order.billingAddress.state}{' '}
									{order.billingAddress.zipCode}
								</p>
								<p>{order.billingAddress.country}</p>
							</div>
						</div>
					)}

					<div className="order-info-card">
						<h3>Payment Method</h3>
						<p>{order.paymentMethod || 'Not specified'}</p>
					</div>

					<div className="order-info-card">
						<h3>Order Summary</h3>
						<div className="order-summary-details">
							{order.subtotal !== undefined && (
								<div className="order-summary-row">
									<span>Subtotal</span>
									<span>${order.subtotal.toFixed(2)}</span>
								</div>
							)}
							{order.shipping !== undefined && (
								<div className="order-summary-row">
									<span>Shipping</span>
									<span>${order.shipping.toFixed(2)}</span>
								</div>
							)}
							{order.tax !== undefined && (
								<div className="order-summary-row">
									<span>Tax</span>
									<span>${order.tax.toFixed(2)}</span>
								</div>
							)}
							{order.discount !== undefined && order.discount > 0 && (
								<div className="order-summary-row order-discount">
									<span>Discount</span>
									<span>-${order.discount.toFixed(2)}</span>
								</div>
							)}
							<div className="order-summary-divider"></div>
							<div className="order-summary-row order-total">
								<span>Total</span>
								<span>${order.totalAmount?.toFixed(2)}</span>
							</div>
						</div>
					</div>

					{canCancel && (
						<button className="order-btn-danger order-btn-full" onClick={handleCancelOrder}>
							Cancel Order
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
