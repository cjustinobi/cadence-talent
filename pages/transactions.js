import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import * as fcl from '@onflow/fcl'
import { authorizationFunction } from '../helpers'

export default function Home() {

  const [completed, setCompleted] = useState(true)

  const runTransaction = async  () => {

    const transactionId = await fcl.send([
      fcl.transaction`
      import TalentMkt from f8d6e0586b0a20c7 
  
      transaction() {
  
        prepare(acct: AuthAccount) {
          let vendorResource <- acct.load<@TalentMkt.Vendor>(from: /storage/TalentMkt)
          log(vendorResource?.details)
          acct.save(<-vendorResource!, to: /storage/TalentMkt)
        }
  
        execute {
          //HelloWorld.changeGreeting(newGreeting: myNewGreeting)
        }
      }
      `,
      fcl.proposer(authorizationFunction),
      fcl.authorizations([authorizationFunction]),
      // args: (arg, t) => [],
      //proposer: fcl.authz,
      fcl.payer(authorizationFunction),
      // authorizations: [fcl.authz],
      fcl.limit(999)
    ])

    const transaction = await fcl.tx(transactionId).onceSealed()

    console.log('Here is the transactionId: ' + JSON.stringify(transactionId))
  }

  const executeScript = async() => {
    const response = await fcl.query({
      cadence: `
      import TalentMkt from 0xf8d6e0586b0a20c7
  
      pub fun main(): Int {
          return TalentMkt.vendorCount
      }
      `,
      args: (arg, t) => [] // ARGUMENTS GO IN HERE
    });

    console.log('Response from our script: ' + response);
  }

  useEffect(() => {
    // executeScript()
  }, [])

  return (
    <>
      <div className="bg-black-1 flex flex-col items-center justify-center h-full  px-4 py-12 md:py-20 mx-auto md:px-10 lg:px-16 xl:px-24">
        <div className='h-full flex flex-col items-center justify-center w-full'>
          <p className="text-5xl p-2 w-fit my-2 font-bold leading-10 text-center text-white font-ClashDisplay">
            My Transactions
          </p>
          <p className="text-xl my-2 font-light leading-6 text-center text-white w-3/5 ">
            Keep track of all your payments and transactions in one place
          </p>
          <div className='my-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='bg-gradient-to-b from-blue-1 to-green-1 rounded-2xl p-[1px]'>
              <div className='bg-dark-grey-1 space-y-2 relative  rounded-2xl p-4 h-full text-white'>
                <Image src={require('../assets/img/available-img.svg')} className=''></Image>
                <p className='text-xl my-2- font-bold leading-6 text-start text-white'>Cejowisz Services</p>
                <div className='flex flex-row w-full justify-between'>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Rate/hr</p>
                    <p className='text-sm font-normal leading-5 text-white'>0.25 Flow</p>
                  </div>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Total Earns</p>
                    <p className='text-sm font-normal leading-5 text-white'>8.25 Flow</p>
                  </div>
                </div>
                <div className='flex flex-row w-full justify-between'>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Rating</p>
                    <p className='text-sm font-normal leading-5 text-white'>6</p>
                  </div>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Transaction</p>
                    <p className='text-sm font-normal leading-5 text-white'>6</p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button style={{ backgroundColor: 'rgba(176, 70, 56, 0.16)' }} className='flex flex-row space-x-2 items-center justify-center w-[45%] py-1 bg-[rgba(10, 70, 56, 1)] rounded-lg border border-[#B04638]'>
                    Cancel
                  </button>
                  <button style={{ backgroundColor: 'rgba(56, 176, 129, 0.16)' }} className='flex flex-row space-x-2 items-center justify-center w-[45%] py-1  rounded-lg border border-[#38B081]'>
                    Approve
                  </button>
                </div>
              </div>
            </div>
            <div className='bg-gradient-to-b from-blue-1 to-green-1 rounded-2xl p-[1px]'>
              <div className='bg-dark-grey-1 space-y-2 relative  rounded-2xl p-4 h-full text-white'>
                <Image src={require('../assets/img/available-img.svg')} className=''></Image>
                <p className='text-xl my-2- font-bold leading-6 text-start text-white'>Joe Tech</p>
                <div className='flex flex-row w-full justify-between'>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Rate/hr</p>
                    <p className='text-sm font-normal leading-5 text-white'>0.25 Flow</p>
                  </div>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Total Earns</p>
                    <p className='text-sm font-normal leading-5 text-white'>8.25 Flow</p>
                  </div>
                </div>
                <div className='flex flex-row w-full justify-between'>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Rating</p>
                    <p className='text-sm font-normal leading-5 text-white'>6</p>
                  </div>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Transaction</p>
                    <p className='text-sm font-normal leading-5 text-white'>6</p>
                  </div>
                </div>
                <div className="flex justify-between">
                  {!completed && <button style={{ backgroundColor: 'rgba(176, 70, 56, 0.16)' }} className='flex flex-row space-x-2 items-center justify-center w-[45%] py-1 bg-[rgba(10, 70, 56, 1)] rounded-lg border border-[#B04638]'>
                    Cancel
                  </button>}
                  {!completed && <button style={{ backgroundColor: 'rgba(56, 176, 129, 0.16)' }} className='flex flex-row space-x-2 items-center justify-center w-[45%] py-1  rounded-lg border border-[#38B081]'>
                    Approve
                  </button>}
                  {completed &&<button style={{ backgroundColor: 'rgba(56, 176, 129, 0.16)' }} disabled className='flex flex-row space-x-2 items-center justify-center w-full py-1  rounded-lg border border-[#38B081]'>
                    Approved
                  </button>}
                </div>
              </div>
            </div>
            <div className='bg-gradient-to-b from-blue-1 to-green-1 rounded-2xl p-[1px]'>
              <div className='bg-dark-grey-1 space-y-2 relative  rounded-2xl p-4 h-full text-white'>
                <Image src={require('../assets/img/available-img.svg')} className=''></Image>
                <p className='text-xl my-2- font-bold leading-6 text-start text-white'>Billion Creator</p>
                <div className='flex flex-row w-full justify-between'>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Rate/hr</p>
                    <p className='text-sm font-normal leading-5 text-white'>0.25 Flow</p>
                  </div>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Total Earns</p>
                    <p className='text-sm font-normal leading-5 text-white'>8.25 Flow</p>
                  </div>
                </div>
                <div className='flex flex-row w-full justify-between'>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Rating</p>
                    <p className='text-sm font-normal leading-5 text-white'>6</p>
                  </div>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Transaction</p>
                    <p className='text-sm font-normal leading-5 text-white'>6</p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button style={{ backgroundColor: 'rgba(176, 70, 56, 0.16)' }} className='flex flex-row space-x-2 items-center justify-center w-[45%] py-1 bg-[rgba(10, 70, 56, 1)] rounded-lg border border-[#B04638]'>
                    Cancel
                  </button>
                  <button style={{ backgroundColor: 'rgba(56, 176, 129, 0.16)' }} className='flex flex-row space-x-2 items-center justify-center w-[45%] py-1  rounded-lg border border-[#38B081]'>
                    Approve
                  </button>
                </div>
              </div>
            </div>
            <div className='bg-gradient-to-b from-blue-1 to-green-1 rounded-2xl p-[1px]'>
              <div className='bg-dark-grey-1 space-y-2 relative  rounded-2xl p-4 h-full text-white'>
                <Image src={require('../assets/img/available-img.svg')} className=''></Image>
                <p className='text-xl my-2- font-bold leading-6 text-start text-white'>Gconsult Services</p>
                <div className='flex flex-row w-full justify-between'>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Rate/hr</p>
                    <p className='text-sm font-normal leading-5 text-white'>0.25 Flow</p>
                  </div>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Total Earns</p>
                    <p className='text-sm font-normal leading-5 text-white'>8.25 Flow</p>
                  </div>
                </div>
                <div className='flex flex-row w-full justify-between'>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Rating</p>
                    <p className='text-sm font-normal leading-5 text-white'>6</p>
                  </div>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Transaction</p>
                    <p className='text-sm font-normal leading-5 text-white'>6</p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button style={{ backgroundColor: 'rgba(176, 70, 56, 0.16)' }} className='flex flex-row space-x-2 items-center justify-center w-[45%] py-1 bg-[rgba(10, 70, 56, 1)] rounded-lg border border-[#B04638]'>
                    Cancel
                  </button>
                  <button style={{ backgroundColor: 'rgba(56, 176, 129, 0.16)' }} className='flex flex-row space-x-2 items-center justify-center w-[45%] py-1  rounded-lg border border-[#38B081]'>
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="inline-flex space-x-4 ml-auto mr-3  items-end justify-start">
            <a href='' className="text-sm font-book text-green-1 leading-tight text-center">1</a>
            <a href='' className="text-sm font-book leading-tight text-center text-white">2</a>
            <a href='' className="text-sm font-book leading-tight text-center text-white">3</a>
            <a href='' className="text-sm font-book leading-tight text-center truncate text-white">....</a>
            <a href='' className="text-sm font-book leading-tight text-center text-white">10</a>
          </div>

        </div>
      </div>

    </>
  )
}