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
        Link: '',
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
        } catch (error) {
            console.log(error);
        }
    }

    // const [AllGalleryImages, setAllGalleryImages] = useState([])

    // const GetGalleryImages = async (id) => {
    //     axios.get('https://project-techno.vercel.app/GetGalleryImages/' + id)
    //         .then(result => setAllGalleryImages(result.data))
    //         .catch(error => console.log(error))
    // }

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

    // const handleImageChange = (e) => {
    //     const urls = e.target.value.split(',').map((url) => url.trim());
    
    //     const convertUrl = (url) => {
    //         if (!url.includes("drive.google.com")) {
    //             return url;
    //         }
    
    //         const match = url.match(/\/d\/(.*?)\//);
    //         const fileId = match ? match[1] : null;
    //         const viewableUrl = fileId ? `https://drive.google.com/uc?id=${fileId}` : null;
    
    //         return viewableUrl;
    //     };
    
    //     const convertedURLs = urls.map(convertUrl);
    //     setCard((prevCard) => ({ ...prevCard, AdditionalImages: convertedURLs }));
    // };
    

    const ChangeCarouselUrl = (e) => {
        const url = e.target.value;

        if (!url.includes("drive.google.com")) {
            setCarouselImage({ ...CarouselImage, Image: url })
        }
        else {
            const match = url.match(/\/d\/(.*?)\//);

            const fileId = match ? match[1] : null;

            const viewableUrl = fileId ? `https://drive.google.com/uc?id=${fileId}` : null;

            setCarouselImage({ ...CarouselImage, Image: viewableUrl });
        }


    }

    const ChangeCardlUrl = (e) => {
        e.preventDefault();
        const url = e.target.value;

        if (!url.includes("drive.google.com")) {
            setCard({ ...Card, MainImage: url })
        }
        else {
            const match = url.match(/\/d\/(.*?)\//);

            const fileId = match ? match[1] : null;

            const viewableUrl = fileId ? `https://drive.google.com/uc?id=${fileId}` : null;

            setCard({ ...Card, MainImage: viewableUrl });
        }
    }

    return (
        <div className='Gallery'>
            <div className='CarouselDiv'>
                <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel" data-bs-interval="1000">
                    <div className="carousel-inner">
                        {AllCarouselImage && AllCarouselImage.length > 0 &&
 AllCarouselImage.map((Element, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={Element._id}>
                <img src={Element.Image} className="d-block" alt="..." />
                {IsLoggedIn && (
                    <div style={{ marginTop: '10px' }}>
                        <button className='btn btn-danger' onClick={() => DeleteCarouselImage(Element._id)}>
                            <i className="fa-solid fa-trash"></i> Delete
                        </button>
                    </div>
                )}
            </div>
        ))}
                    </div>
                    <button className="carousel-control-prev" style={{height: '500px'}} type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" style={{height: '500px'}} type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
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
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                    {
                        AllCard.slice().reverse().map((Element, idx) => {
                            return (
                                <div className="col" key={idx}>
                                    <div className="card" >
                                        <img src={Element.MainImage} alt='...' />
                                        <div className="card-body">
                                            <p className="card-text">{Element.Description}</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group">
                                                    <a href={Element.Link} target='_blank' rel="noreferrer" type="button" className="btn btn-sm btn-outline-primary" >View More...</a>
                                                    {
                                                        IsLoggedIn ? (
                                                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => DeleteCard(Element._id)}><i className="fa-solid fa-trash " />Delete</button>
                                                        ) :
                                                            null
                                                    }
                                                    <a type="button" href={Element.YoutubeLink} target='_blank' rel="noreferrer" className="btn btn-sm btn-outline-danger ms-1 rounded-circle d-flex align-items-center"><i className="fa-brands fa-youtube " /></a>
                                                </div>
                                                <small className="text-body-secondary">VTS</small>
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
                                <input value={Card.MainImage} onChange={ChangeCardlUrl} type='url'></input>
                                <label>Card Description:</label>
                                <input value={Card.Description} onChange={(e) => setCard({ ...Card, Description: e.target.value })} type='text'></input>
                                <label>Google Drive Link:</label>
                               <input value={Card.Link} onChange={(e) => setCard({...Card, Link: e.target.value})} type='url'></input>

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
                                <input value={CarouselImage.Image} onChange={ChangeCarouselUrl} type='url'></input>
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
            {/* <div className="modal fade" id="ViewMoreModal" tabIndex="-1" aria-labelledby="ViewMoreModalLabel" aria-hidden="true">
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
            </div> */}
        </div>
    )
}
