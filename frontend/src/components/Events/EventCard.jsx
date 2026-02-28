import styles from '../../styles/styles'
import CountDown from './CountDown'
import { BACKEND_URL } from '../../../server'

const EventCard = ({ data }) => {
  if (!data) return null

  return (
    <div className='flex flex-col sm:flex-row bg-white rounded-md pb-12'>
      {/* Product Image */}
      <div className='w-full xl:w-[40%]'>
        <img 
          src={data.images && data.images.length > 0 ? `${BACKEND_URL}/${data.images[0]}` : '/placeholder.png'} 
          alt={data.name} 
          className='w-full h-full object-contain'
        />
      </div>

      {/* Product Details */}
      <div className='w-full xl:w-[60%] flex flex-col items-center justify-center pr-2'>
        <div>
          {/* Product Name */}
          <h3 className={styles.productTitle}>{data.name}</h3>

          {/* Product Description */}
          <p className='pt-2 text-[15px] text-[#333]'>
            {data.description || "No description available."}
          </p>

          {/* Price and Sold Info */}
          <div className='flex py-2 justify-between pr-5'>
            <div className='flex gap-2'>
              {data.originalPrice && (
                <h5 className={`font-[500] line-through text-red-500 text-xl`}>
                  {data.originalPrice} PKR
                </h5>
              )}
              <h5 className={`font-bold text-xl font-[Reboto]`}>
                {data.discountPrice} PKR
              </h5>
            </div>
            <div>
              <h2 className='font-bold text-green-500'>
                {data.sold_out || 0} Sold
              </h2>
            </div>
          </div>

          {/* Countdown */}
          <CountDown startDate={data.startDate} endDate={data.endDate} />
        </div>
      </div>
    </div>
  )
}

export default EventCard