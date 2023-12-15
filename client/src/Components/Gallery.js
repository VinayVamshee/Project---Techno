import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Gallery() {

    const [IsLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true)
        }
        else {
            setIsLoggedIn(false)
        }
    }, [])


    const [CarouselImage, setCarouselImage] = useState({
        Image: ''
    });

    const [Card, setCard] = useState({
        MainImage: '',
        Description: '',
        AdditionalImages: [],
        YoutubeLink: ''
    })

    const AddNewCard = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://project-techno.vercel.app/AddNewCard", { ...Card })
               .then(result => {
                    console.log(result)
                    alert('New Card Added')
                    window.location.reload();
                })
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error);
        }
    }

    const AddNewCarousel = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://project-techno.vercel.app/AddNewCarouselImage", { ...CarouselImage })
               .then(result => {
                console.log(result)
                alert('New Image Added')
                window.location.reload();
            })
                .catch(error => console.log(error))
            alert('Added New Image')
        } catch (error) {
            console.log(error);
        }
    }

    const [AllGalleryImages, setAllGalleryImages] = useState([])

    const GetGalleryImages = async (id) => {
        axios.get('https://project-techno.vercel.app/GetGalleryImages/' + id)
            .then(result => setAllGalleryImages(result.data))
            .catch(error => console.log(error))
    }

    const [AllCard, setAllCard] = useState([]);
    const [AllCarouselImage, setAllCarouselImage] = useState([]);

    useEffect(() => {
        axios.get('https://project-techno.vercel.app/GetGalleryCard')
            .then(result => setAllCard(result.data))
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        axios.get('https://project-techno.vercel.app/GetCarouselImage')
            .then(result => setAllCarouselImage(result.data))
            .catch(error => console.log(error))
    }, [])

    const DeleteCard = async (id) => {
        axios.delete('https://project-techno.vercel.app/DeleteGalleryCard/' + id)
            .then(result => {
                console.log(result)
                window.location.reload();
            })
            .catch(error => console.log(error))
    }

    const DeleteCarouselImage = async (id) => {
        axios.delete('https://project-techno.vercel.app/DeleteCarouselImage/' + id)
            .then(result => {
                console.log(result)
                window.location.reload();
            })
            .catch(error => console.log(error))
    }

    const handleImageChange = (e) => {
        const urls = e.target.value.split(',').map((url) => url.trim());
        setCard({ ...Card, AdditionalImages: urls });
    };

    return (
        <div className='Gallery'>
            <div className='CarouselDiv'>
                <div id="carouselAutoplaying" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {
                            AllCarouselImage.length > 0 && (
                                <div className="carousel-item active">
                                    <img src={AllCarouselImage[AllCarouselImage.length - 1].Image} className="d-block" alt="..." />
                                    {
                                        IsLoggedIn ? (
                                            <div style={{ marginTop: '10px' }}>
                                                <button className='btn btn-danger' onClick={() => DeleteCarouselImage(AllCarouselImage._id)}><i className="fa-solid fa-trash " />Delete</button>
                                            </div>
                                        ) :
                                            null
                                    }
                                </div>
                            )
                        }
                        {
                            AllCarouselImage.slice(0, -1).map((Element, idx) => {
                                return (
                                    <div className="carousel-item" key={idx}>
                                        <img src={Element.Image} className="d-block" alt="..." />
                                        {
                                            IsLoggedIn ? (
                                                <div style={{ marginTop: '10px' }}>
                                                    <button className='btn btn-danger' onClick={() => DeleteCarouselImage(Element._id)}><i className="fa-solid fa-trash " />Delete</button>
                                                </div>
                                            ) :
                                                null
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button className="carousel-control-prev" style={{ height: '400px' }} type="button" data-bs-target="#carouselAutoplaying" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" style={{ height: '400px' }} type="button" data-bs-target="#carouselAutoplaying" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                {
                    IsLoggedIn ? (
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
                            <button type="button" className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#AddNewCarouselImageModal">Add Carousel Image</button>

                        </div>
                    ) :
                        null
                }
            </div>

            <div className='Gallery-Cards'>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {
                        AllCard.map((Element, idx) => {
                            return (
                                <div className="col" key={idx}>
                                    <div className="card shadow-sm">
                                        <img src={Element.MainImage} alt='...' />
                                        <div className="card-body">
                                            <p className="card-text">{Element.Description}</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => GetGalleryImages(Element._id)} data-bs-toggle="modal" data-bs-target="#ViewMoreModal">View More...</button>
                                                    {
                                                        IsLoggedIn ? (
                                                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => DeleteCard(Element._id)}><i className="fa-solid fa-trash " />Delete</button>
                                                        ) :
                                                            null
                                                    }
                                                </div>
                                                <small className="text-body-secondary">9 mins</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {
                IsLoggedIn ? (
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
                        <button type="button" className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#AddNewCardModal">Add New Card</button>
                    </div>
                ) :
                    null
            }



















            {/* AddNewCard */}
            <div className="modal fade" id="AddNewCardModal" tabIndex="-1" aria-labelledby="AddNewCardModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={AddNewCard}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="AddNewCardModalLabel">Add New Card</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body AddModal">
                                <label>Card Image:</label>
                                <input value={Card.MainImage} onChange={(e) => setCard({ ...Card, MainImage: e.target.value })} type='url'></input>
                                <label>Card Description:</label>
                                <input value={Card.Description} onChange={(e) => setCard({ ...Card, Description: e.target.value })} type='text'></input>
                                <label>Additional Images:</label>
                                <textarea value={Card.AdditionalImages.join(',')} onChange={handleImageChange} type='url'></textarea>
                                <label>Youtube Link:</label>
                                <input value={Card.YoutubeLink} onChange={(e) => setCard({ ...Card, YoutubeLink: e.target.value })} type='text'></input>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Add New Card</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* AddNewCarouselImage */}
            <div className="modal fade" id="AddNewCarouselImageModal" tabIndex="-1" aria-labelledby="AddNewCarouselImageModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={AddNewCarousel}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="AddNewCardModalLabel">Add New Image</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body AddModal">
                                <label>Image:</label>
                                <input value={CarouselImage.Image} onChange={(e) => setCarouselImage({ ...CarouselImage, Image: e.target.value })} type='url'></input>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Add New Image</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* ViewMoreModal */}
            <div className="modal fade" id="ViewMoreModal" tabIndex="-1" aria-labelledby="ViewMoreModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="ViewMoreModalLabel">{Element.Description}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body AdditionalImages">
                            {
                                AllGalleryImages.AdditionalImages?.map((image, idx) => (
                                    <img key={idx} src={image} alt='...' />
                                ))
                            }
                        </div>
                        <div className="modal-footer">
                            <a href={AllGalleryImages.YoutubeLink} target='_blank' rel="noreferrer" type="button" className="btn btn-outline-danger"><i className="fa-brands fa-youtube " />Youtube Link</a>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
