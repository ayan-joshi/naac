import React, { useEffect } from 'react'
import { useState } from 'react';
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";

const Criteria26 = ({ onCrit26Data }) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [learning_outcomes, setlearning_outcomes] = useState("");
    const [attainment_prog_outcomes, setattainment_prog_outcomes] = useState("");
    const [final_year_students_passed, setfinal_year_students_passed] = useState("");
    const [final_year_students_appeared, setfinal_year_students_appeared] = useState("");
    const [file2_6_2, setfile2_6_2] = useState(null);
    const [file2_6_1, setfile2_6_1] = useState(null);
    const [file2_6_3_2_1, setfile2_6_3_2_1] = useState(null);
    const [file2_6_3_2_2, setfile2_6_3_2_2] = useState(null);

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

    useEffect(() => {
        const crit26 = {
            learning_outcomes,
            file2_6_1,
            attainment_prog_outcomes,
            file2_6_2,
            final_year_students_passed,
            final_year_students_appeared,
            file2_6_3_2_1,
            file2_6_3_2_2
        };
        onCrit26Data(crit26);
    }, [learning_outcomes, file2_6_1, attainment_prog_outcomes, file2_6_2, final_year_students_passed, final_year_students_appeared, file2_6_3_2_1, file2_6_3_2_2]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://naacserver.onrender.com/data/fetchC2?department=${department}&academicYear=${academicYear}`);
            const data = response.data.data.criteria26;

            if (data) {
                setlearning_outcomes(data.learning_outcomes ? data.learning_outcomes : '');
                setattainment_prog_outcomes(data.attainment_prog_outcomes ? data.attainment_prog_outcomes : '');
                setfinal_year_students_passed(data.final_year_students_passed ? data.final_year_students_passed : '');
                setfinal_year_students_appeared(data.final_year_students_appeared ? data.final_year_students_appeared : '');
                setfile2_6_2(data.file2_6_2 ? 'true' : 'false');
                setfile2_6_1(data.file2_6_1 ? 'true' : 'false');
                setfile2_6_3_2_1(data.file2_6_3_2_1 ? 'true' : 'false');
                setfile2_6_3_2_2(data.file2_6_3_2_2 ? 'true' : 'false');
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='c-2-6'>

            <h3>2.6 - Student Performance and Learning Outcomes</h3>

            <h4>2.6.1 - The institution has stated leaning outcomes (generic and programme specific)/ graduate attributes which are integrated into the assessmnet process and widely publicized through the website and other documents</h4>

            <div className="text-area">
                <StyledTextArea
                    rows={5}
                    placeholder="Type the text here"
                    value={learning_outcomes}
                    onChange={(e) => setlearning_outcomes(e.target.value)}
                />
            </div>
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
                        <td> {file2_6_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}

                            Upload the data template</td>
                        <td>
                        </td>
                        <td>
                            <input
                                type="file"
                                id="file2_6_1"
                                name="fileUpload"
                                accept=".xls, .xlsx"
                                onChange={(e) => setfile2_6_1(e.target.files[0])}
                            />
                        </td>
                        <td>xls, xlsx. File size: 6MB</td>
                    </tr>
                </tbody>
            </table>
            <div>
            <button onClick={() => saveSection({ learning_outcomes, file2_6_1 }, '2-6-1')}>Save</button>
            </div>

            <h4>2.6.2 - Attainment of Programme outcomes, Programme specific outcomes and course outcomes are evaluated by the institution during the year</h4>
            <div className="text-area">
                <StyledTextArea
                    rows={5}
                    placeholder="Type the text here"
                    value={attainment_prog_outcomes}
                    onChange={(e) => setattainment_prog_outcomes(e.target.value)}
                />
            </div>
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
                        <td> {file2_6_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}

                            Upload the data template</td>
                        <td>
                        </td>
                        <td>
                            <input
                                type="file"
                                id="file2_6_2"
                                name="fileUpload"
                                accept=".xls, .xlsx"
                                onChange={(e) => setfile2_6_2(e.target.files[0])}
                            />
                        </td>
                        <td>xls, xlsx. File size: 6MB</td>
                    </tr>
                </tbody>
            </table>
            <div>
            <button onClick={() => saveSection({ attainment_prog_outcomes, file2_6_2 }, '2-6-2')}>Save</button>
            </div>

            <h4>2.6.3 - Number of students passed during the year</h4>

            <h4>2.6.3.1 - total number of final year students who passed the university examination during the year</h4>
            <input
                type="number"
                id="final_year_students_passed"
                value={final_year_students_passed}
                onChange={(e) => setfinal_year_students_passed(e.target.value)}
            /><br />
            <h4>2.6.3.2 - Total number of final year students who appeared for the examination</h4>
            <input
                type="number"
                id="final_year_students_appeared"
                value={final_year_students_appeared}
                onChange={(e) => setfinal_year_students_appeared(e.target.value)}
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
                        <td> {file2_6_3_2_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}

                            Upload the data template</td>
                        <td>
                            <button onClick={() => downloadExcel('2.6.3.xlsx')}>Data Template</button>
                        </td>
                        <td>
                            <input
                                type="file"
                                id="file2_6_3_2_1"
                                name="fileUpload"
                                accept=".xls, .xlsx"
                                onChange={(e) => setfile2_6_3_2_1(e.target.files[0])}
                            />
                        </td>
                        <td>xls, xlsx. File size: 6MB</td>
                    </tr>
                    <tr>
                        <td> {file2_6_3_2_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                            Upload relevant supporting documents</td>
                        <td></td>
                        <td>
                            <input
                                type="file"
                                id="file2_6_3_2_2"
                                name="fileUpload"
                                accept=".xls, .xlsx, .doc, .docx, .pdf"
                                onChange={(e) => setfile2_6_3_2_2(e.target.files[0])}
                            />
                        </td>
                        <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                    </tr>
                </tbody>
            </table>
            <div>
            <button onClick={() => saveSection({ final_year_students_appeared, final_year_students_passed, file2_6_3_2_1, file2_6_3_2_2 }, '2-6-3')}>Save</button>
            </div>

        </div>
    )
}

export default Criteria26