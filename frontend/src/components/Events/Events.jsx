import styles from '../../styles/styles'
import EventCard from './EventCard'

const Events = () => {
    return (
        <div>
            <div className={`${styles.section}`}>
                <div className={`${styles.heading}`}>
                    Popular Events
                </div>
                <div className='grid w-full mb-12'>
                    <EventCard />
                </div>
            </div>
        </div>
    )
}

export default Events