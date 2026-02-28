import { useSelector } from 'react-redux'
import styles from '../../styles/styles'
import EventCard from './EventCard'

const Events = () => {
    const { allEvents } = useSelector(state => state.event)
    return (
        <div>
            <div className={`${styles.section}`}>
                <div className={`${styles.heading}`}>
                    Popular Events
                </div>
                <div className='grid w-full mb-12'>
                    <EventCard data={allEvents[0]} />
                </div>
            </div>
        </div>
    )
}

export default Events