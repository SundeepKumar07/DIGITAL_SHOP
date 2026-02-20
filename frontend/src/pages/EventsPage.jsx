import Header from '../components/Layout/Header'
import EventCard from '../components/Events/EventCard'

const EventsPage = () => {
  return (
    <div>
        <Header activeHeading={4}/>
        <EventCard/>
        <EventCard/>
    </div>
  )
}

export default EventsPage