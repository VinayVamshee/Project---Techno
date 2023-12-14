import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Logo from './Images/Picture 1.jpeg'
// import Image1 from './Images/CarouselImage1.png'
// import Image2 from './Images/CarouselImage2.png'
// import Image3 from './Images/CarouselImage3.png'

export default function Home() {

    const [AllCarouselImage, setAllCarouselImage] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/GetCarouselImage')
            .then(result => setAllCarouselImage(result.data))
            .catch(error => console.log(error))
    }, [])

    return (
        <div className='Home'>
            <div className='Intro'>
                <div>
                    <img src={Logo} alt='...' />
                </div>

                <h1>Vamshee Techno School</h1>
                <p style={{ fontWeight: 'bold', fontSize: '20px', fontFamily: 'Times New Roman', color: 'red' }}>Pre-Nursery, Nursery, KG-I, KG-II&Primary English Medium School<br />
                    Daya Vihar, Ganesh Nagar, Bilaspur (C.G.) - 495 004<br />
                    Recognised by C.G. Board of Secondary Education, Raipur (C.G.)<br />
                    Contact EM : 8982397404, Email : technoschoolbsp@gmail.com</p>

                <p>Greetings and a warm welcome to a world of quality education. This Website is intended to serve as a medium of communication between you and the school.</p>

                <h3 className='my-3'>“Keep Going, Keep Growing”</h3>
                <p>The above motto itself indicates that the school's sole objective is to assist its students in unfolding their hidden talents and supporting them to keep progressing and growing, ultimately achieving the zenith of success. This is accomplished through an innovative curriculum paired with a wide range of co-curricular activities, carefully designed to strike just the right chord for your child. Every student matters, and every moment counts.</p>
            </div>

            <div className='About'>
                <div className="row featurette">
                    <div className="col-md-7 order-md-2">
                        <h2 className="featurette-heading fw-normal lh-1 text-center mb-3">About</h2>
                        <p className="lead">Vamshee Techno School welcomes children to a vibrant learning environment where education is seamlessly woven with enjoyment and playfulness. Our school believes in making the learning journey an exciting adventure, fostering a love for knowledge through interactive and joyful activities. Here, children embark on a discovery of the world around them, engaging in playful exploration that stimulates their curiosity and creativity. With a commitment to providing an enriching and enjoyable educational experience, we strive to create a foundation for lifelong learning while ensuring that every moment is filled with laughter, exploration, and growth.</p>
                        <p className="lead">In the sensitive task of educating children, parents also have a responsible role to play. Triangular efforts will be beneficial for the complete development of the child. The student’s diary is a tool at your disposal, providing all the information you may wish to know. This will serve as the medium of communication with you about your ward. I kindly request you to spare a little time to read this diary and to place your signature.</p>
                    </div>
                    <div className="col-md-5 order-md-1 CarouselImage">
                        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
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
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
