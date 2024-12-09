import { useState } from "react";
import { createContext, useContext } from "react";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
    const [students, setStudents] = useState({
        attendance: [],
        lessonStatus: []
      });

  const studentOnly = (attendanceDetails, lessons) => {
    // console.log("Attendance Details:", attendanceDetails); 
    // Check the data here

    const processedData = attendanceDetails
        .filter(record => record.is_present === true || record.is_absent === true)
        .map((record) => {
            let attStatus = "No Attendance";
            if (record.is_present === true) attStatus = "Present";
            else if (record.is_absent === true) attStatus = "Absent";

            const attDate = record.date ? new Date(parseInt(record.date) * 1000).toLocaleDateString() : "Invalid Date";

            return { attStatus, attDate };
        });

    const lessonStatus = lessons;
    setStudents({ attendance: processedData, lessonStatus });
};


  return (
    <StudentContext.Provider value={{ students, studentOnly }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);
