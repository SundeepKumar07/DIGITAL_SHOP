import React, { useEffect, useState } from 'react'

const Payment = () => {
    const [orderData, setOrderData] = useState(null);
    useEffect(() => {
        const savedOrder = JSON.parse(localStorage.getItem('latestOrder'));
        setOrderData(savedOrder);
    }, [])
  return (
    <div>Payment</div>
  )
}

export default Payment