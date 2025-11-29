import withLayoutFull from "../../libs/components/layout/LayoutFull";
import CheckoutForm from "../../libs/components/subscription/CheckoutForm";

function PaymentPage() {
  return (
    <CheckoutForm />
  );
}

export default withLayoutFull(PaymentPage);
