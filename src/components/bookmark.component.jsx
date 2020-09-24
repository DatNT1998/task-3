
import React from 'react';

import { Button } from 'reactstrap';

const Bookmark = ({ title, links, showModal }) => {
    console.log("props nay ", showModal)
    const handleShow = () => {
        showModal();
    }
    return (
        <div className="bookmark">
            <a href={links} target="_blank" >{title}</a>
            <div className="buttons">
                <Button color="primary" >Edit</Button>
                <Button color="danger" style={{ marginLeft: '8px' }} onClick={() => handleShow()} >Delete</Button>
            </div>
        </div>
    );
}


export default Bookmark;