import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { server } from '../../server.js';
import { toast } from 'react-toastify';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

const UserActivationPage = () => {
    const { activation_token } = useParams();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const activationSent = useRef(false); // Prevents StrictMode double activation triggers

    useEffect(() => {
        if (activation_token && !activationSent.current) {
            activationSent.current = true;
            
            const activationEmail = async () => {
                try {
                    const res = await axios.post(`${server}/user/activation`, {
                        activation_token,
                    });

                    if (res.data) {
                        setLoading(false);
                        toast.success("Your account has been activated successfully!");
                    } else {
                        setError(true);
                        setLoading(false);
                    }
                } catch (err) {
                    setError(true);
                    setLoading(false);
                    const errorMsg = err.response?.data?.message || "Activation failed";
                    console.error(errorMsg);
                    toast.error(errorMsg);
                }
            };
            activationEmail();
        }
    }, [activation_token]);

    return (
        <div className="w-full h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 text-center transition-all">
                {loading ? (
                    <div className="flex flex-col items-center justify-center gap-4 py-6">
                        <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-600 rounded-full animate-spin" />
                        <h5 className="text-lg font-bold text-gray-800">Verifying Account</h5>
                        <p className="text-sm text-gray-500">Confirming your secure credentials...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center gap-3 py-4">
                        <AiOutlineCloseCircle size={56} className="text-red-500 animate-pulse" />
                        <h5 className="text-xl font-bold text-gray-800 mt-2">Activation Link Invalid</h5>
                        <p className="text-sm text-gray-500 max-w-xs mx-auto">
                            This registration token is expired, corrupted, or has already been used to confirm an account.
                        </p>
                        <div className="w-full pt-4">
                            <Link
                                to="/sign-up"
                                className="w-full inline-flex h-[45px] bg-gray-800 text-white text-sm font-semibold rounded-xl hover:bg-gray-900 transition-all duration-200 items-center justify-center shadow-sm"
                            >
                                Create New Account
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-3 py-4">
                        <AiOutlineCheckCircle size={56} className="text-teal-600" />
                        <h5 className="text-xl font-bold text-gray-800 mt-2">Account Activated!</h5>
                        <p className="text-sm text-gray-500 max-w-xs mx-auto">
                            Your profile is verified. You can now log in to manage orders, tracks, and update your personal settings.
                        </p>
                        <div className="w-full pt-4">
                            <Link
                                to="/login"
                                className="w-full inline-flex h-[45px] bg-teal-600 text-white text-sm font-semibold rounded-xl hover:bg-teal-700 transition-all duration-200 active:scale-[0.99] items-center justify-center shadow-md shadow-teal-600/10"
                            >
                                Sign In to Marketplace
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserActivationPage;