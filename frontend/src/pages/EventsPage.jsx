import Header from '../components/Layout/Header'
import EventCard from '../components/Events/EventCard'
import { useSelector } from 'react-redux'
import styles from '../styles/styles'

const EventsPage = () => {
  const { allEvents } = useSelector(state => state.event)

  return (
    <div className='bg-gray-100 min-h-screen'>
      {/* Header */}
      <Header activeHeading={4} />

      {/* Page Title */}
      <div className={`${styles.section} py-8`}>
        <h1 className='text-3xl font-bold text-gray-800 mb-6'>
          Upcoming Events
        </h1>

        {/* Event Cards Container */}
        <div className='flex flex-col gap-8'>
          {allEvents && allEvents.length > 0 ? (
            allEvents.map((event, index) => (
              <EventCard data={event} key={index} />
            ))
          ) : (
            <p className='text-center text-gray-500 text-xl'>
              No events available
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default EventsPage