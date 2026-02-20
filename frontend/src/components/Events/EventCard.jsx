import styles from '../../styles/styles'
import CountDown from './CountDown'

const EventCard = () => {
  return (
    <div className='flex flex-col sm:flex-row bg-white rounded-md pb-12'>
      <div className='w-full xl:w-[40%]'>
        <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="" />
      </div>
      <div className='w-full xl:w-[60%] flex flex-col items-center justify-center pr-2'>
        <div>
          <h3 className={styles.productTitle}>Iphone 14 pro max 256 gb ssd and 8 gb</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda expedita sit odio distinctio laudantium nihil harum saepe rerum? Odit animi quis neque? Quisquam magnam, numquam repellat fuga perferendis autem doloribus quo! Error non omnis veritatis voluptate rerum corrupti, itaque repellat culpa molestiae repudiandae, illo quibusdam quas dolores ab iste incidunt quasi iure. Voluptate, repellat, ex commodi nam vero nulla officiis, distinctio delectus soluta eius fugiat! Fugit accusantium labore, dolore praesentium commodi sapiente nihil excepturi quos magnam deserunt eius incidunt libero veritatis quae. Voluptatum ab deleniti deserunt sint ipsum, ipsa quo id unde expedita quas aliquam porro, labore minima. Possimus, deleniti!
          </p>
          <div className='flex py-2 justify-between pr-5'>
            <div className='flex gap-2'>
              <h5 className={`font-[500] line-through text-red-500 text-xl`}>
                1999
              </h5>
              <h5 className={`font-bold text-xl font-[Reboto]`}>
                1000
              </h5>
            </div>
            <div>
              <h2 className='font-bold text-green-500'>
                120 Sold
              </h2>
            </div>
          </div>
          <CountDown/>
        </div>
      </div>
    </div>
  )
}

export default EventCard