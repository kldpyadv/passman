import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [form, setForm] = useState({ weburl: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);

    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    useEffect(() => {
        const passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    function togglePasswordVisibility() {
        setIsPasswordVisible(prevState => !prevState);
    }

    const savePassword = () => {
        if (form.weburl.length > 3 && form.username.length > 3 && form.password.length > 3) {
            let newPasswordArray;
            if (form.id) {
                newPasswordArray = passwordArray.map(item => item.id === form.id ? { ...form } : item);
            } else {
                newPasswordArray = [...passwordArray, { ...form, id: uuidv4() }];
            }
            setPasswordArray(newPasswordArray);
            localStorage.setItem("passwords", JSON.stringify(newPasswordArray));
            setForm({ weburl: "", username: "", password: "" }); // Reset form after saving
            toast.success('Password Saved Successfully', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.error('Error: All fields must be filled and have more than 3 characters!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast('🦄 Copied to clipboard!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const deletePassword = (id) => {
        let ucon = confirm("Are you sure, you want to delete this password?")
        if (ucon) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast.success('Password Deleted!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

    }

    const editPassword = (id) => {
        const selectedItem = passwordArray.find(i => i.id === id);
        if (selectedItem) {
            setForm(selectedItem);
        }
    }

    const accordionItems = [
        {
            label: 'Account Info',
            content: { username: 'user1', password: 'pass1' }
        },
        {
            label: 'Another Account',
            content: { username: 'user2', password: 'pass2' }
        }
    ];

    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-cyan-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="p-2 md:pmcontainer  overflow-hidden mb-10">
                <div className="apphead">
                    <h1 className="text-3xl font-bold text-center">
                        <span className="text-cyan-400">&lt;</span>Pass<span className="text-cyan-400">Man</span><span className="text-cyan-400"> /&gt;</span>
                    </h1>
                    <div className="h-[1px] bg-cyan-800 opacity-20 mx-auto w-[90%] my-5"></div>
                </div>
                <div className="inputfields flex flex-col p-4 gap-6 my-5 items-center">
                    <input placeholder="Website URL..." onChange={handleChange} className="rounded-full border border-cyan-800 w-full p-4 py-2" type="text" value={form.weburl} name="weburl" id="weburl" />
                    <div className="flex justify-between flex-col md:flex-row gap-4 w-full">
                        <input placeholder="Enter Username..." onChange={handleChange} className="rounded-full border border-cyan-800 w-full md:w-2/3 p-4 py-2" type="text" value={form.username} name="username" id="username" />
                        <div className="relative w-full md:w-1/3">
                            <input placeholder="Enter Password..." onChange={handleChange} className="rounded-full border border-cyan-800 w-full px-4 py-2 pr-9" type={isPasswordVisible ? "text" : "password"} value={form.password} name="password" id="password" />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer" onClick={togglePasswordVisibility}>
                                {isPasswordVisible ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>
                    <button onClick={savePassword} className="rounded-full flex justify-center items-center bg-cyan-400 w-fit px-5 py-3 text-lg gap-2 hover:bg-cyan-500">
                        <lord-icon
                            src="https://cdn.lordicon.com/zrkkrrpl.json"
                            trigger="loop"
                            stroke="bold"
                            colors="secondary:#ffffff">
                        </lord-icon>
                        Add Password
                    </button>
                </div>
                <div className="passwordlist">
                    <h2 className="font-semibold text-2xl py-3 ">Your Saved Passwords</h2>
                    {passwordArray.length === 0 && <p>No Saved Passwords Found</p>}
                    {passwordArray.length !== 0 && <div className=""><table className="table-auto w-full hidden md:table">
                        <thead className="bg-cyan-900 text-white">
                            <tr>
                                <th className="py-2">Website URL</th>
                                <th className="py-2">Username</th>
                                <th className="py-2">Password</th>
                                <th className="py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-cyan-100">
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className="p-2 border border-white text-center">
                                        <div className="flex items-center justify-center">
                                            <a href={item.weburl} target="_blank">{item.weburl}</a>
                                        </div>
                                    </td>
                                    <td className="p-2 border border-white text-center">
                                        <div className="flex items-center justify-center">
                                            <span>{item.username}</span>
                                            <div className="lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-2 border border-white text-center">
                                        <div className="flex items-center justify-center ">
                                            <span>{item.password}</span>
                                            <div className="lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-2 border border-white text-center">
                                        <div className="flex items-center justify-center ">
                                            <span className="cursor-pointer mx-1" onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "18px", "height": "18px" }}>
                                                </lord-icon>
                                            </span>
                                            <span className="cursor-pointer mx-1" onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "18px", "height": "18px" }}>
                                                </lord-icon>
                                            </span>
                                        </div>
                                    </td>
                                </tr>

                            })}

                        </tbody>
                    </table>
                        <div className="block md:hidden">
                            <div className="flex flex-col gap-1">
                                {passwordArray.map((item, index) => (
                                    <div key={index} onClick={() => toggleItem(index)} >
                                        <div className="bg-cyan-100 p-2 w-full border-b border-white flex justify-between items-center">
                                            <div className="flex-grow truncate">
                                                <p className="truncate" >{item.weburl}</p>
                                            </div>
                                            <div className="flex-none ml-2 flex items-center">
                                                <button className="cursor-pointer mx-1" onClick={(e) => { e.stopPropagation(); editPassword(item.id); }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/gwlusjdu.json"
                                                        trigger="hover"
                                                        style={{ "width": "18px", "height": "18px" }}>
                                                    </lord-icon>
                                                </button>
                                                <button className="cursor-pointer mx-1" onClick={(e) => { e.stopPropagation(); deletePassword(item.id); }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover"
                                                        style={{ "width": "18px", "height": "18px" }}>
                                                    </lord-icon>
                                                </button>
                                                <span className="ml-3">{openIndex === index ? '▼' : '▲'}</span>
                                            </div>
                                        </div>
                                        {openIndex === index && (
                                            <div className="mt-2 p-2 border-t border-gray-200">
                                                <a href={item.weburl} className="text-cyan-600" target="_blank" onClick={(e) => e.stopPropagation()}>{item.weburl}</a>
                                                <div className="flex justify-between mt-2">
                                                    <span>Username: <strong>{item.username}</strong></span>
                                                    <button onClick={(e) => { e.stopPropagation(); copyText(item.username); }} className="lordiconcopy">
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                            style={{ "width": "25px", "height": "25px" }}
                                                        />
                                                    </button>
                                                </div>
                                                <div className="flex justify-between mt-1">
                                                    <span>Password: <strong>{item.password}</strong></span>
                                                    <button onClick={(e) => { e.stopPropagation(); copyText(item.password); }} className="lordiconcopy">
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                            style={{ "width": "25px", "height": "25px" }}
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div >
        </>
    )
}

export default Manager