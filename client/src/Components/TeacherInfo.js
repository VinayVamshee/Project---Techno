import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as XLSX from 'xlsx';

export default function TeacherInfo() {

    const [Search, setSearch] = useState('');
    const Keys = ["FirstName", "LastName", "ClassTeacherOf", "PhoneNumber"];


    const [TeacherData, setTeacherData] = useState({
        FirstName: ' ',
        LastName: ' ',
        ClassTeacherOf: ' ',
        PhoneNumber: ' '
    });

    const SendTeacherData = async (e) => {
        try {
            await axios.post("http://localhost:3001/TeacherInfo", { ...TeacherData })
                .then(result => console.log(result))
                .catch(error => console.log(error))
            alert('Added New Teacher')
        } catch (error) {
            console.log(error);
        }
    }

    const [AllTeacherInfo, setAllTeacherInfo] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/GetTeacherInfo')
            .then(result => setAllTeacherInfo(result.data))
            .catch(error => console.log(error))
    }, [])

    const DeleteTeacherInfo = async (id) => {
        axios.delete('http://localhost:3001/DeleteTeacher/' + id)
            .then(result => {
                console.log(result)
                window.location.reload();
            })
            .catch(error => console.log(error))
    }

    const [EditTeacherData, setEditTeacherData] = useState({
        FirstName: ' ',
        LastName: ' ',
        ClassTeacherOf: ' ',
        PhoneNumber: ' '
    });

    const GetTeacherInfo = async (id) => {
        axios.get('http://localhost:3001/GetTeacherInfo/' + id)
            .then(result => setEditTeacherData(result.data))
            .catch(error => console.log(error))
    }

    const EditTeacherInfo = async (id) => {
        try {
            axios.put("http://localhost:3001/EditTeacherInfo/" + id, { ...EditTeacherData })
                .then(result => console.log(result))
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error);
        }
    }

    const DownloadTeacherInfo = () => {

        var WorkBook = XLSX.utils.book_new(),
            WorkSheet = XLSX.utils.json_to_sheet(AllTeacherInfo);

        XLSX.utils.book_append_sheet(WorkBook, WorkSheet, "TeacherSheet");

        XLSX.writeFile(WorkBook, "TeacherInfo.xlsx")
    }

    return (
        <div className='Info'>

            <div className='Actions'>
                <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#AddTeacherModal">
                    Add New Teacher
                </button>
                <form>
                    <input type='text' onChange={(e) => setSearch(e.target.value)} placeholder='Search...' />
                    {/* <button type='submit' className='btn btn-secondary' >Search</button> */}
                </form>
                <div className='Excel'>
                    <button className='btn btn-success' type="button" data-bs-toggle="modal" data-bs-target="#ExcelFileUploadModal">Import Excel<i className="fa-solid fa-upload ms-2" /></button>
                    <button className='btn btn-success' onClick={DownloadTeacherInfo}>Export Excel<i className="fa-solid fa-download ms-2" /></button>
                </div>

            </div>

            <div className='Data'>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>ClassTeacherOf</th>
                            <th>Phone Number</th>
                            <th>Report</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            AllTeacherInfo.filter((Teacher) =>
                                Keys.some((key) =>
                                    String(Teacher[key]).toLowerCase().includes(Search.toLowerCase())
                                )
                            ).map((Element, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{Element.FirstName}</td>
                                        <td>{Element.LastName}</td>
                                        <td>{Element.ClassTeacherOf}</td>
                                        <td>{Element.PhoneNumber}</td>
                                        <td><button className='btn btn-success'>Report<i className="fa-solid fa-id-card" /></button></td>
                                        <td style={{ display: 'flex', justifyContent: 'space-around'}}>
                                            <button className='btn btn-primary' onClick={() => GetTeacherInfo(Element._id)} type="button" data-bs-toggle="modal" data-bs-target="#UpdateModalModal">Edit<i className="fa-regular fa-pen-to-square" /></button>
                                            <button className='btn btn-danger' onClick={() => DeleteTeacherInfo(Element._id)}>Delete<i className="fa-solid fa-trash" /></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>























            {/* Add Teacher Modal */}
            <div className="modal fade" id="AddTeacherModal" tabIndex="-1" aria-labelledby="AddTeacherModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={SendTeacherData}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="AddTeacherModalLabel">Add New Teacher</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body AddModal">
                                <label>First Name:</label>
                                <input type='text' value={TeacherData.FirstName} onChange={(event) => setTeacherData({ ...TeacherData, FirstName: event.target.value })} />
                                <label>Last Name:</label>
                                <input type='text' value={TeacherData.LastName} onChange={(event) => setTeacherData({ ...TeacherData, LastName: event.target.value })} />
                                <label>ClassTeacherOf:</label>
                                <input type='text' value={TeacherData.ClassTeacherOf} onChange={(event) => setTeacherData({ ...TeacherData, ClassTeacherOf: event.target.value })} />
                                <label>Phone Number:</label>
                                <input type='number' value={TeacherData.PhoneNumber} onChange={(event) => setTeacherData({ ...TeacherData, PhoneNumber: event.target.value })} />
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

            {/* UpdateModal */}
            <div className="modal fade" id="UpdateModalModal" tabIndex="-1" aria-labelledby="UpdateModalModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={() => EditTeacherInfo(EditTeacherData._id)}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="UpdateModalModalLabel">Edit Teacher Info</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body AddModal">
                                <label>First Name:</label>
                                <input type='text' value={EditTeacherData.FirstName} onChange={(event) => setEditTeacherData({ ...EditTeacherData, FirstName: event.target.value })} />
                                <label>Last Name:</label>
                                <input type='text' value={EditTeacherData.LastName} onChange={(event) => setEditTeacherData({ ...EditTeacherData, LastName: event.target.value })} />
                                <label>ClassTeacherOf:</label>
                                <input type='text' value={EditTeacherData.ClassTeacherOf} onChange={(event) => setEditTeacherData({ ...EditTeacherData, ClassTeacherOf: event.target.value })} />
                                <label>Phone Number:</label>
                                <input type='number' value={EditTeacherData.PhoneNumber} onChange={(event) => setEditTeacherData({ ...EditTeacherData, PhoneNumber: event.target.value })} />
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
