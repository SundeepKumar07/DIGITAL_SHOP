import { useState } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQSPage = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqData = [
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, PayPal, and cash on delivery for selected locations. All transactions are secured with SSL encryption."
        },
        {
            question: "How long does shipping take?",
            answer: "Standard shipping takes 3-5 business days within Pakistan. Express shipping is available and takes 1-2 business days. International orders may take 7-14 business days depending on the destination."
        },
        {
            question: "What is your return policy?",
            answer: "We offer a 14-day return policy for unused items in original packaging. Simply contact our customer service team to initiate a return. Refunds are processed within 5-7 business days after we receive the returned item."
        },
        {
            question: "Do you offer free shipping?",
            answer: "Yes! We offer free standard shipping on all orders above Rs. 2,000 within Pakistan. For orders below this amount, a flat shipping fee of Rs. 150 applies."
        },
        {
            question: "How can I track my order?",
            answer: "Once your order is shipped, you'll receive a tracking number via email and SMS. You can use this number to track your package on our website or the courier's website. You can also check your order status by logging into your account."
        },
        {
            question: "Can I modify or cancel my order?",
            answer: "You can modify or cancel your order within 2 hours of placing it. After this time, the order is processed for shipping. Please contact our support team immediately if you need to make changes."
        },
        {
            question: "Are the products genuine?",
            answer: "Yes, all our products are 100% genuine and sourced directly from authorized distributors and brands. We guarantee authenticity and quality for every item sold on our platform."
        },
        {
            question: "Do you have a physical store?",
            answer: "Currently, we operate exclusively online to provide you with the best prices and convenience. However, we have plans to open physical stores in major cities soon. Stay tuned for updates!"
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <Header activeHeading={5} />
            <div className="min-h-screen py-12 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-800 mb-3">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-gray-600">
                            Find answers to common questions about our services
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqData.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
                                >
                                    <span className="text-lg font-semibold text-gray-800 pr-4">
                                        {faq.question}
                                    </span>
                                    <span className="flex-shrink-0">
                                        {openIndex === index ? (
                                            <FaChevronUp className="w-5 h-5 text-blue-600" />
                                        ) : (
                                            <FaChevronDown className="w-5 h-5 text-gray-400" />
                                        )}
                                    </span>
                                </button>

                                <div
                                    className={`transition-all duration-300 ease-in-out ${openIndex === index
                                            ? 'max-h-96 opacity-100'
                                            : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            Still have questions?
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Can't find the answer you're looking for? Please contact our customer support team.
                        </p>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};
export default FAQSPage