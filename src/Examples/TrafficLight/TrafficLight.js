import React, { useEffect, useState } from 'react'
import "./TrafficLight.scss"

const Practice = () => {
    const trafficLights = [
        {
            id: 1,
            backgroundColor: 'red',
            duration: 4000,
            next: 'green',
            rule: 'stop',
        },
        {
            id: 2,
            backgroundColor: 'yellow',
            duration: 500,
            next: 'red',
            rule: 'Be Ready',
        },
        {
            id: 3,
            backgroundColor: 'green',
            duration: 3000,
            next: 'yellow',
            rule: 'Go',
        },
    ]

    const [currentColor, setCurrentColor] = useState('green')

    useEffect(() => {
        const { duration, next } = trafficLights.find(item => item.backgroundColor === currentColor)

        const timerId = setTimeout(() => {
            setCurrentColor(next)
        }, duration)

        return () => clearTimeout(timerId)
    }, [currentColor])

    return (
        <div className='traffic_lights'>
            <div className='wrapper'>
                {trafficLights.map(light => <span className={`light ${light.backgroundColor === currentColor ? currentColor : ''}`} key={light.id}>
                    {light.backgroundColor === currentColor ? light.rule : ''}
                </span>)}
            </div>
        </div>
    )
}

export default Practice