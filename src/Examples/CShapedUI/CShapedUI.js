import React, { useEffect, useState } from 'react'
import "./CShapedUI.scss"

const CShapedUI = () => {

  const [boxes, setBoxes] = useState([
    { id: 1, isChecked: false, isVisible: true },
    { id: 2, isChecked: false, isVisible: true },
    { id: 3, isChecked: false, isVisible: true },
    { id: 4, isChecked: false, isVisible: true },
    { id: 5, isChecked: true, isVisible: false },
    { id: 6, isChecked: true, isVisible: false },
    { id: 7, isChecked: false, isVisible: true },
    { id: 8, isChecked: false, isVisible: true },
    { id: 9, isChecked: false, isVisible: true },
  ])

  const allChecked = boxes.every(box => box.isChecked)

  const [order, setOrder] = useState([])

  const updateBox = (boxId, flag) => {
    setBoxes(prevBoxes =>
      prevBoxes.map(box =>
        box.id === boxId ? { ...box, isChecked: flag } : box
      )
    );
    setOrder(prevOrder => new Set([...prevOrder, boxId]));
  };



  useEffect(() => {
    if (allChecked) {
        let delay = 0;
        order.forEach((id) => {
          setTimeout(() => { updateBox(id, false) }, delay * 1000);
          delay += 1;
        });
    }
  }, [boxes])

  return (
    <div className='CShapedUI'>
      <div className='box-wrapper'>
        {boxes && boxes.map(box => <span onClick={() => { updateBox(box.id, true) }} key={box.id} className={`box ${box.isChecked ? 'yellow' : 'red'} ${box.isVisible ? 'visible' : 'not-visible'}`}>
          {box.id}
        </span>)}
      </div>
    </div>
  )
}

export default CShapedUI