import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from "react-router-dom";
import Modal from './Modal';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { IoCreateOutline } from "react-icons/io5";

export default function Navbar() {

  const [user, setUser] = useState(null)
  const [showModal, setShowModal] = useState(false);



  const logout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setUser(user)
        // ...
      } else {
        // User is signed out
        // ...
        setUser(null)
      }
    });
  }, [])


  return (

    <Disclosure as="nav" className="bg-gray-800">

      {({ open }) => (

        <>

          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">

            <div className="relative flex h-16 items-center justify-between">

              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                {/* Mobile menu button*/}

                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">

                  <span className="absolute -inset-0.5" />

                  <span className="sr-only">Open main menu</span>

                  {open ? (

                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />

                  ) : (

                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />

                  )}

                </Disclosure.Button>

              </div>

              <div className="flex  items-center justify-center ">

                <div className="flex flex-shrink-0 items-center">

                  <img

                    className="h-10 w-auto"

                    src="Faiz-designstyle-smoothie-m.png"

                    alt="logo"

                  />

                </div>


              </div>

              {user !== null ? (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    onClick={() => setShowModal(true)}
                    className='p-2 mx-2 gap-2 flex bg-gray-900 bg-white text-gray-900 rounded hover:bg-gray-400 hover:text-white '
                  >

                    Create Blog
                    <IoCreateOutline size={25} />
                  </button>
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src='https://static.vecteezy.com/system/resources/previews/000/550/731/original/user-icon-vector.jpg'
                          alt=""
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >

                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>

                          <div className='block px-4 py-2 text-sm text-gray-700'>
                            {user ? user.email : ""}
                          </div>
                        </Menu.Item>
                        <Menu.Item>
                          <button onClick={logout} className='block px-4 py-2 text-sm text-gray-700'>
                            Logout
                          </button>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <Link to="/SignUp" className='block px-4 py-2 text-sm text-white'>
                    SignUp
                  </Link>
                  <Link to="/SignIn" className='block px-4 py-2 text-sm text-white'>
                    Login
                  </Link>
                </div>
              )}


            </div>

          </div>

          <Modal

            setShowModal={setShowModal}

            showModal={showModal}

          />

        </>

      )

      }

    </Disclosure >

  )

}