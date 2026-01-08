import { cartVar } from '../../apollo/store';
import { OrderItem } from '../types/order/order';
import { Property } from '../types/property/property';
import Swal from 'sweetalert2';

const CART_STORAGE_KEY = 'bookio_cart';

// Load cart from localStorage
export const loadCartFromStorage = (): OrderItem[] => {
	if (typeof window === 'undefined') return [];
	try {
		const stored = localStorage.getItem(CART_STORAGE_KEY);
		if (stored) {
			return JSON.parse(stored);
		}
	} catch (error) {
		console.error('Error loading cart from localStorage:', error);
	}
	return [];
};

// Save cart to localStorage
const saveCartToStorage = (cart: OrderItem[]) => {
	if (typeof window === 'undefined') return;
	try {
		localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
	} catch (error) {
		console.error('Error saving cart to localStorage:', error);
	}
};

// Initialize cart from localStorage
export const initializeCart = () => {
	const savedCart = loadCartFromStorage();
	if (savedCart.length > 0) {
		cartVar(savedCart);
	}
};

// Update both reactive variable and localStorage
const updateCart = (newCart: OrderItem[]) => {
	cartVar(newCart);
	saveCartToStorage(newCart);
};

export const addToCart = (property: Property, quantity: number = 1) => {
	const currentCart = cartVar();
	
	// Check if item already exists in cart
	const existingItemIndex = currentCart.findIndex(
		(item) => item.propertyId === property._id
	);

	if (existingItemIndex >= 0) {
		// Update quantity if item exists
		const updatedCart = currentCart.map((item, index) =>
			index === existingItemIndex
				? {
						...item,
						quantity: item.quantity + quantity,
						subtotal: (item.quantity + quantity) * item.price,
				  }
				: item
		);
		updateCart(updatedCart);
	} else {
		// Add new item to cart
		const newItem: OrderItem = {
			_id: `${property._id}-${Date.now()}`,
			propertyId: property._id,
			quantity,
			price: property.propertyPrice,
			subtotal: property.propertyPrice * quantity,
		};

		// Add property metadata for display
		(newItem as any).propertyTitle = property.propertyTitle;
		(newItem as any).propertyAuthor = property.propertyAuthor;
		(newItem as any).propertyImage = property.propertyImages?.[0];

		updateCart([...currentCart, newItem]);
	}

	Swal.fire({
		icon: 'success',
		title: 'Added to Cart!',
		text: `${property.propertyTitle} has been added to your cart`,
		confirmButtonColor: '#6c63ff',
		timer: 1500,
		showConfirmButton: false,
	});
};

export const removeFromCart = (itemId: string) => {
	const currentCart = cartVar();
	const updatedCart = currentCart.filter((item) => item._id !== itemId);
	updateCart(updatedCart);
};

export const updateCartItemQuantity = (itemId: string, quantity: number) => {
	const currentCart = cartVar();
	const updatedCart = currentCart.map((item) =>
		item._id === itemId
			? { ...item, quantity, subtotal: item.price * quantity }
			: item
	);
	updateCart(updatedCart);
};

export const getCartTotal = () => {
	const currentCart = cartVar();
	return currentCart.reduce((sum, item) => sum + item.subtotal, 0);
};

export const getCartItemCount = () => {
	const currentCart = cartVar();
	return currentCart.reduce((sum, item) => sum + item.quantity, 0);
};

export const clearCart = () => {
	updateCart([]);
};
