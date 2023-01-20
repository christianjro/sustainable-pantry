import { useState, useEffect } from "react";
import {Routes, Route} from 'react-router-dom';
import AllItems from './pages/AllItems';
import Discover from './pages/Discover';
import Navbar from './components/Navbar';


const API_BASE = "https://sustainable-pantry-server.herokuapp.com/";
// const API_BASE = "http://localhost:3001";

export default function App() {
    // items and functions are saved in root so they can be passed down to all components/ future components
    const [items, setItems] = useState([]);
    const [userEmail, setUserEmail] = useState('christian.jro25@gmail.com');
    const [isEmailEntered, setIsEmailEntered] = useState(false);
    

    useEffect(() => {
        GetItems();
    }, []);

    function GetItems() {
        fetch(API_BASE + "/items")
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(err => console.error(err));
    }

    async function increaseItem(id) {
        const data = await fetch(API_BASE + "/item/increase/" + id, {method: "PUT"})
            .then(res => res.json());
        
        setItems(items => items.map(item => {
            if (item._id === data._id) {
                item.quantity = data.quantity
            }
            return item;
        }));
    }

    async function decreaseItem(id) {
        const data = await fetch(API_BASE + "/item/decrease/" + id, {method: "PUT"})
            .then(res => res.json());
        
        setItems(items => items.map(item => {
            if (item._id === data._id) {
                item.quantity = data.quantity
            }
            return item;
        }));
    }

    async function deleteItem(id) {
        const data = await fetch(API_BASE + "/item/delete/" + id, {method: "DELETE"})
            .then(res => res.json());
        
        setItems(items => items.filter(item => item._id !== data._id));
    }

    function updateUserEmail(email) {
        setIsEmailEntered(true);
        setUserEmail(email);
    }
    
	return (
		<div className="App">
            <Navbar />

            <div className="appContent">
                <Routes>
                    <Route 
                        path="/" 
                        element={<AllItems 
                            items={items} 
                            setItems={setItems} 
                            increaseItem={increaseItem} 
                            decreaseItem={decreaseItem} 
                            deleteItem={deleteItem} 
                            API_BASE={API_BASE} 
                            userEmail={userEmail} 
                            updateUserEmail={updateUserEmail} 
                            isEmailEntered={isEmailEntered}/>} 
                    />
                    <Route path="/discover" element={<Discover />} />
                </Routes>
            </div>
		</div>
	);
};