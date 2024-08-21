import { useParams } from 'react-router-dom';
import './collections-page.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function CollectionsPage() {

    const { collectionName } = useParams();

    // Logic for adding a collection item
    const [items, setItems] = useState([]);

    const handleAddItemClick = () => {

        const newItem = {

            id: items.length + 1,
            title: `Item ${items.length + 1}`,
            description: `desc`,
        };

        setItems([...items, newItem]);
    }

    return (
        <>
        <div className="collections-page">
            <TopBar handleAddItemClick={handleAddItemClick}/>
            <header className="header">
                <h1 className="title">{collectionName}</h1>
                <p className="subtitle">Explore and modify the items in this collection</p>
            </header>
            <ItemGrid items={items}/>
        </div>
        </>
    );
}

function TopBar({ handleAddItemClick }) {

    const navigate = useNavigate();

    // So program can go back to the home page
    const handleBackClick = () => {

    navigate(`/`);
    }

    return (
        <>
        <div className="top-bar">
                <button className="back-button" onClick={handleBackClick}>← Back</button>
                <button className="add-item-button" onClick={handleAddItemClick}>+ Add Collection Item</button>
        </div>
        </>
    )
}

function ItemGrid({ items }) {



    return (
        <>
        <section className="item-grid">
                {items.map(item => (
                    <div className="item-card" key={item.id}>
                        <h3 className="item-title">{item.title}</h3>
                        <p className="item-description">{item.description}</p>
                        <button className="action-button">View Details</button>
                    </div>
                ))}
            </section>
        </>
    )
}

export default CollectionsPage;
