import { useParams } from 'react-router-dom';
import './collections-page.css';
import './collections-page-popup.css';
import './collections-page-sidebar.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function CollectionsPage() {

    const { collectionName } = useParams();

    // Logic for adding a collection item
    const [items, setItems] = useState([]);
    const [sidebarItems, setSidebarItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleAddItemClick = () => {

        setShowPopUp(true);
    }
    
    // Logic for knowing when to show the pop-up and the input for the pop-up
    const [showPopUp, setShowPopUp] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleClose = () => {

        setShowPopUp(false);
    }

    // This is for clicking the confirm button on the pop-up
    const handleAction = () => {

        const newItem = {

            id: items.length + 1,
            title: `${inputValue}`,
        };

        setItems([...items, newItem]);

        setShowPopUp(false);
    }

    // This is for cicking the details button
    const handleDetailsClick = (item) => {

        setSelectedItem(item);
        setSidebarItems([...sidebarItems, item]);
        document.getElementById("mySidebar").classList.add("active"); // This line opens the correct sidebar
        
    }

    return (
        <>
        <div className="collections-page">
            <SideBar selectedItem={selectedItem} setSelectedItem={setSelectedItem} items={items} setItems={setItems}/>
            {showPopUp && 
            <CollectionsPagePopup
                handleClose={handleClose} 
                handleAction={handleAction} 
                inputValue={inputValue} 
                setInputValue={setInputValue}
            />
            }
            <TopBar handleAddItemClick={handleAddItemClick}/>
            <header className="header">
                <h1 className="title">{collectionName}</h1>
                <p className="subtitle">Explore and modify the items in this collection</p>
            </header>
            <ItemGrid items={items} handleDetailsClick={handleDetailsClick}/>
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

function ItemGrid({ items, handleDetailsClick }) {

    return (
        <>
        <section className="item-grid">
                {items.map(item => (
                    <div className="item-card" key={item.id}>
                        <h3 className="item-title">{item.title}</h3>
                        <button className="action-button" onClick={() => handleDetailsClick(item)}>View Details</button>
                    </div>
                ))}
            </section>
        </>
    )
}

function CollectionsPagePopup({ handleClose, handleAction, inputValue, setInputValue }) {

    return (
        <>
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="popup-close-button" onClick={handleClose}>×</button>
                <h2 className="popup-header">Add an item to the collection</h2>
                <div className="popup-body">
                    <p>Enter a name for the collection item.</p>
                    <input
                        type="text"
                        className="popup-input"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type something here..."
                    />
                </div>
                <button className="popup-action-button" onClick={handleAction}>Confirm</button>
            </div>
        </div>
        </>
    )
}

function SideBar({ selectedItem, setSelectedItem, items, setItems }) {

    const [description, setDescription] = useState(selectedItem ? selectedItem.description || '' : '');
    const [imageLink, setImageLink] = useState(selectedItem ? selectedItem.imageLink || '' : '');

    const handleSubmitSidebar = () => {

        const updatedItem = {
            ...selectedItem,
            description: description,
            done: "yes",
        };
        setSelectedItem(updatedItem);

    // When a description is submitted, these next few lines update that outside just this function scope
    const index = items.findIndex(item => item.id == updatedItem.id);

    if (index != -1) {

        const updatedItems = [...items];
        updatedItems[index] = updatedItem;
        setItems(updatedItems);
        setSelectedItem(updatedItem);
    }
    };

    const handleSubmitImage = () => {

        const updatedItemImage = {
            ...selectedItem,
            imageLink: imageLink,
            doneImage: "yes",
        };
        setSelectedItem(updatedItemImage);

    // When a description is submitted, these next few lines update that outside just this function scope
    const index = items.findIndex(item => item.id == updatedItemImage.id);    
      
    if (index != -1) {
    
        const updatedItems = [...items];
        updatedItems[index] = updatedItemImage;
        setItems(updatedItems);
        setSelectedItem(updatedItemImage);
    }
    };


    return (
        <div id="mySidebar" className="sidebar">
            <button className="close-button" onClick={() => document.getElementById("mySidebar").classList.remove("active")}>×</button>
            <div className="sidebar-content">
                {selectedItem && (
                    <>  
                        {/* Conditionally render image text area */}
                        {selectedItem.doneImage == "yes" ? (
                            <img src={selectedItem.imageLink} alt={"User-provided"} className="uploaded-image" />
                        ) : (
                            <>
                                <h3>Image</h3>
                                <textarea
                                    className="description-area"
                                    placeholder="Enter an image link"
                                    value={imageLink}
                                    onChange={(e) => setImageLink(e.target.value)}
                                ></textarea>
                            </>
                        )}

                        {selectedItem.doneImage !== "yes" && (
                            <button className="submit-button" onClick={handleSubmitImage}>Submit</button>
                        )}
                        <h2>{selectedItem.title}</h2>

                        {/* Conditionally render textarea or submitted text */}
                        {selectedItem.done === "yes" ? (
                            <p>{selectedItem.description}</p>  // Display the submitted text
                        ) : (
                            <>
                                <h3>Description</h3>
                                <textarea
                                    id="description"
                                    className="description-area"
                                    placeholder="Enter description..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </>
                        )}

                        {/* Show submit button only if the description is not submitted */}
                        {selectedItem.done !== "yes" && (
                            <button className="submit-button" onClick={handleSubmitSidebar}>Submit</button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
export default CollectionsPage;
