import withLayoutFull from '../../libs/components/layout/LayoutFull';
import Checkout from '../../libs/components/order/Checkout';

function CheckoutPage() {
	return <Checkout />;
}

export default withLayoutFull(CheckoutPage);
