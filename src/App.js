import React from 'react';
import './App.css';
import Bookmark from './components/bookmark.component';
import GroupBookmark from './components/GroupBookmark.component';

function App() {
    return (
        <div className="container">
            <h1 className="main-title"> Bookmarks </h1>
            <GroupBookmark />
        </div>
    );
}

export default App;
