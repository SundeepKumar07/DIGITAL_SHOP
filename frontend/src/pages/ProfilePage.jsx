import { useState } from 'react'
import Header from '../components/Layout/Header'
import ProfileSideBar from '../components/Profile/ProfileSideBar'
import ProfileContent from '../components/Profile/ProfileContent'
import styles from '../styles/styles'

const ProfilePage = () => {
    const [active, setActive] = useState(1);
    return (
        <div>
            <Header />
            <div className={`${styles.section} flex mt-10 pt-8`}>
                <div className='w-[55px] sm:w-[335px] pt-4'>
                    <ProfileSideBar active={active} setActive={setActive} />
                </div>
                <ProfileContent active={active} />
            </div>
        </div>
    )
}

export default ProfilePage