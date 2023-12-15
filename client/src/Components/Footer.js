import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Footer() {

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

  const [Contact, setContact] = useState({
    Email: '',
    PhoneNo: '',
    Location: ''
  })

  const SendContactDetails = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://project-techno.vercel.app/AddContactInfo", { ...Contact })
        .then(result => {
                    console.log(result)
                    alert('Added')
                    window.location.reload();
                })
        .catch(error => console.log(error))
    } catch (error) {
      console.log(error);
    }
  }

  const [AllContact, setAllContact] = useState([]);

  useEffect(() => {
    axios.get('https://project-techno.vercel.app/GetContactInfo')
      .then(result => setAllContact(result.data))
      .catch(error => console.log(error))
  },[])

  const DeleteContactInfo = async (id) => {
    axios.delete('https://project-techno.vercel.app/DeleteContactInfo/' + id)
      .then(result => {
        console.log(result)
        window.location.reload();
      })
      .catch(error => console.log(error))
  }

  return (
    <div className='Foot'>
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center">
          <div className="col-md-4 d-flex align-items-center">
            <span className="mb-md-0">© 2023 Techno School, Edu</span>
          </div>
          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3"><Link to='/' className="btn btn-primary"><i className="fa-solid fa-house " />Home</Link></li>
            <li className="ms-3"><button type="button" className="btn btn-info" data-bs-target="#ContactModalToggle" data-bs-toggle="modal"><i className="fa-solid fa-user " />Contact Us</button></li>
            <li className="ms-3"><a className="btn btn-danger" href="https://www.youtube.com/channel/UCsQisHLHtKsIbPFQRpZUZew" target='_blank' rel="noreferrer"><i className="fa-brands fa-youtube " />Youtube</a></li>
          </ul>
        </footer>
      </div>






      {/* ContactModal */}
      <div className="modal fade text-dark" id="ContactModalToggle" aria-hidden="true" aria-labelledby="ContactModalToggleLabel" tabIndex="-1">
        <div className="modal-dialog text-dark modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="ContactModalToggleLabel">Contact</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {
                AllContact.map((Element, idx) => {
                  return (
                    <div className='AddModal' key={idx}>
                      <label style={{ fontFamily: 'impact', fontSize: '17px' }}><i className="fa-solid fa-envelope " />Email : <p style={{ fontFamily: 'sans-serif' }}>{Element.Email}</p></label>
                      <label style={{ fontFamily: 'impact', fontSize: '17px' }}><i className="fa-solid fa-phone " />Phone Number : <p style={{ fontFamily: 'sans-serif' }}>{Element.PhoneNo}</p></label>
                      <label style={{ fontFamily: 'impact', fontSize: '17px' }}><i className="fa-solid fa-location-dot " />School Address : <p style={{ fontFamily: 'sans-serif' }}>{Element.Location}</p></label>
                      {
                        IsLoggedIn ? (
                          <div>
                            <button className='btn btn-danger' onClick={() => DeleteContactInfo(Element._id)}><i className="fa-solid fa-trash " />Delete</button>
                          </div>
                        ) :
                          null
                      }
                    </div>
                  )
                })
              }
            </div>
            <div className="modal-footer">
              {
                IsLoggedIn ? (
                  <>
                    <button className='btn btn-secondary' data-bs-dismiss='modal' aria-label="Close">Close</button>
                    <button className="btn btn-primary" data-bs-target="#ContactModalToggle2" data-bs-toggle="modal">Change Contact Details</button>
                  </>

                ) :
                  <button className='btn btn-secondary' data-bs-dismiss='modal' aria-label="Close">Close</button>
              }
            </div>
          </div>
        </div>
      </div>

      {/* AddContactDetails */}
      <div className="modal fade text-dark" id="ContactModalToggle2" aria-hidden="true" aria-labelledby="ContactModalToggleLabel2" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={SendContactDetails}>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="ContactModalToggleLabel2">Change Contact Details</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body AddModal">
                <label style={{ fontFamily: 'impact', fontSize: '17px' }}>Email: </label>
                <input type='text' value={Contact.Email} onChange={(e) => setContact({ ...Contact, Email: e.target.value })} />
                <label style={{ fontFamily: 'impact', fontSize: '17px' }}>Phone Number: </label>
                <input type='number' value={Contact.PhoneNo} onChange={(e) => setContact({ ...Contact, PhoneNo: e.target.value })} />
                <label style={{ fontFamily: 'impact', fontSize: '17px' }}> School Address</label>
                <input type='text' value={Contact.Location} onChange={(e) => setContact({ ...Contact, Location: e.target.value })} />
                {/* <label style={{ fontFamily: 'impact', fontSize: '17px' }}>Email:</label>
              <input type='text' value={Contact.Email} onChange={(e)=>setContact({...Contact, Email:e.target.value})}/> */}
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" data-bs-dismiss='modal' type='submit'>update</button>
              </div>
            </form>
          </div>
        </div>
      </div>


    </div>




  )
}
