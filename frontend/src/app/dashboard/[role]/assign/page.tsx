// "use client"
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AdminAssignPage = () => {
//   const [students, setStudents] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [selectedTeachers, setSelectedTeachers] = useState({}); // {studentId: teacherId}

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const studentRes = await axios.get('http://localhost:5000/api/v1/admin/unassignedstudents');
//     const teacherRes = await axios.get('http://localhost:5000/api/v1/admin/teachers');
//     console.log("unassgined studerent: ",studentRes);
//     console.log("teacher res: ",teacherRes);

//     setStudents(studentRes.data);
//     setTeachers(teacherRes.data);
//   };

//   const handleAssign = async (studentId:any) => {
//     const teacherId = selectedTeachers[studentId];
//     if (!teacherId) return alert('Select a teacher first!');

//     await axios.put('http://localhost:5000/api/v1/admin/assignteacher', { studentId, teacherId });
//     alert('Teacher Assigned!');
//     fetchData(); 
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Assign Teachers to Unassigned Students</h1>
//       <div className="space-y-4">
//         {students.map(student => (
//           <div key={student._id} className="border p-4 rounded-lg shadow flex flex-col sm:flex-row justify-between items-center">
//             <div>
//               <p><strong>{student.user.firstName} {student.user.lastName}</strong></p>
//               <p className="text-sm text-gray-500">{student.user.email}</p>
//             </div>

//             <div className="flex gap-4 mt-2 sm:mt-0">
//               <select
//                 className="border rounded px-3 py-1"
//                 onChange={(e) =>
//                   setSelectedTeachers({ ...selectedTeachers, [student._id]: e.target.value })
//                 }
//                 value={selectedTeachers[student._id] || ''}
//               >
//                 <option value="">Select Teacher</option>
//                 {teachers.map(teacher => (
//                   <option key={teacher._id} value={teacher._id}>
//                     {teacher.user.firstName} {teacher.user.lastName}
//                   </option>
//                 ))}
//               </select>

//               <button
//                 className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                 onClick={() => handleAssign(student._id)}
//               >
//                 Assign
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminAssignPage;











// ------------------






"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Student {
  _id: string;
  user: User;
}

interface Teacher {
  _id: string;
  user: User;
}

const AdminAssignPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedTeachers, setSelectedTeachers] = useState<Record<string, string>>({}); // { studentId: teacherId }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const studentRes = await axios.get<Student[]>('http://localhost:5000/api/v1/admin/unassignedstudents');
      const teacherRes = await axios.get<Teacher[]>('http://localhost:5000/api/v1/admin/teachers');
      console.log("unassigned students:", studentRes.data);
      console.log("teachers:", teacherRes.data);

      setStudents(studentRes.data);
      setTeachers(teacherRes.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleAssign = async (studentId: string) => {
    const teacherId = selectedTeachers[studentId];
    if (!teacherId) return alert('Select a teacher first!');

    try {
      await axios.put('http://localhost:5000/api/v1/admin/assignteacher', { studentId, teacherId });
      alert('Teacher Assigned!');
      fetchData(); // Refresh the data
    } catch (error) {
      console.error("Error assigning teacher", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Assign Teachers to Unassigned Students</h1>
      <div className="space-y-4">
        {students.map((student) => (
          <div key={student._id} className="border p-4 rounded-lg shadow flex flex-col sm:flex-row justify-between items-center">
            <div>
              <p><strong>{student.user.firstName} {student.user.lastName}</strong></p>
              <p className="text-sm text-gray-500">{student.user.email}</p>
            </div>

            <div className="flex gap-4 mt-2 sm:mt-0">
              <select
                className="border rounded px-3 py-1"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSelectedTeachers({ ...selectedTeachers, [student._id]: e.target.value })
                }
                value={selectedTeachers[student._id] || ''}
              >
                <option value="">Select Teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.user.firstName} {teacher.user.lastName}
                  </option>
                ))}
              </select>

              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => handleAssign(student._id)}
              >
                Assign
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAssignPage;
