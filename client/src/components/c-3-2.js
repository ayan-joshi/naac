import React, { useState, useEffect } from "react";
import { saveAs } from 'file-saver';
import axios from "axios";

const Criteria32 = ({ onCrit32Data }) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');

    const [extraFunding, setExtraFunding] = useState("");
    const [file3_2_1_1, setFile3_2_1_1] = useState(null);
    const [file3_2_1_2, setFile3_2_1_2] = useState(null);

    const [grants, setGrants] = useState("");
    const [file3_2_2_1, setFile3_2_2_1] = useState(null);
    const [file3_2_2_2, setFile3_2_2_2] = useState(null);

    const [teacherResearchProjects, setTeacherResearchProjects] = useState("");
    const [file3_2_3_1, setFile3_2_3_1] = useState(null);
    const [file3_2_3_2, setFile3_2_3_2] = useState(null);

    const downloadExcel = async (exc_file) => {
        const templateFilePath = `${process.env.PUBLIC_URL}/${exc_file}`;

        try {
            const response = await fetch(templateFilePath);
            const blob = await response.blob();

            saveAs(blob, `${exc_file}_output.xlsx`);
        } catch (error) {
            console.error('Error fetching the template file:', error);
        }
    };

    const saveSection = async (sectionData, section) => {
        const formData = new FormData();

        formData.append("department", department);
        formData.append("academicYear", academicYear);

        let allFieldsFilled = true;

        for (const key in sectionData) {
            if (sectionData[key] === null || sectionData[key] === '') {
                allFieldsFilled = false;
                break;
            }
        }

        if (!allFieldsFilled) {
            alert('Please fill in all the fields of the section.');
        } else {
            for (const key in sectionData) {
                formData.append(key, sectionData[key]);
            }
        }
        try {
            const response = await axios.post(`https://naacserver.onrender.com/data/save${section}`, formData);
            console.log(response.data);
            alert(`Saved Section ${section} data`);
        } catch (error) {
            console.log("Error", error.message);
        }
    }

    useEffect(() => {
        const crit32 = {
            extraFunding,
            file3_2_1_1,
            file3_2_1_2,
            grants,
            file3_2_2_1,
            file3_2_2_2,
            teacherResearchProjects,
            file3_2_3_1,
            file3_2_3_2
        };
        onCrit32Data(crit32);
    }, [extraFunding, file3_2_1_1, file3_2_1_2, grants, file3_2_2_1, file3_2_2_2, teacherResearchProjects, file3_2_3_1, file3_2_3_2])

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://naacserver.onrender.com/data/fetchC3?department=${department}&academicYear=${academicYear}`);
            const data = response.data.data.criteria32;

            if (data) {
                setExtraFunding(data.extraFunding ? data.extraFunding : '');
                setFile3_2_1_1(data.file3_2_1_1 ? 'true' : 'false');
                setFile3_2_1_2(data.file3_2_1_2 ? 'true' : 'false');

                setGrants(data.grants ? data.grants : '');
                setFile3_2_2_1(data.file3_2_2_1 ? 'true' : 'false');
                setFile3_2_2_2(data.file3_2_2_2 ? 'true' : 'false');

                setTeacherResearchProjects(data.teacherResearchProjects ? data.teacherResearchProjects : '');
                setFile3_2_3_1(data.file3_2_3_1 ? 'true' : 'false');
                setFile3_2_3_2(data.file3_2_3_2 ? 'true' : 'false');
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="c-3-2">
            <h3>3.2 - Resource Mobilization for Research</h3>
            <ul>
                <li>
                    <div className="c-3-2-1">
                        <h4>
                            3.2.1 - Extramural funding for Research (Grants sponsored by the non-government sources
                            such as industry, corporate houses, international bodies for research projects) endowments,
                            Chairs in the University during the year (INR in Lakhs)
                        </h4>
                        <input
                            type="number"
                            id="extraFunding"
                            value={extraFunding}
                            onChange={(e) => setExtraFunding(e.target.value)}
                        />
                    </div>
                    <div className="table-3_2_1">
                        <table>
                            <thead>
                                <tr>
                                    <th>File Description</th>
                                    <th>Template</th>
                                    <th>Documents</th>
                                    <th>File Types/Size Supported</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {file3_2_1_1 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                        Upload the data template</td>
                                    <td>
                                        <button onClick={() => downloadExcel('3.2.1.xlsx')}>Data Template</button>
                                    </td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file3_2_1_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx"
                                            onChange={(e) => setFile3_2_1_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td>
                                        {file3_2_1_2 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                        Upload relevant supporting documents
                                    </td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file3_2_1_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile3_2_1_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                        <button onClick={() => saveSection({ extraFunding, file3_2_1_1, file3_2_1_2 }, '3-2-1')}>Save</button>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="c-3_2_2">
                        <h4>3.2.2- Grants for research projects sponsored by the government agencies during the year (INR in Lakhs)</h4>
                        <input
                            type="number"
                            id="grants"
                            value={grants}
                            onChange={(e) => setGrants(e.target.value)}
                        /><br />
                        <table>
                            <thead>
                                <tr>
                                    <th>File Description</th>
                                    <th>Template</th>
                                    <th>Documents</th>
                                    <th>File Types/Size Supported</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {file3_2_2_1 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                        Upload the data template</td>
                                    <td>
                                        <button onClick={() => downloadExcel('3.2.2.xlsx')}>Data Template</button>
                                    </td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file3_2_2_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx"
                                            onChange={(e) => setFile3_2_2_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td>
                                        {file3_2_2_2 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                        Upload relevant supporting documents</td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file3_2_2_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile3_2_2_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                        <button onClick={() => saveSection({ grants, file3_2_2_1, file3_2_2_2 }, '3-2-2')}>Save</button>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="c-3_2_3">
                        <h4>3.2.3 - Number of research projects per teacher funded by government and non-government agencies during the year</h4>
                        <input
                            type="number"
                            id="teacherResearchProjects"
                            value={teacherResearchProjects}
                            onChange={(e) => setTeacherResearchProjects(e.target.value)}
                        />
                        <table>
                            <thead>
                                <tr>
                                    <th>File Description</th>
                                    <th>Template</th>
                                    <th>Documents</th>
                                    <th>File Types/Size Supported</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {file3_2_3_1 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                        Upload the data template</td>
                                    <td>
                                        <button onClick={() => downloadExcel('3.2.3.xlsx')}>Data Template</button>
                                    </td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file3_2_3_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx"
                                            onChange={(e) => setFile3_2_3_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td>
                                        {file3_2_3_2 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                        Upload relevant supporting documents</td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file3_2_3_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile3_2_3_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                    <button onClick={() => saveSection({ teacherResearchProjects, file3_2_3_1, file3_2_3_2 }, '3-2-3')}>Save</button>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Criteria32;
