import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import CheckoutSteps from '../components/Checkout/CheckoutSteps';
import Checkout from '../components/Checkout/Checkout';

const PaymentOrderPage = () => {
    return (
        <>
            <Header activeHeading={3} />
            <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4">
                <CheckoutSteps active={2} />
                <Checkout/>
            </div>
            <Footer />
        </>
    )
}

export default PaymentOrderPage