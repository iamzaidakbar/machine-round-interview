import React, { useEffect, useState } from 'react'
import "./MarkAndShift.scss"
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const MarkAndShift = () => {
    const mockData = [
        {
            id: 1,
            name: 'Mark',
        },
        {
            id: 2,
            name: 'Joe',
        },
        {
            id: 3,
            name: 'John',
        },
        {
            id: 4,
            name: 'Emiway',
        },
        {
            id: 5,
            name: 'Zaid',
        },

    ]

    const [data, setData] = useState([])
    const [shiftedData, setShiftedData] = useState([])
    const [markedData, setMarkedData] = useState([])

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(mockData)
        }, 500)
    })

    useEffect(() => {
        promise.then((data) => {
            console.log("Fake data received:", data);
            setData(data)
        }).catch((error) => {
            console.error("Error occurred:", error);
        });
    }, [])

    const handleOnChange = (e, item) => {
        const { checked } = e.target;
        if (checked) {
            setMarkedData(new Set([...markedData, item]));
        } else {
            const newData = new Set(markedData);
            newData.delete(item);
            setMarkedData(newData);
        }
    };

    const shiftData = () => {
        setShiftedData(prevData => [...prevData, ...markedData]);
        setData(data.filter(item => ![...markedData].some(markedItem => markedItem.id === item.id)));
        setMarkedData(new Set([]));
        unCheckAllCheckBoxes();
    };

    const unShiftData = () => {
        setData(prevData => [...prevData, ...markedData]);
        setShiftedData(shiftedData.filter(item => ![...markedData].some(markedItem => markedItem.id === item.id)));
        setMarkedData(new Set([]));
        unCheckAllCheckBoxes();
    }


    const unCheckAllCheckBoxes = () => {
        document.querySelectorAll('input[name="client"]').forEach((checkbox) => {
            checkbox.checked = false;
        });
    }


    return (
        <div className='MarkAndShift'>
            <div className='wrapper'>
                <section className='section_1'>
                    {data && data?.map(item => <span className='item' key={item.id}>
                        <input name='client' onChange={(e) => { handleOnChange(e, item) }} type='checkbox' />
                        <span className='item_name'>{item.name}</span>
                    </span>)}
                </section>
                <section className='section_2'>
                    <IoIosArrowForward className={(data?.length === 0 || markedData?.size === 0) ? 'disabled' : ''} onClick={shiftData} size={'50px'} color='white' />
                    <IoIosArrowBack className={(shiftedData.length === 0 || markedData.size === 0) ? 'disabled' : ''} onClick={unShiftData} size={'50px'} color='white' />
                </section>
                <section className='section_3'>
                    {shiftedData && shiftedData?.map(item => <span className='item' key={item.id}>
                        <input name='client' onChange={(e) => { handleOnChange(e, item) }} type='checkbox' />
                        <span className='item_name'>{item.name}</span>
                    </span>)}
                </section>
            </div>
        </div>
    )
}

export default MarkAndShift