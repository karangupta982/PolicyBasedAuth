// "use client";

// import { useState } from 'react';
// import axios from 'axios';
// // import { redirect } from 'next/navigation'
// import { useRouter } from 'next/navigation';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [message, setMessage] = useState('');
//   const router = useRouter();

//   const handleChange = (e:any) => {
//     setFormData({...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e:any) => {
//     e.preventDefault();
//     try {
//         console.log("formData: ",formData);
//       const res = await axios.post('http://localhost:5000/api/v1/auth/login', formData, {
//           withCredentials: true,
//         }); 
//     console.log("res after login", res);
//     console.log("login successfull")
//     console.log(`role: ${res.data.user.role}`)
//     //   setMessage(`Login successful`);
//       setMessage(`Login successful as ${res.data.user.role}`);
      
//       // localStorage.setItem("token", res.data.token);
//       localStorage.setItem("token", JSON.stringify(res.data.token))
//     //   redirect(`/dashboard/${res.data.user.role}`);
//     router.push(`/dashboard/${res.data.user.role}`);
    
//     } catch (err:any) {
//       setMessage(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 shadow-md border rounded-xl">
//       <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//       {message && <div className="text-sm text-center text-red-500 mb-3">{message}</div>}
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="p-2 border rounded" required />
//         <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="p-2 border rounded" required />
//         <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;








// --------------



"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const router = useRouter();

 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("formData: ", formData);
      const res = await axios.post(
        'https://policybasedauth.onrender.com/api/v1/auth/login',
        // 'http://localhost:5000/api/v1/auth/login',
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("res after login", res);
      console.log("login successful");
      console.log(`role: ${res.data.user.role}`);

      setMessage(`Login successful as ${res.data.user.role}`);

      localStorage.setItem("token", JSON.stringify(res.data.token));

      router.push(`/dashboard/${res.data.user.role}`);
    } catch (err: unknown) {
      // type guard for axios error
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.message || 'Login failed');
      } else {
        setMessage('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-md border rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {message && <div className="text-sm text-center text-red-500 mb-3">{message}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
