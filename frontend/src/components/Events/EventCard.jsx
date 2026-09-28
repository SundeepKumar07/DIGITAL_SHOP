import styles from '../../styles/styles'
import CountDown from './CountDown'
import { BACKEND_URL } from '../../../server'

const EventCard = ({ data }) => {
  if (!data) return null

  const mainImage = data.images && data.images.length > 0 
    ? `${BACKEND_URL}/${data.images[0]}` 
    : '/placeholder.png'

  return (
    <div className="w-full bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-5 p-4 sm:p-6 gap-6 my-4">
      
      {/* Product Image Section */}
      <div className="lg:col-span-2 w-full flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden aspect-square max-h-[350px] lg:max-h-none border border-gray-50">
        <img 
          src={mainImage} 
          alt={data.name} 
          className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300 ease-in-out"
        />
      </div>

      {/* Product Details Section */}
      <div className="lg:col-span-3 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Tag / Badge */}
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200 w-fit">
            Limited Time Event
          </span>

          {/* Product Name */}
          <h3 className={`${styles.productTitle} text-xl font-bold text-gray-900 line-clamp-2 leading-tight tracking-tight pt-1`}>
            {data.name}
          </h3>

          {/* Product Description */}
          <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed pt-1">
            {data.description || "No description available for this event product."}
          </p>
        </div>

        {/* Pricing & Sales Statistics */}
        <div className="flex items-center justify-between border-y border-gray-50 py-3">
          <div className="flex items-baseline gap-2.5">
            <span className="text-2xl font-extrabold text-gray-900 font-sans">
              {data.discountPrice?.toLocaleString()} PKR
            </span>
            {data.originalPrice && (
              <span className="text-sm font-medium text-red-500 line-through">
                {data.originalPrice?.toLocaleString()} PKR
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-md text-xs font-semibold tracking-wide uppercase">
            <span>{data.sold_out || 0} Sold</span>
          </div>
        </div>

        {/* Action & Expiration Countdown Container */}
        <div className="pt-2 bg-gray-50/50 p-4 rounded-lg border border-gray-100/60">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Event Ends In:
          </p>
          <CountDown startDate={data.startDate} endDate={data.endDate} />
        </div>

      </div>
    </div>
  )
}

export default EventCard