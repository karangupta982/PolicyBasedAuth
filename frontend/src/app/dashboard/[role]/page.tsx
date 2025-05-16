"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation"

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Student {
  _id: string;
  user?: User; 
  firstName?: string;
  lastName?: string;
  email?: string;
  assignedTeacher?: string;
}


export default function DashboardPage() {
  const pathName = usePathname();
  const [data, setData] = useState<Student[]>([]);
  const [allowedActions, setAllowedActions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  let role = pathName.split("/")[2];



  useEffect(() => {
    const fetchRoleData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/students", {
          withCredentials: true,
        });

        console.log("Role Data:", res);
        let students:Student[];
        if(role == 'teacher')students = res.data.data.students;
        // else student = res.data.data;
        else {
          students = Array.isArray(res.data.data)
          ? res.data.data
          : [res.data.data];
        }
        

        setData(students);
        setAllowedActions(res.data.allowedActions || []);
        setLoading(false);
      } catch (err) {
        console.error("Error in fetching role data:", err);
        setLoading(false);
      }
    };

    if (role) {
      fetchRoleData();
    }
  }, [role]);

  if (loading) return <div className="text-center mt-10">Loading Dashboard...</div>;

  

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 capitalize">{role} Dashboard</h1>

      {allowedActions.includes("view") ? (
        <div className="space-y-4">
          {data.length > 0 ? (
            data.map((item: Student) => {
              let user;
              if(role === "admin" || role === "teacher")user = item.user;
              // user = role === "admin" ? item.user : item;
              else user = item;

              if (!user) return null;
             
              return (
                <div
                  key={item._id}
                  className="bg-white p-4 text-black rounded-xl shadow border"
                >
                  <h2 className="font-semibold">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p>Email: {user.email}</p>

                  <div className="mt-3 space-x-2 bg-gray-700 p-2 rounded">
                    {allowedActions.includes("edit") && (
                      <button className="bg-yellow-400 px-3 py-1 rounded text-sm">
                        Edit
                      </button>
                    )}
                    {allowedActions.includes("delete") && (
                      <button className="bg-red-500 px-3 py-1 rounded text-white text-sm">
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <>
            <p>No Student is assigned to You (Teacher).</p>
            <p>No data available.</p>
            </>
          )}
        </div>
      ) : (
        <p className="text-red-500">You don’t have permission to view this data.</p>
      )}
    </div>
  );
}





