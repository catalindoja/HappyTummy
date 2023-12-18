import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./MyShoppingList.css";

// MyShoppingList component
const MyShoppingList = () => {
    const shoppingList = [
        { id: 1, item: "Item 1", quantity: 3 },
        { id: 2, item: "Item 2", quantity: 5 },
        { id: 3, item: "Item 3", quantity: 2 },
    ];

    return (
        <div className="container">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"></link>
            <div className="content1">
                <div className="box_arrow">
                    <button className="btn1 bg-dark">
                        <span className="go_back">Go Back</span>
                        <span className="arrow"><FontAwesomeIcon icon={faArrowLeft} /></span>
                    </button>
                </div>

                <h3 className="my-5 text-danger">
                    My Shopping List
                    <span className="history_icon"><FontAwesomeIcon icon={faHistory} /></span>
                    <span className="edit text-primery"> <FontAwesomeIcon icon={faPenSquare} /></span>
                </h3>
            </div>

            <div className="tbl">
                <table className="table rounded text-center table-bordered table-striped">
                    <thead>
                        <tr className="head1 text-success">
                            <th scope="col">Select</th>
                            <th scope="col">Item</th>
                            <th scope="col">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shoppingList.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>{item.item}</td>
                                <td>{item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Exporting MyShoppingList component
export default MyShoppingList;
