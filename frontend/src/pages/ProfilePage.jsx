import { useState, useEffect } from 'react';
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx';
import Header from '../components/Layout/Header';
import ProfileSideBar from '../components/Profile/ProfileSideBar';
import ProfileContent from '../components/Profile/ProfileContent';
import styles from '../styles/styles';

const ProfilePage = () => {
    // Initialize active tab from localStorage, defaulting to 1
    const [active, setActive] = useState(() => {
        const savedActive = localStorage.getItem('profileActiveTab');
        return savedActive ? Number(savedActive) : 1;
    });

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Save active tab state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('profileActiveTab', active);
    }, [active]);

    return (
        <div className="bg-gray-50 min-h-screen relative">
            <Header />

            {/* MOBILE TOGGLE BUTTON */}
            <div className="md:hidden px-4 pt-4 flex items-center justify-between">
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition active:scale-95"
                >
                    <RxHamburgerMenu size={20} />
                    <span>Profile Menu</span>
                </button>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className={`${styles.section} flex flex-col md:flex-row gap-4 md:gap-6 my-4 md:my-6 px-2 sm:px-4 max-w-[1300px] mx-auto`}>

                {/* DESKTOP SIDEBAR */}
                <div className="hidden md:block w-[250px] lg:w-[300px] shrink-0 sticky top-24 h-fit">
                    <ProfileSideBar active={active} setActive={setActive} />
                </div>

                {/* FLOATING MOBILE DRAWER CONTAINER */}
                <div 
                    className={`
                        fixed inset-0 z-50 md:hidden transition-all duration-300 ease-in-out
                        ${isMenuOpen ? 'pointer-events-auto visibility-visible' : 'pointer-events-none delay-300'}
                    `}
                >
                    {/* Backdrop Fade */}
                    <div
                        className={`
                            fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out
                            ${isMenuOpen ? 'opacity-100' : 'opacity-0'}
                        `}
                        onClick={() => setIsMenuOpen(false)}
                    />

                    {/* Drawer Slide-In */}
                    <div
                        className={`
                            relative w-[280px] max-w-[80%] bg-white h-full shadow-2xl p-4 overflow-y-auto z-10
                            transform transition-transform duration-300 ease-in-out
                            ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                        `}
                    >
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
                            <span className="font-semibold text-gray-700">Navigation</span>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-1 rounded-full text-gray-500 hover:bg-gray-100 transition"
                            >
                                <RxCross1 size={20} />
                            </button>
                        </div>

                        {/* Sidebar Items */}
                        <div onClick={() => setIsMenuOpen(false)}>
                            <ProfileSideBar active={active} setActive={setActive} />
                        </div>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="flex-1 bg-white rounded-lg shadow-sm p-3 sm:p-6 border border-gray-100 overflow-hidden">
                    <ProfileContent active={active} />
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;