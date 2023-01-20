import React from 'react'
import {useState} from 'react'

export default function ({popupActive, setPopupActive, setItems, API_BASE}) {
    const [newItem, setNewItem] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setNewItem(newItem => ({...newItem, [name]: value}));
    }

    const handleSubmit = (event) => {
        addItem();
        event.preventDefault();
    }

    const addItem = async () => {
        const data = await fetch(API_BASE + "/item/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newItem)
        })
            .then(res => res.json());
        
        setItems(items => [...items, data]);
        setPopupActive(false);
        setNewItem({});
    }

    return (
    <div>
        <div className={popupActive ? "overlayActive" : ""}>
            <div className="popup">
                <div className="closePopup" onClick={() => setPopupActive(false)}>
                    <span class="material-symbols-outlined">close</span>
                </div>
                <h3>Add Item</h3>
                
                <form onSubmit={handleSubmit}>
                    <input type="text" name="title" placeholder="Item name" value={newItem.title} onChange={handleChange} />
                    <input type="text" name="description" placeholder="Description" value={newItem.description} onChange={handleChange} />
                    <input type="number" name="quantity" placeholder="Quantity" value={newItem.quantity} onChange={handleChange} />
                    <input type="submit" value="Submit" className="popupSubmitButton"/>
                </form>
            </div>
        </div>
    </div>
    )
}
