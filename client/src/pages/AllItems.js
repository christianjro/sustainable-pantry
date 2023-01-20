import React, {useState} from 'react';
import ItemCard from '../components/ItemCard';
import Popup from '../components/Popup';

export default function AllItems({items, increaseItem, decreaseItem, deleteItem, setItems, API_BASE, userEmail, isEmailEntered, updateUserEmail}) {
  const [popupActive, setPopupActive] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');

  const itemElements = items.map((item) => (
    <ItemCard 
        key={item._id}
        item={item}
        increaseItem={increaseItem}
        decreaseItem={decreaseItem}
        deleteItem={deleteItem}
        API_BASE={API_BASE}
        userEmail={userEmail}
    />
  ))

  function handleChange(e) {
    setNewUserEmail(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    updateUserEmail(newUserEmail)
  }

  return (
    <div>
      {!isEmailEntered &&
        <div className="userEmailForm">
          <p>Enter an email so you are notified when an item's quantity reaches 0.</p>
          <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} className="userEmailInput" />
            <input type="submit" value="Submit" className="userEmailSubmitBtn"/>
          </form>
        </div>
      }
      
      <div className="items">
          {itemElements}
      </div>

      <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

      {popupActive && (
        <Popup 
        popupActive={popupActive} 
        setPopupActive={setPopupActive} 
        setItems={setItems} 
        API_BASE={API_BASE}
        />
      )}
   
    </div>
  )
}
