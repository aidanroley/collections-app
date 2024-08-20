import React from 'react';
import { useParams } from 'react-router-dom';
import './collections-page.css';

function CollectionsPage() {

    const { collectionName } = useParams();
    return (
        <>
        <div className="collections-page">
            <h1>{collectionName}</h1>
        </div>
        </>
    );
}

export default CollectionsPage;

