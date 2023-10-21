import React, { useEffect, useState } from "react";
import AddRowModal from "./AddRowModal";
import EditRowModal from "./EditRowModal";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
export const Dashboard = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [dataToEdit, setDataToEdit] = useState({});
    const [tableData, setTableData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const nav = useNavigate();

    const handleEdit = (item) => {
        setDataToEdit(item);
        setIsEditModalOpen(true);
    };

    const handleLogout = () => {
        // Remove the "userId" cookie
        Cookies.remove("userId");

        // Navigate back to the login screen (assuming it's at "/login")
        nav("/login");
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setRefresh(!refresh)
    };
    const closeEditModal = () => {
        setIsModalOpen(false);
    }

    const handleEditRow = (newRow) => {
        console.log(newRow)

    };

    const handleDelete = (id) => {

        const payload = {
            id: id
        };

        fetch("http://localhost:3001/api/interview/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then((res) => {
                setRefresh(!refresh);
            })
            .catch((error) => {
                console.log("Error:", error);
            });

    }

    const handleAddRow = (newRow) => {
        const payload = {
            userId: Cookies.get("userId"),
            name: newRow.name,
            status: newRow.status,
            feedback: newRow.feedback,
            rating: newRow.rating,
        };
        if (newRow) {
            fetch("http://localhost:3001/api/interview/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })
                .then((res) => {
                    setRefresh(!refresh);
                })
                .catch((error) => {
                    console.log("Error:", error);
                });
        }
    };

    useEffect(() => {
        // Make an API call to fetch the data (e.g., names, reviews, comments)
        const payload = {
            userId: Cookies.get("userId")
        };
        fetch("http://localhost:3001/api/interview/getAll", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json()) // Parse the response as JSON
            .then((res) => {
                setTableData(res.data);
            })
            .catch((error) => {
                window.alert("Invalid credentials")
                console.log("Error:", error);
            });
    }, [refresh]);
    const tableStyle = {
        width: "90%",
        borderCollapse: "collapse",
        margin: "5%"
    };

    // Inline CSS for table cells
    const cellStyle = {
        border: "5px solid gray",
        padding: "8px",
        textAlign: "left",
    };

    const logoutStyle = {
        float: "right", /* Align to the right */
        marginRight: "20px",
        padding: "10px 20px",
        backgroundColor: "gray",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    }

    return (
        <div style={{ backgroundColor: "black", color: "gray", height: "100vh", width: "100%" }}>
            <button onClick={handleLogout} style={logoutStyle}>
                Logout
            </button>
            <h2 style={{ marginLeft: "40%" }}>Dashboard</h2>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={cellStyle}>Name</th>
                        <th style={cellStyle}>Status</th>
                        <th style={cellStyle}>Feedback</th>
                        <th style={cellStyle}>Rating</th>
                        <th style={cellStyle}>Action</th> {/* New column for buttons */}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((item, index) => (
                        <tr key={index}>
                            <td style={cellStyle}>{item.name}</td>
                            <td style={cellStyle}>{item.status}</td>
                            <td style={cellStyle}>{item.feedback}</td>
                            <td style={cellStyle}>{item.rating}</td>
                            <td style={cellStyle}>
                                <button style={{
                                    marginRight: "5px",
                                    marginLeft: "40%",
                                    padding: "10px 20px",
                                    backgroundColor: "#007BFF",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }} onClick={() => { handleEdit(item) }}>Edit</button>
                                <button style={{
                                    marginLeft: "5px",
                                    padding: "10px 20px",
                                    backgroundColor: "red",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }} onClick={() => handleDelete(item._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={openModal} style={{
                marginLeft: "40%",
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
            }}>Add Row</button>

            <AddRowModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                onAddRow={handleAddRow}
            />
            {isEditModalOpen && <EditRowModal
                isOpen={isEditModalOpen}
                onRequestClose={closeEditModal}
                onEditRow={handleEditRow}
                dataToEdit={dataToEdit}
            />}
        </div>
    );
};
