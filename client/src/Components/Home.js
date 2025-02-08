import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Logo from './Images/Bada school logo.png'
// import Image1 from './Images/CarouselImage1.png'
// import Image2 from './Images/CarouselImage2.png'
// import Image3 from './Images/CarouselImage3.png'

export default function Home() {

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

    // const [AllCarouselImage, setAllCarouselImage] = useState([]);

    // useEffect(() => {
    //     axios.get('https://project-techno.vercel.app/GetCarouselImage')
    //         .then(result => setAllCarouselImage(result.data))
    //         .catch(error => console.log(error))
    // }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("scaleUp");
                    } else {
                        entry.target.classList.remove("scaleUp"); // Remove for re-animation on scroll
                    }
                });
            },
            { threshold: 0.5 } // Adjusts when animation triggers
        );

        const elements = document.querySelectorAll(".Intro h1, .tagline, .tagline-description h3, .tagline-description p");
        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, []);



    const [homeImages, setHomeImages] = useState([]);

    useEffect(() => {
        axios.get('https://project-techno.vercel.app/getHomeImages')
            .then(response => setHomeImages(response.data.data))
            .catch(error => console.error('Error fetching home images:', error));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`https://project-techno.vercel.app/deleteHomeImage/${id}`)
            .then(response => {
                alert(response.data.message);
                setHomeImages(homeImages.filter(image => image._id !== id)); // Remove from UI
            })
            .catch(error => console.error('Error deleting image:', error));
    };

    const [imageLink, setImageLink] = useState('');
    const [description, setDescription] = useState('');

    const handleUpload = () => {
        axios.post('https://project-techno.vercel.app/postHomeImage', { imageLink, description })
            .then(response => {
                alert(response.data.message);
            })
            .catch(error => console.error('Error uploading home image:', error));
    };


    return (
        <div className='Home'>

            <div className='Intro'>
                <div>
                    <img src={Logo} alt='...' />
                </div>

                <h1>Vamshee Techno School</h1>
                {/* <p style={{ fontWeight: 'bold', fontSize: '20px', fontFamily: 'Times New Roman', color: 'red' }}>Pre-Nursery, Nursery, KG-I, KG-II&Primary English Medium School<br />
                    Daya Vihar, Ganesh Nagar, Bilaspur (C.G.) - 495 004<br />
                    Recognised by C.G. Board of Secondary Education, Raipur (C.G.)<br />
                    Contact EM : 8982397404, Email : technoschoolbsp@gmail.com</p> */}

                <p className='tagline'>Greetings and a warm welcome to a world of quality education!</p>
            </div>

            <div className='tagline-description'>
                <h3>“Keep Going, Keep Growing”</h3>
                <p>More than just a motto, it defines our commitment to fostering growth, unlocking potential, and guiding students toward success. Through a well-rounded curriculum and engaging co-curricular activities, we create an environment where learning is dynamic and development is continuous.
                    <br />At Vamshee Techno School, every student matters, and every step forward counts.
                </p>
            </div>
            {
                IsLoggedIn ?
                    <button type="button" className="btn btn-warning my-2" data-bs-toggle="modal" data-bs-target="#AddImageTextModal">
                        Add Image & Context
                    </button>
                    :
                    null
            }


            {
                homeImages.length > 0 && homeImages.slice().reverse().map((Element, idx) => {
                    return (
                        <div className={`About ${idx % 2 === 0 ? 'column' : 'column-reverse'}`} key={idx}>
                            <div className="about-img">
                                <img src={Element.imageLink} alt='...' />
                            </div>
                            <div className="about-description">
                                <p>{Element.description}</p>
                            </div>
                            {
                                IsLoggedIn ?
                                    <button className='btn btn-danger' onClick={() => handleDelete(Element._id)}>Delete</button>
                                    :
                                    null
                            }
                        </div>
                    )
                })
            }


            {/* {
                AllCarouselImage.length > 0 && AllCarouselImage.map((Element, idx) => {
                    return (
                        <div className={`About ${idx % 2 === 0 ? 'column' : 'column-reverse'}`} key={idx}>
                            <div className="about-img">
                                <img src={Element.Image} alt='...' />
                            </div>
                            <div className="about-description">
                                <p>Vamshee Techno School welcomes children into a dynamic and nurturing environment where learning is an inspiring journey filled with curiosity, creativity, and joy. We believe that education should be both engaging and meaningful, seamlessly blending academics with interactive experiences that spark a lifelong love for knowledge. Through playful exploration and thoughtfully designed activities, we encourage young minds to discover, question, and grow.
                                    We recognize that education is a shared responsibility between the school, students, and parents. A strong partnership ensures the holistic development of every child.
                                </p>
                            </div>
                        </div>
                    )
                })
            } */}



            {/* <div className="col-md-5 order-md-1 CarouselImage">
                        <div id="carouselAddImageTextAutoplaying" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                {
                                    AllCarouselImage.length > 0 && (
                                        <div className="carousel-item active">
                                            <img src={AllCarouselImage[AllCarouselImage.length - 1].Image} className="d-block" alt="..." />
                                        </div>
                                    )
                                }
                                {
                                    AllCarouselImage.slice(0, -1).map((Element, idx) => {
                                        return (
                                            <div className="carousel-item" key={idx}>
                                                <img src={Element.Image} className="d-block" alt="..." />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselAddImageTextAutoplaying" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselAddImageTextAutoplaying" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div> */}





            <div className="modal fade" id="AddImageTextModal" tabIndex="-1" aria-labelledby="AddImageTextModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form className='text-dark' onSubmit={handleUpload}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="AddImageTextModalLabel">Add Image & Context</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body AddModal">
                                <lable>Image Url</lable>
                                <input type="text" placeholder="Image URL" value={imageLink} onChange={(e) => setImageLink(e.target.value)} />
                                <lable>Description</lable>
                                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}
