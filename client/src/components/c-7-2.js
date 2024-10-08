import React, { useState, useEffect } from "react";
import StyledTextArea from "./textArea";
import axios from "axios";
import '../css/criteria7.css';

const Criteria72 = ({ onCrit72Data }) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [text7_2_1, settext7_2_1] = useState("");

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
        const crit72 = {
            text7_2_1,
        };
        onCrit72Data(crit72);
    }, [
        text7_2_1,
    ])

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://naacserver.onrender.com/data/fetchC7?department=${department}&academicYear=${academicYear}`);
            const data = response.data.data.criteri72;

            if (data) {
                settext7_2_1 (data.text7_2_1 ? data.text7_2_1 : '');
                
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return(
        <div className="c-7-2">
            <h3>7.2 - Best Practices</h3>
            <div className="c-7-2-1">
                <h4>7.2.1 - Describe one best practice successfully implemented by the institution as per NAACformat provided in the Manual</h4>
                <StyledTextArea
                    rows={5}
                    placeholder="Type the text here"
                    value={text7_2_1}
                    onChange={(e) => settext7_2_1(e.target.value)}
                />
                <div>
                    <button onClick={() => saveSection({ text7_2_1 }, '7-2-1')}>Save</button>
                </div>
            </div>
        </div>
    )

}

export default Criteria72;
