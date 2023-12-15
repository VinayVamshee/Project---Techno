import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as XLSX from 'xlsx';


export default function StudentsInfo() {

    // const PreDefinedData = [
    //     {
    //         FirstName: 'Vinay',
    //         LastName: 'Vamshee',
    //         Class: '12',
    //         PhoneNumber: '1234567890'
    //     },
    //     {
    //         FirstName: 'Vijay',
    //         LastName: 'Vinayak',
    //         Class: '6',
    //         PhoneNumber: '1234567890'
    //     },
    //     {
    //         FirstName: 'Harisha',
    //         LastName: 'Pitra',
    //         Class: '10',
    //         PhoneNumber: '1234567890'
    //     },
    //     {
    //         FirstName: 'Vinay',
    //         LastName: 'Vamshee',
    //         Class: '12',
    //         PhoneNumber: '1234567890'
    //     },
    //     {
    //         FirstName: 'Vinay',
    //         LastName: 'Vamshee',
    //         Class: '12',
    //         PhoneNumber: '1234567890'
    //     }
    // ];

    const [Search, setSearch] = useState('');
    const Keys = ["FirstName", "LastName", "Class", "PhoneNumber"];


    const [StudentData, setStudentData] = useState({
        FirstName: ' ',
        LastName: ' ',
        Class: ' ',
        PhoneNumber: ' '
    });

    const SendStudentData = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://project-techno.vercel.app/StudentInfo", { ...StudentData })
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

    const [AllStudentInfo, setAllStudentInfo] = useState([]);

    useEffect(() => {
        axios.get('https://project-techno.vercel.app/GetStudentInfo')
            .then(result => setAllStudentInfo(result.data))
            .catch(error => console.log(error))
    }, [])

    const DeleteStudentInfo = async (id) => {
        axios.delete('https://project-techno.vercel.app/DeleteStudent/' + id)
            .then(result => {
                console.log(result)
                window.location.reload();
            })
            .catch(error => console.log(error))
    }

    const [EditStudentData, setEditStudentData] = useState({
        FirstName: ' ',
        LastName: ' ',
        Class: ' ',
        PhoneNumber: ' '
    });

    const GetStudentInfo = async (id) => {
        axios.get('https://project-techno.vercel.app/GetStudentInfo/' + id)
            .then(result => setEditStudentData(result.data))
            .catch(error => console.log(error))
    }

    const EditStudentInfo = async (id,e) => {
        e.preventDefault();
        try {
            axios.put("https://project-techno.vercel.app/EditStudentInfo/" + id, { ...EditStudentData })
               .then(result => {
                console.log(result)
                alert('Edited')
                window.location.reload();
            })
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error);
        }
    }

    const DownloadStudentInfo = () => {

        var WorkBook = XLSX.utils.book_new(),
            WorkSheet = XLSX.utils.json_to_sheet(AllStudentInfo);

        XLSX.utils.book_append_sheet(WorkBook, WorkSheet, "StudentSheet");

        XLSX.writeFile(WorkBook, "StudentInfo.xlsx")
    }

    return (
        <div className='Info'>

            <div className='Actions'>
                <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#AddStudentModal">
                    Add New Student
                </button>
                <form>
                    <input type='text' onChange={(e) => setSearch(e.target.value)} placeholder='Search...' />
                    {/* <button type='submit' className='btn btn-secondary' >Search</button> */}
                </form>
                /
                <button className='btn btn-secondary disabled'>Sort By</button>
                <div className='Excel'>
                    <button className='btn btn-success' type="button" data-bs-toggle="modal" data-bs-target="#ExcelFileUploadModal">Import Excel<i className="fa-solid fa-upload" /></button>
                    <button className='btn btn-success' onClick={DownloadStudentInfo}>Export Excel<i className="fa-solid fa-download" /></button>
                </div>

            </div>

            <div className='Data'>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Class</th>
                            <th>Phone Number</th>
                            <th>Report</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            AllStudentInfo.filter((student) =>
                                Keys.some((key) =>
                                    String(student[key]).toLowerCase().includes(Search.toLowerCase())
                                )
                            ).map((Element, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{Element.FirstName}</td>
                                        <td>{Element.LastName}</td>
                                        <td>{Element.Class}</td>
                                        <td>{Element.PhoneNumber}</td>
                                        <td><button className='btn btn-success'>Report<i className="fa-solid fa-id-card" /></button></td>
                                        <td style={{ display: 'flex', justifyContent: 'space-around'}}>
                                            <button className='btn btn-primary' onClick={() => GetStudentInfo(Element._id)} type="button" data-bs-toggle="modal" data-bs-target="#UpdateModalModal">Edit<i className="fa-regular fa-pen-to-square" /></button>
                                            <button className='btn btn-danger' onClick={() => DeleteStudentInfo(Element._id)}>Delete<i className="fa-solid fa-trash" /></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        {/* {
                            PreDefinedData.map((Element, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{Element.FirstName}</td>
                                        <td>{Element.LastName}</td>
                                        <td>{Element.Class}</td>
                                        <td>{Element.PhoneNumber}</td>
                                        <td><button className='btn btn-success'>Report<i className="fa-solid fa-id-card ms-2" /></button></td>
                                        <td style={{ display: 'flex', justifyContent: 'space-around', width: '180px', padding: '5px' }}>
                                            <button className='btn btn-primary'>Edit<i className="fa-regular fa-pen-to-square ms-2" /></button>
                                            <button className='btn btn-danger'>Delete<i className="fa-solid fa-trash ms-2" /></button>
                                        </td>
                                    </tr>
                                )
                            })
                        } */}
                    </tbody>
                </table>
            </div>























            {/* Add Student Modal */}
            <div className="modal fade" id="AddStudentModal" tabIndex="-1" aria-labelledby="AddStudentModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={SendStudentData}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="AddStudentModalLabel">Add New Student</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body AddModal">
                                <label>First Name:</label>
                                <input type='text' value={StudentData.FirstName} onChange={(event) => setStudentData({ ...StudentData, FirstName: event.target.value })} />
                                <label>Last Name:</label>
                                <input type='text' value={StudentData.LastName} onChange={(event) => setStudentData({ ...StudentData, LastName: event.target.value })} />
                                <label>Class:</label>
                                <input type='number' value={StudentData.Class} onChange={(event) => setStudentData({ ...StudentData, Class: event.target.value })} />
                                <label>Phone Number:</label>
                                <input type='number' value={StudentData.PhoneNumber} onChange={(event) => setStudentData({ ...StudentData, PhoneNumber: event.target.value })} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type='submit' className="btn btn-primary">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* ExcelFileUpload */}
            <div className="modal fade" id="ExcelFileUploadModal" tabIndex="-1" aria-labelledby="ExcelFileUploadModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="ExcelFileUploadModalLabel">Import Excel File</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <label>Insert Excel File</label>
                                <input type='file' />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary disabled">Import</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="UpdateModalModal" tabIndex="-1" aria-labelledby="UpdateModalModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={(e) => EditStudentInfo(EditStudentData._id,e)}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="UpdateModalModalLabel">Edit Student Info</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body AddModal">
                                <label>First Name:</label>
                                <input type='text' value={EditStudentData.FirstName} onChange={(event) => setEditStudentData({ ...EditStudentData, FirstName: event.target.value })} />
                                <label>Last Name:</label>
                                <input type='text' value={EditStudentData.LastName} onChange={(event) => setEditStudentData({ ...EditStudentData, LastName: event.target.value })} />
                                <label>Class:</label>
                                <input type='text' value={EditStudentData.Class} onChange={(event) => setEditStudentData({ ...EditStudentData, Class: event.target.value })} />
                                <label>Phone Number:</label>
                                <input type='number' value={EditStudentData.PhoneNumber} onChange={(event) => setEditStudentData({ ...EditStudentData, PhoneNumber: event.target.value })} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
