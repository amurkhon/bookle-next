import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { cartVar, userVar } from '../../../apollo/store';
import { useMutation } from '@apollo/client';
import { CREATE_ORDER } from '../../../apollo/user/mutation';
import type { ShippingAddress, BillingAddress } from '../../types/order/order';
import type { CreateOrderInput, ShippingAddressInput, OrderItemInput } from '../../types/order/order.input';
import { PaymentMethod } from '../../enums/order.enum';
import Swal from 'sweetalert2';
import { sweetErrorHandling } from '../../sweetAlert';
import { clearCart } from '../../utils/cart';

export default function Checkout() {
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const cartItems = useReactiveVar(cartVar);
	const [createOrder] = useMutation(CREATE_ORDER);

	const [loading, setLoading] = useState(false);
	const [sameAsShipping, setSameAsShipping] = useState(true);

	// Payment form states
	const [cardHolder, setCardHolder] = useState('');
	const [cardNumber, setCardNumber] = useState('');
	const [expiry, setExpiry] = useState('');
	const [cvv, setCVV] = useState('');
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CARD);

	// Shipping address (using local state with all fields for form, will transform for API)
	const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
		fullName: user.memberFullName || '',
		address: user.memberAddress || '',
		city: '',
		state: '',
		zipCode: '',
		country: '',
		phone: user.memberPhone || '',
	});

	// Billing address
	const [billingAddress, setBillingAddress] = useState<BillingAddress>({
		fullName: user.memberFullName || '',
		address: user.memberAddress || '',
		city: '',
		state: '',
		zipCode: '',
		country: '',
	});

	const formatCardNumber = (value: string) => {
		const cleaned = value.replace(/\s/g, '');
		const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
		return formatted.substring(0, 19);
	};

	const formatExpiry = (value: string) => {
		const cleaned = value.replace(/\D/g, '');
		if (cleaned.length >= 2) {
			return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
		}
		return cleaned;
	};

	const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCardNumber(formatCardNumber(e.target.value));
	};

	const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setExpiry(formatExpiry(e.target.value));
	};

	const validateForm = () => {
		if (!shippingAddress.fullName || !shippingAddress.address || !shippingAddress.city || 
			!shippingAddress.state || !shippingAddress.zipCode || !shippingAddress.country || !shippingAddress.phone) {
			Swal.fire({
				icon: 'error',
				title: 'Missing Shipping Address',
				text: 'Please fill in all shipping address fields.',
				confirmButtonColor: '#6c63ff',
			});
			return false;
		}

		if (!sameAsShipping) {
			if (!billingAddress.fullName || !billingAddress.address || !billingAddress.city || 
				!billingAddress.state || !billingAddress.zipCode || !billingAddress.country) {
				Swal.fire({
					icon: 'error',
					title: 'Missing Billing Address',
					text: 'Please fill in all billing address fields.',
					confirmButtonColor: '#6c63ff',
				});
				return false;
			}
		}

		return true;
	};

	const handlePlaceOrder = async () => {
		if (!validateForm()) return;

		if (cartItems.length === 0) {
			Swal.fire({
				icon: 'warning',
				title: 'Empty Cart',
				text: 'Your cart is empty',
				confirmButtonColor: '#6c63ff',
			});
			return;
		}

		setLoading(true);

		try {
			// Transform cart items to match backend structure (only propertyId and quantity)
			const items: OrderItemInput[] = cartItems.map((item) => ({
				propertyId: item.propertyId,
				quantity: item.quantity,
			}));

			// Transform shipping address to match backend structure (postalCode instead of zipCode, no state/phone)
			const shippingAddressInput: ShippingAddressInput = {
				fullName: shippingAddress.fullName,
				address: shippingAddress.address ?? '',
				city: shippingAddress.city ?? '',
				postalCode: shippingAddress.zipCode ?? '',
				country: shippingAddress.country ?? '',
			};

			const orderInput: CreateOrderInput = {
				items,
				shippingAddress: shippingAddressInput,
				paymentMethod,
				notes: '',
			};

			const result = await createOrder({
				variables: { input: orderInput },
			});

			if (result.data?.createOrder) {
				clearCart();

				Swal.fire({
					title: '🎉 Order Placed Successfully!',
					text: `Order #${result.data.createOrder.orderNumber} has been placed.`,
					icon: 'success',
					confirmButtonColor: '#6c63ff',
				}).then(() => {
					router.push(`/order/${result.data.createOrder._id}`);
				});
			}
		} catch (err: any) {
			sweetErrorHandling(err).then();
		} finally {
			setLoading(false);
		}
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

	const calculateTotal = () => {
		return calculateSubtotal() + calculateTax() + calculateShipping();
	};

	if (cartItems.length === 0) {
		return (
			<div className="order-checkout-wrapper">
				<div className="order-cart-empty">
					<h2>Your cart is empty</h2>
					<button className="order-btn-primary" onClick={() => router.push('/books')}>
						Continue Shopping
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="order-checkout-wrapper">
			<h1 className="order-checkout-title">Checkout</h1>

			<div className="order-checkout-content">
				<div className="order-checkout-form">
					<div className="order-form-section">
						<h2>Shipping Address</h2>
						<div className="order-form-grid">
							<div className="order-form-group order-form-full">
								<label>Full Name</label>
								<input
									type="text"
									value={shippingAddress.fullName}
									onChange={(e) =>
										setShippingAddress({ ...shippingAddress, fullName: e.target.value })
									}
									placeholder="John Doe"
								/>
							</div>
							<div className="order-form-group order-form-full">
								<label>Address</label>
								<input
									type="text"
									value={shippingAddress.address}
									onChange={(e) =>
										setShippingAddress({ ...shippingAddress, address: e.target.value })
									}
									placeholder="123 Main Street"
								/>
							</div>
							<div className="order-form-group">
								<label>City</label>
								<input
									type="text"
									value={shippingAddress.city}
									onChange={(e) =>
										setShippingAddress({ ...shippingAddress, city: e.target.value })
									}
									placeholder="New York"
								/>
							</div>
							<div className="order-form-group">
								<label>State</label>
								<input
									type="text"
									value={shippingAddress.state}
									onChange={(e) =>
										setShippingAddress({ ...shippingAddress, state: e.target.value })
									}
									placeholder="NY"
								/>
							</div>
							<div className="order-form-group">
								<label>Zip Code</label>
								<input
									type="text"
									value={shippingAddress.zipCode}
									onChange={(e) =>
										setShippingAddress({ ...shippingAddress, zipCode: e.target.value })
									}
									placeholder="10001"
								/>
							</div>
							<div className="order-form-group">
								<label>Country</label>
								<input
									type="text"
									value={shippingAddress.country}
									onChange={(e) =>
										setShippingAddress({ ...shippingAddress, country: e.target.value })
									}
									placeholder="USA"
								/>
							</div>
							<div className="order-form-group order-form-full">
								<label>Phone</label>
								<input
									type="tel"
									value={shippingAddress.phone}
									onChange={(e) =>
										setShippingAddress({ ...shippingAddress, phone: e.target.value })
									}
									placeholder="+1 234 567 8900"
								/>
							</div>
						</div>
					</div>

					<div className="order-form-section">
						<div className="order-checkbox-group">
							<input
								type="checkbox"
								id="sameAsShipping"
								checked={sameAsShipping}
								onChange={(e) => setSameAsShipping(e.target.checked)}
							/>
							<label htmlFor="sameAsShipping">Billing address same as shipping</label>
						</div>

						{!sameAsShipping && (
							<div className="order-form-grid">
								<div className="order-form-group order-form-full">
									<label>Full Name</label>
									<input
										type="text"
										value={billingAddress.fullName}
										onChange={(e) =>
											setBillingAddress({ ...billingAddress, fullName: e.target.value })
										}
										placeholder="John Doe"
									/>
								</div>
								<div className="order-form-group order-form-full">
									<label>Address</label>
									<input
										type="text"
										value={billingAddress.address}
										onChange={(e) =>
											setBillingAddress({ ...billingAddress, address: e.target.value })
										}
										placeholder="123 Main Street"
									/>
								</div>
								<div className="order-form-group">
									<label>City</label>
									<input
										type="text"
										value={billingAddress.city}
										onChange={(e) =>
											setBillingAddress({ ...billingAddress, city: e.target.value })
										}
										placeholder="New York"
									/>
								</div>
								<div className="order-form-group">
									<label>State</label>
									<input
										type="text"
										value={billingAddress.state}
										onChange={(e) =>
											setBillingAddress({ ...billingAddress, state: e.target.value })
										}
										placeholder="NY"
									/>
								</div>
								<div className="order-form-group">
									<label>Zip Code</label>
									<input
										type="text"
										value={billingAddress.zipCode}
										onChange={(e) =>
											setBillingAddress({ ...billingAddress, zipCode: e.target.value })
										}
										placeholder="10001"
									/>
								</div>
								<div className="order-form-group">
									<label>Country</label>
									<input
										type="text"
										value={billingAddress.country}
										onChange={(e) =>
											setBillingAddress({ ...billingAddress, country: e.target.value })
										}
										placeholder="USA"
									/>
								</div>
							</div>
						)}
					</div>

					<div className="order-form-section">
						<h2>Payment Information</h2>
						<div className="order-payment-methods">
							<button
								className={`order-payment-method-btn ${paymentMethod === PaymentMethod.CARD ? 'active' : ''}`}
								onClick={() => setPaymentMethod(PaymentMethod.CARD)}
							>
								💳 Card
							</button>
							<button
								className={`order-payment-method-btn ${paymentMethod === PaymentMethod.PAYPAL ? 'active' : ''}`}
								onClick={() => setPaymentMethod(PaymentMethod.PAYPAL)}
							>
								💰 PayPal
							</button>
							<button
								className={`order-payment-method-btn ${paymentMethod === PaymentMethod.WALLET ? 'active' : ''}`}
								onClick={() => setPaymentMethod(PaymentMethod.WALLET)}
							>
								💼 Wallet
							</button>
						</div>

						<div className="order-form-grid">
							<div className="order-form-group order-form-full">
								<label>Card Holder Name</label>
								<input
									type="text"
									value={cardHolder}
									onChange={(e) => setCardHolder(e.target.value)}
									placeholder="John Doe"
								/>
							</div>
							<div className="order-form-group order-form-full">
								<label>Card Number</label>
								<input
									type="text"
									value={cardNumber}
									onChange={handleCardNumberChange}
									placeholder="0000 0000 0000 0000"
									maxLength={19}
								/>
							</div>
							<div className="order-form-group">
								<label>Expiry Date</label>
								<input
									type="text"
									value={expiry}
									onChange={handleExpiryChange}
									placeholder="MM/YY"
									maxLength={5}
								/>
							</div>
							<div className="order-form-group">
								<label>CVV</label>
								<input
									type="password"
									value={cvv}
									onChange={(e) => setCVV(e.target.value.replace(/\D/g, '').substring(0, 4))}
									placeholder="123"
									maxLength={4}
								/>
							</div>
						</div>

					</div>
				</div>

				<div className="order-checkout-summary">
					<h2>Order Summary</h2>
					<div className="order-summary-items">
						{cartItems.map((item) => (
							<div key={item._id} className="order-summary-item">
								<span>{(item as any).propertyTitle || 'Book'} x {item.quantity}</span>
								<span>${item.subtotal.toFixed(2)}</span>
							</div>
						))}
					</div>
					<div className="order-summary-divider"></div>
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
						<span>${calculateTotal().toFixed(2)}</span>
					</div>
					<button
						className="order-btn-primary order-btn-full"
						onClick={handlePlaceOrder}
						disabled={loading}
					>
						{loading ? 'Processing...' : 'Place Order'}
					</button>
				</div>
			</div>
		</div>
	);
}
