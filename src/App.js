import './App.css';
import './popup.css';
import React, { useState } from 'react';

let showPopUpOverLimit = false;
let boolClosePopup = false;


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

// This function is for the button that holds the collection
function RoundedRectangle() {

  return (
    <>
    <div className="rounded-rectangle">
      This is a box
    </div>
    </>
  );
}

// Pop-up to add a collection
function PopUpUnderLimit({ onClose, underUserInput }) {

  return (
    <>
    <div className="popup-overlay-under">
      <div className="popup-box-under">
        <button className="close-button" onClick={onClose}>x</button>
        <h2>Enter a name for the collection</h2>
        <h6>This will be the name of your collection that will display on the front page</h6>
        <div className="rectangle-button-container">
          <input className="rectangle-outline" type="text" placeholder="Enter text here... "/>
          <button className="popup-box-under-button">Done</button>
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


// This includes logic to decide which pop-up should appear and adds the collection buttons
function Sections({ setShowPopUpOverLimit, setShowPopUpUnderLimit }) {

  const [rectangles, setRectangles] = useState([]);

  const addRectangle = () => {

    // Max amount of collections is 20
    if (rectangles.length < 18) {

      setShowPopUpUnderLimit(true);
      setRectangles([...rectangles, <RoundedRectangle key={rectangles.length} />]);
    }

    else {
      
      setShowPopUpOverLimit(true);
    }

  };
  
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

  // Here is the code that gets the user input from the pop-up for the collection name

  const [PopUpInputValue, setPopUpInputValue] = useState(' ');
  const [PopUpSubmittedValue, setPopUpSubmittedValue] = useState(' ');

  const handlePopupInputChange = (e) => {

    setPopUpInputValue(e.target.value);

  }

  const handleSubmitPopUpValue = () => {

    setPopUpSubmittedValue(PopUpInputValue);
  };

  // Here is the code for the program that decides which pop-up shows up

  const [showPopUpUnderLimit, setShowPopUpUnderLimit] = useState(false);
  const [showPopUpOverLimit, setShowPopUpOverLimit] = useState(false);

  // This decides whether the pop-ups should be visible or not
  const closePopup = () => {
      
      setShowPopUpUnderLimit(false);
      setShowPopUpOverLimit(false);
    
  }

  return (
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
      <Sections setShowPopUpOverLimit={setShowPopUpOverLimit} setShowPopUpUnderLimit={setShowPopUpUnderLimit}/>
    </div>
  );
}

export default App;
