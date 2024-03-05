import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase";
import { set, ref as Dref, update } from "firebase/database";
import {auth} from '../firebase'

const Modal = ({ showModal, setShowModal, data, id }) => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [category, setCategory] = useState('')
    const [img, setimg] = useState({})

    useEffect(() => {
        if (data) {
            setTitle(data.title)
            setDesc(data.description)
            setCategory(data.category)
        }

    }, [data])

    const EditBlog = (e) => {
        e.preventDefault()
        const storageRef = ref(storage, 'img' + img.name);

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, img).then((snapshot) => {

            alert('Uploaded a image!');
            getDownloadURL(snapshot.ref)
                .then((url) => {
                    update(Dref(db, 'blogs/' + id), {
                        image: url,
                        title: title,
                        category: category,
                        description: desc,
                        datetime: new Date().toLocaleDateString()
                    })
                })
        }).catch((e) => {
            alert(e.message)
        })

        setShowModal(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const storageRef = ref(storage, 'img' + img.name);

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, img).then((snapshot) => {

            alert('Uploaded a image!');
            getDownloadURL(snapshot.ref)
                .then((url) => {
                    set(Dref(db, 'blogs/' + Date.now().toString()), {
                        id: Date.now().toString(),
                        user: auth.currentUser.email,
                        image: url,
                        title: title,
                        category: category,
                        description: desc,
                        datetime: new Date().toLocaleDateString()
                    })
                })
                .catch((error) => {
                    console.log(error)
                });
        }).catch((e) => {
            alert(e.message)
        })

        setShowModal(false)
    }

    return (
        <>
            {showModal ? (
                <>
                    <div className="fixed z-50 lg:w-[40%]  h-[60%] m-auto left-0 right-0 top-0 bottom-0">
                        <div className="border-0 p-8 bg-gray-800 block rounded-lg shadow-lg  flex flex-col   ">
                            <div className="w-full flex items-start justify-between  border-b border-solid border-gray-300 rounded-t ">
                                <h3 className="text-3xl text-white font-semibold">
                                    {data ? 'Edit blog' : 'Create blog'}
                                </h3>
                                <button
                                    className="bg-transparent border-0 text-black float-right"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span className=" opacity-7 h-6 w-6 text-xl block ">
                                        <IoMdClose color="white" size={25} />
                                    </span>
                                </button>
                            </div>


                            <form className="mt-4 " onSubmit={data ? EditBlog : handleSubmit}>
                                <div className="mb-2">
                                    <label className="block mb-1 text-sm font-medium text-white dark:text-white">Title</label>
                                    <input
                                        type="text"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        placeholder="Enter the title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block mb-1 text-sm font-medium text-white ">Description</label>
                                    <textarea
                                        type="text"
                                        rows={3}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        placeholder="Enter the description"
                                        value={desc}
                                        onChange={(e) => setDesc(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block mb-1 text-sm font-medium text-white ">Category</label>
                                    <input
                                        type="text"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        placeholder="Enter the category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        required />
                                </div>
                                <div className="mb-2">
                                    <label className="block mb-1 text-sm font-medium text-white ">Image</label>
                                    <input
                                        type="file"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"

                                        onChange={(e) => setimg(e.target.files[0])}
                                        required
                                    />
                                </div>

                                <div className="flex justify-center items-center w-full my-5">
                                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        {data ? 'Edit blog' : 'Create blog'}
                                    </button>
                                </div>
                            </form>


                        </div>

                    </div>
                </>
            ) : null}
        </>
    );
};

export default Modal;