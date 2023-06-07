import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import * as fcl from '@onflow/fcl'
import { authorizationFunction } from '../helpers'

export default function Home() {

  const runTransaction = async  () => {

    const transactionId = await fcl.send([
      fcl.transaction`
      import TalentMkt1 from 0x5a7452d1db664257 
  
      transaction() {
  
        prepare(acct: AuthAccount) {
          let vendorResource <- acct.load<@TalentMkt1.Vendor>(from: /storage/TalentMkt)
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
      import TalentMkt1 from 0x5a7452d1db664257
  
      pub fun main(): Int {
          return TalentMkt1.vendorCount
      }
      `,
      args: (arg, t) => [] // ARGUMENTS GO IN HERE
    });

    console.log('Response from our script: ' + response);
  }

  useEffect(() => {
    executeScript()
  }, [])

  return (
    <div>
      {/*<Head>*/}
      {/*  <link href="https://fonts.cdnfonts.com/css/circular-std" rel="stylesheet"/>*/}
      {/*  <link href="https://api.fontshare.com/v2/css?f[]=clash-display@200,400,700,500,600,1,300&display=swap" rel="stylesheet"/>*/}
      {/*</Head>*/}
      <div className="bg-black-1 flex flex-col items-center justify-center h-full- h-[580px] sm:h-screen- sm:h-[640px] md:h-[800px] lg:h-[690px] xl:h-[600px]">
        <div className='container flex flex-col items-center justify-center px-4 py-5 mx-auto md:px-10 lg:px-16 xl:px-24'>
          <p className="text-4xl md:text-6xl xl:text-8xl py-2 text-white font-bold leading-tight text-center font-ClashDisplay">Your One-Stop Spot for Freelance <span className='bg-clip-text text-transparent bg-gradient-to-b from-blue-1 to-green-1'>Talent</span></p>
          <p className="text-xl sm:text-2xl my-4 md:px-[48px] lg:px-40 font-light leading-normal text-center text-white">Find the perfect freelancer for your project and pay them easily and securely using our platform's smart contract technology</p>
        </div>
        <div className='container flex gap-4 flex-col sm:flex-row justify-center items-center'>
          <button className='bg-gradient-to-b from-blue-1 to-green-1 rounded-3xl p-[1px] '>
            <a href='' className='inline-flex w-40 px-4 py-3 md:px-8  md:py-6 2xl:px-16 items-center justify-center text-base text-white bg-black-1 rounded-3xl  '>
              Register
              <Image className='w-4 md:w-4 h-4 ml-2 2xl:w-8' src={require ('../assets/img/vector-arrow.svg')}></Image>
            </a>
          </button>
          <button className=''>
            <a href='' className='inline-flex w-40 px-4 py-3 md:px-8 md:py-6 2xl:px-16 items-center justify-center text-base text-white bg-gradient-to-b from-blue-500 to-green-500 rounded-3xl'>
              Hire
              <Image className='w-4 md:w-4 h-4 ml-2 2xl:w-8' src={require ('../assets/img/vector-arrow.svg')}></Image>
            </a>
          </button>
        </div>
      </div>
      <div className="bg-black-1 flex flex-col items-center justify-center h-full  px-4 py-12 md:py-20 mx-auto md:px-10 lg:px-16 xl:px-24">
        <div className='h-full flex flex-col items-center justify-center w-full'>
          <p className="text-5xl p-2 w-fit my-2 font-bold leading-10 text-center text-white font-ClashDisplay">Available Talents</p>
          <p className="text-xl my-2 font-light leading-6 text-center text-white w-3/5 ">Discover skilled and experienced freelancers who are ready to tackle your projects. From web developers to graphic designers, our community has it all</p>
          <div className='my-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='bg-gradient-to-b from-blue-1 to-green-1 rounded-2xl p-[1px]'>
              <div className='bg-dark-grey-1 space-y-2 relative  rounded-2xl p-4 h-full text-white'>
                <Image src={require('../assets/img/available-img.svg')} className=''></Image>
                <p className='text-xl my-2- font-bold leading-6 text-start text-white'>Gconsult Services</p>
                <div className='flex flex-row w-full justify-between'>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Rate/hr</p>
                    <p className='text-sm font-normal leading-5 text-white'>0.25 CELLO</p>
                  </div>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Total Earns</p>
                    <p className='text-sm font-normal leading-5 text-white'>8.25 CELLO</p>
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
                <a className='flex flex-row space-x-2 items-center justify-center w-full py-3 bg-gradient-to-b from-blue-1 to-green-1 rounded-lg'>
                  <p className='text-sm font-normal leading-5 text-white'>Hire</p>
                  <Image className='w-2' src={require('../assets/img/vector-arrow.svg')}></Image>
                </a>
              </div>
            </div>
            <div className='bg-gradient-to-b from-blue-1 to-green-1 rounded-2xl p-[1px]'>
              <div className='bg-dark-grey-1 space-y-2 relative  rounded-2xl p-4 h-full text-white'>
                <Image src={require('../assets/img/available-img.svg')} className=''></Image>
                <p className='text-xl my-2- font-bold leading-6 text-start text-white'>Gconsult Services</p>
                <div className='flex flex-row w-full justify-between'>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Rate/hr</p>
                    <p className='text-sm font-normal leading-5 text-white'>0.25 CELLO</p>
                  </div>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Total Earns</p>
                    <p className='text-sm font-normal leading-5 text-white'>8.25 CELLO</p>
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
                <a className='flex flex-row space-x-2 items-center justify-center w-full py-3 bg-gradient-to-b from-blue-1 to-green-1 rounded-lg'>
                  <p className='text-sm font-normal leading-5 text-white'>Hire</p>
                  <Image className='w-2' src={require('../assets/img/vector-arrow.svg')}></Image>
                </a>
              </div>
            </div>
            <div className='bg-gradient-to-b from-blue-1 to-green-1 rounded-2xl p-[1px]'>
              <div className='bg-dark-grey-1 space-y-2 relative  rounded-2xl p-4 h-full text-white'>
                <Image src={require('../assets/img/available-img.svg')} className=''></Image>
                <p className='text-xl my-2- font-bold leading-6 text-start text-white'>Gconsult Services</p>
                <div className='flex flex-row w-full justify-between'>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Rate/hr</p>
                    <p className='text-sm font-normal leading-5 text-white'>0.25 CELLO</p>
                  </div>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Total Earns</p>
                    <p className='text-sm font-normal leading-5 text-white'>8.25 CELLO</p>
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
                <a className='flex flex-row space-x-2 items-center justify-center w-full py-3 bg-gradient-to-b from-blue-1 to-green-1 rounded-lg'>
                  <p className='text-sm font-normal leading-5 text-white'>Hire</p>
                  <Image className='w-2' src={require('../assets/img/vector-arrow.svg')}></Image>
                </a>
              </div>
            </div>
            <div className='bg-gradient-to-b from-blue-1 to-green-1 rounded-2xl p-[1px]'>
              <div className='bg-dark-grey-1 space-y-2 relative  rounded-2xl p-4 h-full text-white'>
                <Image src={require('../assets/img/available-img.svg')} className=''></Image>
                <p className='text-xl my-2- font-bold leading-6 text-start text-white'>Gconsult Services</p>
                <div className='flex flex-row w-full justify-between'>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Rate/hr</p>
                    <p className='text-sm font-normal leading-5 text-white'>0.25 CELLO</p>
                  </div>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Total Earns</p>
                    <p className='text-sm font-normal leading-5 text-white'>8.25 CELLO</p>
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
                <a className='flex flex-row space-x-2 items-center justify-center w-full py-3 bg-gradient-to-b from-blue-1 to-green-1 rounded-lg'>
                  <p className='text-sm font-normal leading-5 text-white'>Hire</p>
                  <Image className='w-2' src={require('../assets/img/vector-arrow.svg')}></Image>
                </a>
              </div>
            </div>
            <div className='bg-gradient-to-b from-blue-1 to-green-1 rounded-2xl p-[1px]'>
              <div className='bg-dark-grey-1 space-y-2 relative  rounded-2xl p-4 h-full text-white'>
                <Image src={require('../assets/img/available-img.svg')} className=''></Image>
                <p className='text-xl my-2- font-bold leading-6 text-start text-white'>Gconsult Services</p>
                <div className='flex flex-row w-full justify-between'>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Rate/hr</p>
                    <p className='text-sm font-normal leading-5 text-white'>0.25 CELLO</p>
                  </div>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Total Earns</p>
                    <p className='text-sm font-normal leading-5 text-white'>8.25 CELLO</p>
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
                <a className='flex flex-row space-x-2 items-center justify-center w-full py-3 bg-gradient-to-b from-blue-1 to-green-1 rounded-lg'>
                  <p className='text-sm font-normal leading-5 text-white'>Hire</p>
                  <Image className='w-2' src={require('../assets/img/vector-arrow.svg')}></Image>
                </a>
              </div>
            </div>
            <div className='bg-gradient-to-b from-blue-1 to-green-1 rounded-2xl p-[1px]'>
              <div className='bg-dark-grey-1 space-y-2 relative  rounded-2xl p-4 h-full text-white'>
                <Image src={require('../assets/img/available-img.svg')} className=''></Image>
                <p className='text-xl my-2- font-bold leading-6 text-start text-white'>Gconsult Services</p>
                <div className='flex flex-row w-full justify-between'>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Rate/hr</p>
                    <p className='text-sm font-normal leading-5 text-white'>0.25 CELLO</p>
                  </div>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Total Earns</p>
                    <p className='text-sm font-normal leading-5 text-white'>8.25 CELLO</p>
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
                <a className='flex flex-row space-x-2 items-center justify-center w-full py-3 bg-gradient-to-b from-blue-1 to-green-1 rounded-lg'>
                  <p className='text-sm font-normal leading-5 text-white'>Hire</p>
                  <Image className='w-2' src={require('../assets/img/vector-arrow.svg')}></Image>
                </a>
              </div>
            </div>
            <div className='bg-gradient-to-b from-blue-1 to-green-1 rounded-2xl p-[1px]'>
              <div className='bg-dark-grey-1 space-y-2 relative  rounded-2xl p-4 h-full text-white'>
                <Image src={require('../assets/img/available-img.svg')} className=''></Image>
                <p className='text-xl my-2- font-bold leading-6 text-start text-white'>Gconsult Services</p>
                <div className='flex flex-row w-full justify-between'>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Rate/hr</p>
                    <p className='text-sm font-normal leading-5 text-white'>0.25 CELLO</p>
                  </div>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Total Earns</p>
                    <p className='text-sm font-normal leading-5 text-white'>8.25 CELLO</p>
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
                <a className='flex flex-row space-x-2 items-center justify-center w-full py-3 bg-gradient-to-b from-blue-1 to-green-1 rounded-lg'>
                  <p className='text-sm font-normal leading-5 text-white'>Hire</p>
                  <Image className='w-2' src={require('../assets/img/vector-arrow.svg')}></Image>
                </a>
              </div>
            </div>
            <div className='bg-gradient-to-b from-blue-1 to-green-1 rounded-2xl p-[1px]'>
              <div className='bg-dark-grey-1 space-y-2 relative  rounded-2xl p-4 h-full text-white'>
                <Image src={require('../assets/img/available-img.svg')} className=''></Image>
                <p className='text-xl my-2- font-bold leading-6 text-start text-white'>Gconsult Services</p>
                <div className='flex flex-row w-full justify-between'>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Rate/hr</p>
                    <p className='text-sm font-normal leading-5 text-white'>0.25 CELLO</p>
                  </div>
                  <div className='flex w-fit flex-col items-start justify-center'>
                    <p className='text-sm font-medium leading-5 text-bright-grey-1'>Total Earns</p>
                    <p className='text-sm font-normal leading-5 text-white'>8.25 CELLO</p>
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
                <a className='flex flex-row space-x-2 items-center justify-center w-full py-3 bg-gradient-to-b from-blue-1 to-green-1 rounded-lg'>
                  <p className='text-sm font-normal leading-5 text-white'>Hire</p>
                  <Image className='w-2' src={require('../assets/img/vector-arrow.svg')}></Image>
                </a>
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


    </div>
  )
}