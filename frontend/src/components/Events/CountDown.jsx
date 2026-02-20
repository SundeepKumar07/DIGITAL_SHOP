import { useEffect, useState } from 'react'

const CountDown = () => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeLeft]);

    function calculateTimeLeft() {
        const difference = new Date('2025-10-15T23:59:59') - new Date();
        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (24 * 60 * 60 * 1000)),
                hours: Math.floor((difference / (24 * 60 * 60 * 1000)) % 24),
                minutes: Math.floor((difference / (60 * 1000)) % 60),
                seconds: Math.floor(difference / (1000) % 60),
            }
        }
        return timeLeft;
    }

    const timerComponent = Object.keys(timeLeft).map((interval) => {
        if (!timeLeft[interval]) {
            return null;
        }

        return (
            <span key={interval} className='text-blue-500 text-[25px]'>
                {timeLeft[interval]} {interval} {" "}
            </span>
        )
    })


    return (
        <div>
            {timerComponent.length ? timerComponent : <span className='text-[25px] text-[red]'>Time's up</span>}
        </div>
    )
}

export default CountDown