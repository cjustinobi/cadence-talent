
import * as fcl from '@onflow/fcl'
import '../flow/config.js'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import RegisterModal from '../components/RegisterModal'

const Header = () => {

  const [user, setUser] = useState({ loggedIn: false })
  const [modal, setModal] = useState(false)

  useEffect(() => {
    fcl.currentUser.subscribe(setUser)
  }, [])

  const handleAuthentication = () => {
    if (user.loggedIn) {
      fcl.unauthenticate(); // logs the user out
    } else {
      fcl.authenticate(); // logs the user in
    }
  }

  const hideModal = () => setModal(false)

  return (

    <header>
      <RegisterModal modal={modal} hideModal={hideModal}/>

      <nav>
        <div className="bg-black-1 py-5 2xl:py-10 px-8 2xl:px-24">
          <div className="bg-pink-400- py-1 w-full h-full flex items-center justify-between">
            <Link href="/" className="text-2xl font-ClashDisplay font-bold text-white">TalentMkt</Link>

            <div className="flex md:space-x-24 xl:space-x-32 2xl:space-x-44 items-center justify-start">
              <div className="flex space-x-8 xl:space-x-16 items-start justify-start">
                <Link href="/transactions" className="text-base text-gray-400">My Transactions</Link>
                <Link href="/jobs" className="text-base text-gray-400"> My Jobs</Link>
              </div>
              <div className="flex space-x-8- xl:space-x-16- items-center justify-start">
                <div onClick={() => setModal(true)} className="flex space-x-2 items-center justify-center text-base text-white cursor-pointer">
                  Register
                  <Image className='w-4 md:w-4 h-4 ml-2 2xl:w-8' src={require ('../assets/img/vector-arrow.svg')}></Image>
                </div>
                <div className='inline-flex ml-8 xl:ml-16 items-center justify-center md:px-8 2xl:px-16 py-6 bg-gradient-to-b from-blue-1 to-green-1 rounded-3xl'>
                  <span onClick={handleAuthentication} className='text-base text-white'>{user.loggedIn ? user.addr : "Log In"}</span>
                  <Image className='w-4 md:w-4 h-4 ml-2 2xl:w-8' src={require ('../assets/img/wallet-money-grp.svg')}></Image>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header