// import React from 'react'
import { useState, useEffect } from "react";
// import "./Advertisment.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";

export default function Advertisment() {
    const [schemeName, setSchemeName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [carouselItems, setCarouselItems] = useState([]);
    const [tableData, setTableData] = useState([]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    // Load data from backend on component mount
    useEffect(() => {
        // Fetch carousel items from backend
        axios.get("https://apnidukan-vn2v.onrender.com/api/carousel")
            .then((response) => {
                setCarouselItems(response.data);
                setTableData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newCarouselItem = {
            schemeName,
            startDate,
            endDate,
        };

        // Send new carousel item to backend
        axios.post("https://apnidukan-vn2v.onrender.com/api/carousel", newCarouselItem)
            .then((response) => {
                setCarouselItems([...carouselItems, response.data]);
                setTableData([...tableData, response.data]);
                setSchemeName("");
                setStartDate("");
                setEndDate("");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleDelete = (id) => {
        // Send delete request to backend
        axios.delete(`https://apnidukan-vn2v.onrender.com/api/carousel/${id}`)
            .then(() => {
                setCarouselItems(carouselItems.filter((item) => item._id !== id));
                setTableData(tableData.filter((item) => item._id !== id));
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <div className="carousel">
                <h2>Carousel</h2>
                <Slider {...settings}>
                    {carouselItems.map((item) => (
                        <div className="box" key={item._id}>
                            <h2>{item.schemeName}</h2>
                            <p className="p-1" >Start Date: {item.startDate}</p>
                            <p className="p-2" >End Date: {item.endDate}</p>
                        </div>
                    ))}
                </Slider>
                </div>


                <div className="data-table-container">
                    <h2>Table</h2>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Scheme Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.schemeName}</td>
                                    <td>{item.startDate}</td>
                                    <td>{item.endDate}</td>
                                    <td>
                                        <button onClick={() => handleDelete(item._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <form onSubmit={handleFormSubmit}>
                    <input
                        type="text"
                        placeholder="Scheme Name"
                        value={schemeName}
                        onChange={(e) => setSchemeName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Start Date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="End Date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <button type="submit">Add to Carousel and Table</button>
                </form>
            {/* </div> */}
        </>
    )
}
