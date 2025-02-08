import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from './Images/Picture 1.jpeg'
import axios from 'axios';


export default function NavigationMenu() {

    const navigate = useNavigate();

    function handleDocumentOpen(fileLink) {
        navigate(`/Documentation?file=${encodeURIComponent(fileLink)}`);
    }


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const AddAdmin = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://project-techno.vercel.app/Register', { username, password })
                .then(result => console.log(result))
                .catch(error => console.log(error))
            alert('User Registration Successful')
        } catch (error) {
            console.log(error);
        }
    }

    const CheckAdmin = async (e) => {
        e.preventDefault();
        axios.post('https://project-techno.vercel.app/Login', { username, password })
            .then(result => {
                if (result.data.token) {
                    localStorage.setItem('token', result.data.token)
                    alert('Login Successful')
                    window.location.reload();
                }
                else if (result.data === 'Please Check the Password') {
                    alert('Incorrect Password')
                }
                else {
                    alert('Error')
                }
            })
            .catch(error => console.log(error))
    }

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

    const Logout = () => {
        const AskUser = window.confirm("Are you sure?")

        if (AskUser) {
            localStorage.removeItem('token');
            window.location.reload();
        }
    }

    const [Notice, setNotice] = useState({
        Link: ''
    })

    const [AcademicsDropdown, setAcademicsDropdown] = useState({
        Name: '',
        Link: ''
    })

    const [AdmissionsDropdown, setAdmissionsDropdown] = useState({
        Name: '',
        Link: ''
    })

    const [GalleryDropDown, setGalleryDropDown] = useState({
        Name: '',
        Link: ''
    })

    const [DownloadDropDown, setDownloadDropDown] = useState({
        Name: '',
        Link: ''
    })

    const AddNewNotice = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://project-techno.vercel.app/AddNewNotice', { ...Notice })
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

    const AddNewAcademicsDropDown = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://project-techno.vercel.app/AddNewAcademicDropDown', { ...AcademicsDropdown })
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

    const AddNewAdmissionDropDown = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://project-techno.vercel.app/AddNewAdmissionDropDown', { ...AdmissionsDropdown })
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

    const AddNewGalleryDropDown = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://project-techno.vercel.app/AddNewGalleryDropDown', { ...GalleryDropDown })
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

    const AddNewDownloadDropDown = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://project-techno.vercel.app/AddNewDownloadDropDown', { ...DownloadDropDown })
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

    const [AllNotice, setAllNotice] = useState([]);
    const [AllAcademicDropDown, setAllAcademicDropDown] = useState([]);
    const [AllAdmissionDropDown, setAllAdmissionDropDown] = useState([]);
    const [AllGalleryDropDown, setAllGalleryDropDown] = useState([]);
    const [AllDownloadDropDown, setAllDownloadDropDown] = useState([]);

    useEffect(() => {
        axios.get('https://project-techno.vercel.app/GetNotice')
            .then(result => setAllNotice(result.data))
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        axios.get('https://project-techno.vercel.app/GetAcademicDropDown')
            .then(result => setAllAcademicDropDown(result.data))
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        axios.get('https://project-techno.vercel.app/GetAdmissionDropDown')
            .then(result => setAllAdmissionDropDown(result.data))
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        axios.get('https://project-techno.vercel.app/GetGalleryDropDown')
            .then(result => setAllGalleryDropDown(result.data))
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        axios.get('https://project-techno.vercel.app/GetDownloadDropDown')
            .then(result => setAllDownloadDropDown(result.data))
            .catch(error => console.log(error))
    }, [])

    const DeleteNotice = async (id) => {
        axios.delete('https://project-techno.vercel.app/DeleteNotice/' + id)
            .then(result => {
                console.log(result)
                window.location.reload();
            })
            .catch(error => console.log(error))
    }
    const DeleteAcademicDropDown = async (id) => {
        axios.delete('https://project-techno.vercel.app/DeleteAcademicDropDown/' + id)
            .then(result => {
                console.log(result)
                window.location.reload();
            })
            .catch(error => console.log(error))
    }
    const DeleteAdmissionDropDown = async (id) => {
        axios.delete('https://project-techno.vercel.app/DeleteAdmissionDropDown/' + id)
            .then(result => {
                console.log(result)
                window.location.reload();
            })
            .catch(error => console.log(error))
    }

    const DeleteGalleryDropDown = async (id) => {
        axios.delete('https://project-techno.vercel.app/DeleteGalleryDropDown/' + id)
            .then(result => {
                console.log(result)
                window.location.reload();
            })
            .catch(error => console.log(error))
    }

    const DeleteDownloadDropDown = async (id) => {
        axios.delete('https://project-techno.vercel.app/DeleteDownloadDropDown/' + id)
            .then(result => {
                console.log(result)
                window.location.reload();
            })
            .catch(error => console.log(error))
    }

    function getPreviewLink(originalLink) {
        const match = originalLink.match(/(?:\/d\/|id=)([\w-]+)/);
        if (match) {
            const fileId = match[1];

            if (originalLink.includes('docs.google.com/document')) {
                return `https://docs.google.com/document/d/${fileId}/export?format=pdf`;
            } else if (originalLink.includes('docs.google.com/spreadsheets')) {
                return `https://docs.google.com/spreadsheets/d/${fileId}/export?format=pdf`;
            } else if (originalLink.includes('docs.google.com/presentation')) {
                return `https://docs.google.com/presentation/d/${fileId}/export/pdf`;
            } else {
                return `https://drive.google.com/uc?export=download&id=${fileId}`;
            }
        }
        return originalLink;
    }

    const ChangeAcademicsLink = (e) => {
        const OriginalLink = e.target.value;
        const PreviewLink = getPreviewLink(OriginalLink);
        setAcademicsDropdown({ ...AcademicsDropdown, Link: PreviewLink });
    }

    // const ChangeAdmissionUrl = (e) => {
    //     e.preventDefault();

    //     const url = e.target.value;

    //     const match = url.match(/\/document\/d\/(.*?)(\/|$)/);

    //     const fileId = match ? match[1] : null;

    //     const viewableUrl = fileId ? `https://docs.google.com/document/d/${fileId}/preview` : null;

    //     setAdmissionsDropdown({...AdmissionsDropdown,Link: viewableUrl});
    // }

    const [newImageUrl, setNewImageUrl] = useState('');


    const uploadBackgroundImage = (e) => {
        e.preventDefault();

        axios.post('https://project-techno.vercel.app/postBackgroundImage', { imageUrl: newImageUrl })
            .then(response => {
                console.log(response);
                setNewImageUrl('');
                alert('Background image updated!');
                window.location.reload();
            })
            .catch(error => console.error('Error updating background image:', error));
    };


    return (
        <>
            <div className='NavigatioinMenu'>
                <div className='Logo'>
                    {
                        IsLoggedIn ? (
                            null
                        ) :
                            <Link className='logo-title' to='/'>
                                <img src={Logo} alt='...' /><h3> Vamshee Techno School </h3><h4>VTS</h4>
                            </Link>

                    }

                </div>
                <div className='NavButtons'>
                    <Link to='/' className='btn '>Home</Link>
                    {/* <Link to='/Documents' className='btn'><i className="fa-solid fa-paperclip " />Academics</Link> */}

                    <div className="dropdown">
                        <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-paperclip " />Academics
                        </button>
                        <ul className="dropdown-menu">
                            {AllAcademicDropDown.map((Element, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: '2px', padding: '2px', justifyContent: 'space-between' }}>
                                    <li><button className='dropdown-item' onClick={() => handleDocumentOpen(Element.Link)} >{Element.Name}</button></li>
                                    {
                                        IsLoggedIn && (
                                            <button className='btn btn-danger' onClick={() => DeleteAcademicDropDown(Element._id)}>Delete</button>
                                        )
                                    }
                                </div>
                            ))}
                        </ul>
                    </div>

                    <div className="dropdown">
                        <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-paperclip " />Admissions
                        </button>
                        <ul className="dropdown-menu">
                            {AllAdmissionDropDown.map((Element, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: '2px', padding: '2px', justifyContent: 'space-between' }}>
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => handleDocumentOpen(Element.Link)} // Directly using the stored PDF link
                                        >
                                            {Element.Name}
                                        </button>
                                    </li>
                                    {IsLoggedIn && (
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => DeleteAdmissionDropDown(Element._id)}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            ))}
                        </ul>
                    </div>

                    <button type="button" className='NewNoticebtn btn ' data-bs-toggle="modal" data-bs-target="#NoticeModal"> <span><i className="fa-solid fa-newspaper" />Notice</span>  </button>
                    <Link to='/Gallery' className='btn '><i className="fa-regular fa-images" />Gallery</Link>
                    <button type="button" className='btn ' data-bs-toggle="modal" data-bs-target="#CalendarModal"><i className="fa-solid fa-calendar-days " />Calendar</button>
                    {
                        IsLoggedIn ? (
                            <>
                                {/* <Link to='/StudentsInfo' className='btn btn-warning'>Student's Info</Link>
                                <Link to='/TeacherInfo' className='btn btn-warning'>Teacher's Info</Link> */}
                                <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#AddDropDownModal">Dropdown</button>
                            </>
                        ) :
                            null
                    }
                    <div className="dropdown">
                        <button className="btn  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-paperclip " />Media
                        </button>
                        <ul className="dropdown-menu">
                            {
                                AllGalleryDropDown.map((Element, idx) => {
                                    return (
                                        <div key={idx} style={{ display: 'flex', gap: '2px', padding: '2px', justifyContent: 'space-between' }}>
                                            <li ><a className="dropdown-item" href={Element.Link} download target='_blank' rel="noreferrer">{Element.Name}</a></li>
                                            {
                                                IsLoggedIn ? (
                                                    <button className='btn btn-danger' onClick={() => DeleteGalleryDropDown(Element._id)}>Delete</button>
                                                ) :
                                                    null
                                            }
                                        </div>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="dropdown">
                        {/* <button className="btn  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-download" />Downloads
                        </button> */}
                        <ul className="dropdown-menu">
                            {
                                AllDownloadDropDown.map((Element, idx) => {
                                    return (
                                        <div key={idx} style={{ display: 'flex', gap: '2px', padding: '2px', justifyContent: 'space-between' }}>
                                            <li ><a className="dropdown-item" href={Element.Link.replace("/edit", "/export?format=pdf")} download>{Element.Name}</a></li>
                                            {
                                                IsLoggedIn ? (
                                                    <button className='btn btn-danger' onClick={() => DeleteDownloadDropDown(Element._id)}>Delete</button>
                                                ) :
                                                    null
                                            }
                                        </div>
                                    )
                                })
                            }
                        </ul>
                    </div>


                    {/* <button className='btn  disabled'><i className="fa-solid fa-handshake-angle " />Help</button> */}
                </div>

                <div className='Authenticate'>
                    {
                        IsLoggedIn ? (
                            <>
                                <button className='btn btn-success mx-3' type="button" data-bs-toggle="modal" data-bs-target="#RegisterModal">Add New Admin</button>
                                <button className='btn btn-danger' onClick={Logout}>Logout<i className="fa-solid fa-right-from-bracket" /></button>
                            </>
                        ) :
                            <button type="button" className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#LoginModal"><i className="fa-solid fa-right-to-bracket " />Login</button>
                    }
                </div>



            </div>

            <div className='Menu'>

                <button className="btn menutab" type="button" data-bs-toggle="collapse" data-bs-target="#MenuCollapse" aria-expanded="false" aria-controls="MenuCollapse">
                    <i className="fa-solid fa-bars text-light" /> <p className='mt-3'>Vamshee Techno School</p>
                </button>

                <div className="collapse" id="MenuCollapse">
                    <div className="card card-body">
                        <div className='NavButtons'>
                            <Link to='/' className='btn '>Home</Link>
                            <div className="dropdown">
                                <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa-solid fa-paperclip " />Academics
                                </button>
                                <ul className="dropdown-menu">
                                    {AllAcademicDropDown.map((Element, idx) => (
                                        <div key={idx} style={{ display: 'flex', gap: '2px', padding: '2px', justifyContent: 'space-between' }}>
                                            <li><button className='dropdown-item' onClick={() => handleDocumentOpen(Element.Link)} >{Element.Name}</button></li>
                                            {
                                                IsLoggedIn && (
                                                    <button className='btn btn-danger' onClick={() => DeleteAcademicDropDown(Element._id)}>Delete</button>
                                                )
                                            }
                                        </div>
                                    ))}
                                </ul>
                            </div>

                            <div className="dropdown">
                                <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa-solid fa-paperclip " />Admissions
                                </button>
                                <ul className="dropdown-menu">
                                    {AllAdmissionDropDown.map((Element, idx) => (
                                        <div key={idx} style={{ display: 'flex', gap: '2px', padding: '2px', justifyContent: 'space-between' }}>
                                            <li>
                                                <button
                                                    className="dropdown-item"
                                                    onClick={() => handleDocumentOpen(Element.Link)} // Directly using the stored PDF link
                                                >
                                                    {Element.Name}
                                                </button>
                                            </li>
                                            {IsLoggedIn && (
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => DeleteAdmissionDropDown(Element._id)}
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </ul>

                            </div>
                            <button type="button" className='NewNoticebtn btn ' data-bs-toggle="modal" data-bs-target="#NoticeModal"> <span><i className="fa-solid fa-newspaper" />Notice</span>  </button>
                            <Link to='/Gallery' className='btn '><i className="fa-regular fa-images" />Gallery</Link>
                            <button type="button" className='btn ' data-bs-toggle="modal" data-bs-target="#CalendarModal"><i className="fa-solid fa-calendar-days " />Calendar</button>
                            {
                                IsLoggedIn ? (
                                    <>
                                        {/* <Link to='/StudentsInfo' className='btn btn-warning'>Student's Info</Link>
                                        <Link to='/TeacherInfo' className='btn btn-warning'>Teacher's Info</Link> */}
                                        <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#AddDropDownModal">Dropdown</button>
                                    </>
                                ) :
                                    null
                            }
                            <div className="dropend">
                                <button className="btn  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa-solid fa-paperclip " />Media
                                </button>
                                <ul className="dropdown-menu">
                                    {
                                        AllGalleryDropDown.map((Element, idx) => {
                                            return (
                                                <div key={idx} style={{ display: 'flex', gap: '2px', padding: '2px', justifyContent: 'space-between' }}>
                                                    <li ><a className="dropdown-item" href={Element.Link} download target='_blank' rel="noreferrer">{Element.Name}</a></li>
                                                    {
                                                        IsLoggedIn ? (
                                                            <button className='btn btn-danger' onClick={() => DeleteGalleryDropDown(Element._id)}>Delete</button>
                                                        ) :
                                                            null
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </ul>
                            </div>

                            <div className="dropdown">
                                {/* <button className="btn  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa-solid fa-download" />Downloads
                                </button> */}
                                <ul className="dropdown-menu">
                                    {
                                        AllDownloadDropDown.map((Element, idx) => {
                                            return (
                                                <div key={idx} style={{ display: 'flex', gap: '2px', padding: '2px', justifyContent: 'space-between' }}>
                                                    <li ><a className="dropdown-item" href={Element.Link.replace("/edit", "/export?format=pdf")} download>{Element.Name}</a></li>
                                                    {
                                                        IsLoggedIn ? (
                                                            <button className='btn btn-danger' onClick={() => DeleteDownloadDropDown(Element._id)}>Delete</button>
                                                        ) :
                                                            null
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </ul>
                            </div>


                            {/* <button className='btn  disabled'><i className="fa-solid fa-handshake-angle " />Help</button> */}

                            {
                                IsLoggedIn ? (
                                    <>
                                        <button className='btn btn-success' type="button" data-bs-toggle="modal" data-bs-target="#RegisterModal">Add New Admin</button>
                                        <button className='btn btn-danger' onClick={Logout}>Logout<i className="fa-solid fa-right-from-bracket" /></button>
                                    </>
                                ) :
                                    // <button type="button" className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#LoginModal"><i className="fa-solid fa-right-to-bracket " />Login</button>
                                    null
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* LoginModal */}
            <div className="modal fade" id="LoginModal" tabIndex="-1" aria-labelledby="LoginModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content rounded-4 shadow">
                        <div className="modal-header p-5 pb-4 border-bottom-0">
                            <h1 className="fw-bold mb-0 fs-2">Login</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body p-5 pt-0">
                            <form id='LoginForm' onSubmit={CheckAdmin}>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control rounded-3" id="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="" data-temp-mail-org="0" />
                                    <label>Username</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control rounded-3" id="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
                                    <label>Password</label>
                                </div>
                                <button className="w-25 mb-2 btn btn-primary" type="submit">Log In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            {/* RegisterModal */}
            <div className="modal fade" id="RegisterModal" tabIndex="-1" aria-labelledby="RegisterModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content rounded-4 shadow">
                        <div className="modal-header p-5 pb-4 border-bottom-0">
                            <h1 className="fw-bold mb-0 fs-2" style={{ fontFamily: '' }}>Register New Admin</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body p-5 pt-0">
                            <form id='RegisterForm' onSubmit={AddAdmin}>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control rounded-3" id="Registerusername" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="" data-temp-mail-org="0" />
                                    <label>Username</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control rounded-3" id="Registerpassword" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="" />
                                    <label>Password</label>
                                </div>
                                <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" data-bs-dismiss="modal" type="submit">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* CalendarModal */}
            <div className="modal fade" style={{ marginTop: '0px' }} id="CalendarModal" tabIndex="-1" aria-labelledby="CalendarModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl ">
                    <div className="modal-content bg-secondary text-light calendar">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="CalendarModalLabel">School-Calendar <span className='ms-5'>Vamshee Techno School </span></h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <iframe title='NationalHolidays' src="https://calendar.google.com/calendar/embed?src=en.indian%23holiday%40group.v.calendar.google.com&ctz=UTC"></iframe>
                            <iframe title='technoschool' src="https://calendar.google.com/calendar/embed?src=technoschoolbsp%40gmail.com&ctz=UTC"></iframe>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* NoticeModal */}
            <div className="modal fade" id="NoticeModal" tabIndex="-1" aria-labelledby="NoticeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="NoticeModalLabel">Notice</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body Notice">
                            <div className='NoticeBoard'>
                                {
                                    AllNotice.map((Element, idx) => {
                                        return (
                                            <div key={idx} className='SingleNotice'>
                                                <iframe title="PDF Viewer" src={Element.Link.replace('/edit', '/preview')} />
                                                {
                                                    IsLoggedIn ? (
                                                        <div>
                                                            <button className='btn btn-danger' onClick={() => DeleteNotice(Element._id)}>delete</button>
                                                        </div>
                                                    ) :
                                                        null
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {
                                IsLoggedIn ? (
                                    <form onSubmit={AddNewNotice}>
                                        <div className='AddModal'>
                                            <label>New Link :</label>
                                            <input type='text' value={Notice.Link} onChange={(e) => setNotice({ ...Notice, Link: e.target.value })} />
                                            <button type='submit' className='btn btn-warning my-2 w-25'>Add</button>
                                        </div>
                                    </form>
                                ) :
                                    null
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dropdown */}
            <div className="modal fade" id="AddDropDownModal" tabIndex="-1" aria-labelledby="AddDropDownModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="AddDropDownModalLabel">Add a New Dropdown</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h3>Academics</h3>
                            <form className='AddModal' onSubmit={AddNewAcademicsDropDown}>
                                <label>Name:</label>
                                <input type='text' value={AcademicsDropdown.Name} onChange={(e) => setAcademicsDropdown({ ...AcademicsDropdown, Name: e.target.value })} />
                                <label>Link:</label>
                                <input type='url' value={AcademicsDropdown.Link} onChange={ChangeAcademicsLink} />
                                <button type='submit' className='btn btn-warning w-25 mt-1'>Add</button>
                            </form>
                            <h3>Admission</h3>
                            <form className='AddModal' onSubmit={AddNewAdmissionDropDown}>
                                <label>Name:</label>
                                <input type='text' value={AdmissionsDropdown.Name} onChange={(e) => setAdmissionsDropdown({ ...AdmissionsDropdown, Name: e.target.value })} />
                                <label>Link:</label>
                                <input type='url' value={AdmissionsDropdown.Link}
                                    onChange={(e) => {
                                        const inputLink = e.target.value;
                                        let convertedLink = inputLink;
                                        const match = inputLink.match(/docs\.google\.com\/document\/d\/([^/]+)/);
                                        if (match) {
                                            convertedLink = `https://docs.google.com/document/d/${match[1]}/export?format=pdf`;
                                        }
                                        setAdmissionsDropdown({ ...AdmissionsDropdown, Link: convertedLink });
                                    }} />
                                <button type='submit' className='btn btn-warning w-25 mt-1'>Add</button>
                            </form>
                            <h3>Gallery Links</h3>
                            <form className='AddModal' onSubmit={AddNewGalleryDropDown}>
                                <label>Name:</label>
                                <input type='text' value={GalleryDropDown.Name} onChange={(e) => setGalleryDropDown({ ...GalleryDropDown, Name: e.target.value })} />
                                <label>Link:</label>
                                <input type='url' value={GalleryDropDown.Link} onChange={(e) => setGalleryDropDown({ ...GalleryDropDown, Link: e.target.value })} />
                                <button type='submit' className='btn btn-warning w-25 mt-1'>Add</button>
                            </form>
                            <h3>Background Image</h3>
                            <form className='AddModal' onSubmit={uploadBackgroundImage}>
                                <input type='url' placeholder="Enter image URL" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} />
                                <button type='submit' className='btn btn-warning w-25 mt-1'>Save</button>
                            </form>
                            <h3>Downloads</h3>
                            <form className='AddModal' onSubmit={AddNewDownloadDropDown}>
                                <label>Name:</label>
                                <input type='text' value={DownloadDropDown.Name} onChange={(e) => setDownloadDropDown({ ...DownloadDropDown, Name: e.target.value })} />
                                <label>Link:</label>
                                <input type='url' value={DownloadDropDown.Link} onChange={(e) => setDownloadDropDown({ ...DownloadDropDown, Link: e.target.value })} />
                                <button type='submit' className='btn btn-warning w-25 mt-1'>Add</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
