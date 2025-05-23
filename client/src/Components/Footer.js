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
  }, [])

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
      <footer>
        <div className="foot-naming">
          <span className="mb-md-0">© 2023 Techno School, Edu</span>
        </div>
        <ul className="nav">
          <li><Link to='/' className="btn"><i className="fa-solid fa-house " />Home</Link></li>
    <li><Link to='/Gallery' className="btn"><i class="fa-solid fa-image" />Gallery</Link></li>
          <li><button type="button" className="btn " data-bs-target="#ContactModalToggle" data-bs-toggle="modal"><i className="fa-solid fa-user " />Contact Us</button></li>
          <li><a className="btn footericon" href="https://www.youtube.com/channel/UCsQisHLHtKsIbPFQRpZUZew" target='_blank' rel="noreferrer"><i className="fa-brands fa-youtube " />Youtube</a></li>
          <li><a className="btn footericon" href="https://www.instagram.com/technoschool_bsp/" target='_blank' rel="noreferrer"><i className="fa-brands fa-instagram" />Instagram</a></li>
        </ul>
      </footer>






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
                      <label style={{ fontFamily: 'Times New Roman', fontSize: '17px', color: 'blue' }}><i className="fa-solid fa-envelope " />Email : <p style={{ fontFamily: 'sans-serif', color: 'black' }}>{Element.Email}</p></label>
                      <label style={{ fontFamily: 'Times New Roman', fontSize: '17px', color: 'blue' }}><i className="fa-solid fa-phone " />Phone Number : <p style={{ fontFamily: 'sans-serif', color: 'black' }}>{Element.PhoneNo}</p></label>
                      <label style={{ fontFamily: 'Times New Roman', fontSize: '17px', color: 'blue' }}><i className="fa-solid fa-location-dot " />School Address : <p style={{ fontFamily: 'sans-serif', color: 'black' }}>{Element.Location}</p></label>
                      <label style={{ fontFamily: 'Times New Roman', fontSize: '17px', color: 'blue' }}><i className="fa-solid fa-location-dot " />Location : <a href='https://maps.app.goo.gl/cstLpnvmpNTHA3c5A' target='_blank' rel="noreferrer" style={{ fontFamily: 'sans-serif', color: 'black' }}>Click here for Location</a></label>
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
