import './App.css';
import './popup.css';
import CollectionsPage from './collections-page';
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// This function is for the button you click to add a collection
function AddNewCollectionButton({ onClick }) {

  return (
    
    <button
    onClick={onClick}
    className="add-new-collection-button">
      Add New Collection
    </button>
  );
}

// Pop-up to add a collection
function PopUpUnderLimit({ onClose, PopUpInputValue, handlePopupInputChange, handleSubmitPopUpValue }) {

  // This is so the "Done" button closes the popup box and transfers the text to the other component at the same time
  function handleSubmitAndClose () {
    handleSubmitPopUpValue();
    onClose();
  }

  return (
    <>
    <div className="popup-overlay-under">
      <div className="popup-box-under">
        <button className="close-button" onClick={onClose}>x</button>
        <h2>Enter a name for the collection</h2>
        <h6>This will be the name of your collection that will display on the front page</h6>
        <div className="rectangle-button-container">
          <input className="rectangle-outline" type="text" placeholder="Enter text here... " value={PopUpInputValue} onChange={handlePopupInputChange}/>
          <button className="popup-box-under-button" onClick={handleSubmitAndClose}>Done</button>
        </div>
      </div>
    </div>
    </>
  )
}

// Pop-up when there's too many
function PopUpOverLimit({ onClose }) {

  return (
    <>
    <div className="popup-overlay-over">
      <div className="popup-box-over">
        <button className="close-button" onClick={onClose}>x</button>
        <p>Maximum number of collections has been reached (18)</p>
      </div>
    </div>
    </>
  )
}

// This function is for the button that holds the collection
function RoundedRectangle({ PopUpSubmittedValue }) {

  const navigate = useNavigate();

  const handleClick = () => {

    navigate(`/collections/${PopUpSubmittedValue}`);
  }

  return (
    <>
    <div className="rounded-rectangle" onClick={handleClick}>
      {PopUpSubmittedValue}
    </div>
    </>
  );
}


// This includes logic to decide which pop-up should appear and adds the collection buttons
function Sections({ setShowPopUpOverLimit, setShowPopUpUnderLimit, PopUpSubmittedValue, addRectangle, rectangles }) {
  
  return (
    <>
    <div className="top-section">
      <h1>Collections</h1>
    </div>
      <div className="bottom-section">
        <AddNewCollectionButton onClick={addRectangle} />
        <div className="grid-container">
          {rectangles}
        </div>
      </div>
    </>
  );
}

// The highest-tier container
function App() {

  const [rectangles, setRectangles] = useState([]);

  const addRectangle = () => {

    // Max amount of collections is 20
    if (rectangles.length < 18) {

      setShowPopUpUnderLimit(true);
    }

    else {
      
      setShowPopUpOverLimit(true);
    }

  };

  // Here is the code that gets the user input from the pop-up for the collection name

  const [PopUpInputValue, setPopUpInputValue] = useState(' ');

  // This is in case I need to do something with the final value in the future.
  const [PopUpSubmittedValue, setPopUpSubmittedValue] = useState(' ');

  const handlePopupInputChange = (e) => {

    setPopUpInputValue(e.target.value);

  }

  const handleSubmitPopUpValue = () => {

    setPopUpSubmittedValue(PopUpInputValue);
    setRectangles([...rectangles, <RoundedRectangle key={rectangles.length} PopUpSubmittedValue={PopUpInputValue} />]);

  };

  // Here is the code for the program that decides which pop-up shows up

  const [showPopUpUnderLimit, setShowPopUpUnderLimit] = useState(false);
  const [showPopUpOverLimit, setShowPopUpOverLimit] = useState(false);

  // This decides whether the pop-ups should be visible or not
  const closePopup = () => {
      
      setShowPopUpUnderLimit(false);
      setShowPopUpOverLimit(false);
    
  }

  // Here is the code that decides whether or not the collections page should show up

  return (
    <Router>
      <div className="App">
        {showPopUpOverLimit && <PopUpOverLimit onClose={closePopup}/>}
        {showPopUpUnderLimit && (

          <PopUpUnderLimit 
            onClose={closePopup} 
            PopUpInputValue={PopUpInputValue}
            handlePopupInputChange={handlePopupInputChange}
            handleSubmitPopUpValue={handleSubmitPopUpValue}
            PopUpSubmittedValue={PopUpSubmittedValue}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={
              <Sections 
                setShowPopUpOverLimit={setShowPopUpOverLimit} 
                setShowPopUpUnderLimit={setShowPopUpUnderLimit} 
                PopUpSubmittedValue={PopUpSubmittedValue}
                rectangles={rectangles}
                addRectangle={addRectangle}
              />
            }
          />
          <Route
            path="/collections/:collectionName"
            element={
              <CollectionsPage/>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
