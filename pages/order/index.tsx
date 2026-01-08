import withLayoutFull from '../../libs/components/layout/LayoutFull';
import OrderHistory from '../../libs/components/order/OrderHistory';

function OrdersPage() {
	return <OrderHistory />;
}

export default withLayoutFull(OrdersPage);
