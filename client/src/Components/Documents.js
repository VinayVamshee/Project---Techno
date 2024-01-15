import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Documents() {

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

    const [AllAcademicDropDown, setAllAcademicDropDown] = useState([]);

    useEffect(() => {
        axios.get('https://project-techno.vercel.app/GetAcademicDropDown')
            .then(result => setAllAcademicDropDown(result.data))
            .catch(error => console.log(error))
    }, [])

    const DeleteAcademicDropDown = async (id) => {
        axios.delete('https://project-techno.vercel.app/DeleteAcademicDropDown/' + id)
            .then(result => {
                console.log(result)
                window.location.reload();
            })
            .catch(error => console.log(error))
    }

    const [openCollapse, setOpenCollapse] = useState(null);
    
    const handleCollapseToggle = (collapseId) => {
        setOpenCollapse(openCollapse === collapseId ? null : collapseId);
      };
      

    return (
        <div className='Documents'>
            <div className="dropdown" id='academicdropdown'>
                <button className="btn  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa-solid fa-paperclip " />Academics
                </button>
                <ul className="dropdown-menu">
                    {
                        AllAcademicDropDown.map((Element, idx) => {
                            const collapseId = `collapseSearchSpecific${idx}`;
                            return (
                                <div key={idx}>
                                    <li >
                                        <button class="btn btn-documents" type="button" data-bs-toggle="collapse" data-bs-target={`#${collapseId}`}  aria-expanded={openCollapse === collapseId}  onClick={() => handleCollapseToggle(collapseId)} aria-controls={collapseId} data-bs-parent='academicdropdown'>
                                            {Element.Name}
                                        </button>
                                    {
                                        IsLoggedIn ? (
                                            <button className='btn btn-danger' onClick={() => DeleteAcademicDropDown(Element._id)}>Delete</button>
                                        ) :
                                            null
                                    }
                                    </li>
                                </div>
                            )
                        })
                    }
                </ul>
            </div>

{
    AllAcademicDropDown.map((Element,idx) => {
        const collapseId = `collapseSearchSpecific${idx}`;
        return (
            <div className={`collapse ${openCollapse === collapseId ? 'show' : ''}`} id={collapseId} key={idx}>
            <div class=" card-body">
                <iframe src={Element.Link.replace('/edit', '/preview')} title='DocumentsBody'/>
            </div>
        </div>
        )
    })
}
           
        </div>
    )
}
