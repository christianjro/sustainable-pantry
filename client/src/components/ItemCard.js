import React from 'react';
import {useEffect} from 'react';

export default function ItemCard({item, increaseItem, decreaseItem, deleteItem, API_BASE, userEmail}) {
  
  async function sendEmail(item) {
    const res = await fetch(API_BASE + '/api/run-function', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({item: item, userEmail: userEmail}),
    });
    const json = await res.json();
  }

  function itemQuantityCheck() {
    if(item.quantity == 0) {
      sendEmail(item)
    }
  }

  useEffect(() => {
    itemQuantityCheck()
  }, [item.quantity])
  
  return (
    <div className="item" key={item._id}>
        <h3>{item.title}</h3>
        <span></span>
        <p>Quantity: {item.quantity}</p>
        <div className="itemButtons">
            <button onClick={() => decreaseItem(item._id)} className="decreaseButton">-</button>
            <button onClick={() => deleteItem(item._id)} className="deleteButton">Delete</button>
            <button onClick={() => increaseItem(item._id)} className="increaseButton">+</button>
        </div>
    </div>
  )
}
