import React from 'react';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { cartVar, userVar } from '../../../apollo/store';
import { updateCartItemQuantity, removeFromCart, clearCart as clearCartUtil } from '../../utils/cart';
import Swal from 'sweetalert2';
import { NEXT_PUBLIC_REACT_APP_API_URL } from '../../config';

export default function ShoppingCart() {
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const cartItems = useReactiveVar(cartVar);

	const updateQuantity = (itemId: string, newQuantity: number) => {
		if (newQuantity < 1) {
			removeItem(itemId);
			return;
		}
		updateCartItemQuantity(itemId, newQuantity);
	};

	const removeItem = (itemId: string) => {
		removeFromCart(itemId);
		Swal.fire({
			icon: 'success',
			title: 'Item Removed',
			text: 'Item has been removed from your cart',
			confirmButtonColor: '#6c63ff',
			timer: 1500,
		});
	};

	const clearCart = () => {
		Swal.fire({
			title: 'Clear Cart?',
			text: 'Are you sure you want to remove all items?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#6c63ff',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, clear it!',
		}).then((result) => {
			if (result.isConfirmed) {
				clearCartUtil();
				Swal.fire('Cleared!', 'Your cart has been cleared.', 'success');
			}
		});
	};

	const calculateSubtotal = () => {
		return cartItems.reduce((sum, item) => sum + item.subtotal, 0);
	};

	const calculateTax = () => {
		return calculateSubtotal() * 0.1;
	};

	const calculateShipping = () => {
		return 5.0;
	};

	const calculateGrandTotal = () => {
		return calculateSubtotal() + calculateTax() + calculateShipping();
	};

	const handleCheckout = () => {
		if (!user._id) {
			Swal.fire({
				icon: 'warning',
				title: 'Login Required',
				text: 'Please log in to proceed to checkout',
				confirmButtonColor: '#6c63ff',
			});
			router.push('/account/join');
			return;
		}
		if (cartItems.length === 0) {
			Swal.fire({
				icon: 'warning',
				title: 'Empty Cart',
				text: 'Your cart is empty',
				confirmButtonColor: '#6c63ff',
			});
			return;
		}
		router.push('/order/checkout');
	};

	if (cartItems.length === 0) {
		return (
			<div className="order-cart-wrapper">
				<div className="order-cart-empty">
					<div className="empty-icon">🛒</div>
					<h2>Your cart is empty</h2>
					<p>Add some items to get started!</p>
					<button className="order-btn-primary" onClick={() => router.push('/books')}>
						Continue Shopping
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="order-cart-wrapper">
			<div className="order-cart-header">
				<h1>Shopping Cart</h1>
				<button className="order-btn-clear" onClick={clearCart}>
					Clear Cart
				</button>
			</div>

			<div className="order-cart-content">
				<div className="order-cart-items">
					{cartItems.map((item) => {
						const imagePath = (item as any).propertyImage
							? `${NEXT_PUBLIC_REACT_APP_API_URL}/${(item as any).propertyImage}`
							: '/img/banner/header1.svg';
						const propertyTitle = (item as any).propertyTitle || 'Book';
						const propertyAuthor = (item as any).propertyAuthor || 'Unknown Author';
						
						return (
							<div key={item._id} className="order-cart-item">
								<div className="order-item-image">
									<img src={imagePath} alt={propertyTitle} />
								</div>
								<div className="order-item-details">
									<h3>{propertyTitle}</h3>
									<p className="order-item-author">by {propertyAuthor}</p>
									<p className="order-item-price">${item.price.toFixed(2)}</p>
								</div>
								<div className="order-item-controls">
									<div className="order-quantity-control">
										<button
											className="order-qty-btn"
											onClick={() => updateQuantity(item._id!, item.quantity - 1)}
										>
											−
										</button>
										<span className="order-quantity">{item.quantity}</span>
										<button
											className="order-qty-btn"
											onClick={() => updateQuantity(item._id!, item.quantity + 1)}
										>
											+
										</button>
									</div>
									<p className="order-item-subtotal">${item.subtotal.toFixed(2)}</p>
									<button
										className="order-remove-btn"
										onClick={() => removeItem(item._id!)}
										title="Remove item"
									>
										🗑️
									</button>
								</div>
							</div>
						);
					})}
				</div>

				<div className="order-cart-summary">
					<h2>Order Summary</h2>
					<div className="order-summary-row">
						<span>Subtotal</span>
						<span>${calculateSubtotal().toFixed(2)}</span>
					</div>
					<div className="order-summary-row">
						<span>Shipping</span>
						<span>${calculateShipping().toFixed(2)}</span>
					</div>
					<div className="order-summary-row">
						<span>Tax</span>
						<span>${calculateTax().toFixed(2)}</span>
					</div>
					<div className="order-summary-divider"></div>
					<div className="order-summary-row order-total">
						<span>Total</span>
						<span>${calculateGrandTotal().toFixed(2)}</span>
					</div>
					<button className="order-btn-primary order-btn-full" onClick={handleCheckout}>
						Proceed to Checkout
					</button>
					<button className="order-btn-secondary order-btn-full" onClick={() => router.push('/books')}>
						Continue Shopping
					</button>
				</div>
			</div>
		</div>
	);
}
