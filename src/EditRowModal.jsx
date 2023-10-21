import React, { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const customStyles = {
    content: {
        width: "300px",
        height: "400px",
        margin: "auto",
        padding: "20px",
    },
};

const EditRowModal = ({ isOpen, onRequestClose, onEditRow, dataToEdit }) => {

    console.log(dataToEdit);

    const [id, setId] = useState();
    const [name, setName] = useState();
    const [status, setStatus] = useState();
    const [feedback, setFeedback] = useState();
    const [rating, setRating] = useState();

    useEffect(() => {
        setId(dataToEdit._id)
        setName(dataToEdit.name)
        setStatus(dataToEdit.status)
        setFeedback(dataToEdit.feedback)
        setRating(dataToEdit.rating)
    }, [])

    const handleEditRow = () => {
        if (name && status && feedback && rating) {
            const payload = {
                id: id,
                name: name,
                status: status,
                feedback: feedback,
                rating: rating,
            };
           
                fetch("http://localhost:3001/api/interview/edit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }).then((res)=>{
                    onRequestClose();
                })
                   
           
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >
            <h2>Edit Row</h2>
            <form>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Status:</label>
                    <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
                </div>
                <div>
                    <label>Feedback:</label>
                    <input type="text" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                </div>
                <div>
                    <label>Rating:</label>
                    <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
                </div>
                <button onClick={handleEditRow}>Save</button>
                <button onClick={onRequestClose}>Cancel</button>
            </form>
        </Modal>
    );
};

export default EditRowModal;
