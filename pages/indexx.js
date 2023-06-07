import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import * as fcl from '@onflow/fcl'
import { authorizationFunction } from '../helpers'

export default function Home() {

  const [newGreeting, setNewGreeting] = useState('');

	function runTransactionx() {
		console.log('Running transaction!');
		console.log('Changing the greeting to: ' + newGreeting);
	}

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
    console.log('transaction')
    console.log(transaction)

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
    <div className="bg-[#1E1E1E]">
      <div className="container mx-auto bg-[#1E1E1E] p-2">
        <h1 className="text-center text-[48px] font-Circular Std text-white">
          MyTransactions
        </h1>
        <p className=" text-white font-sans text-center text-[20px] font-Circular Std">
          Keep track of all your payments and transactions in one place
        </p>
        <ul className="flex space-x-4 mb-4">
          <li className="">
            <a href="#" className="text-white">
              Tab 1
            </a>
          </li>
          <li className="">
            <a href="#" className="text-[#999999]">
              Tab 2
            </a>
          </li>
          <li className="">
            <a href="#" className="text-[#999999]">
              Tab 3
            </a>
          </li>
        </ul>
        <div className="grid sm:grid-col-1 sm:grid-flow-row gap-4 lg:grid-col-4 lg:grid-flow-col">
          <div className="p-[10px] border-2 border-blue-500 rounded-[16px]">
            <Image
              className="w-full rounded-[12px]"
              src={require('../assets/img/sample.png')}
              alt="myimage"
            />
            <h2 className="text-white font-Circular Std text-[20px]">
              Gconsult Services
            </h2>

            <dev class="block h-[110px]">
              <div className="flex justify-between text-[#999999] ">
                <h3 className="text-[14px] font-Circular Std">Task Cost</h3>
                <h3 className="text-[14px] font-Circular Std">Task Status</h3>
              </div>
              <div className="flex justify-between text-white mb-3">
                <h3 className="text-[14px] font-Circular Std">2.45 CELO</h3>
                <h3 className="text-[14px] font-Circular Std">Ongoing</h3>
              </div>
              <div className="flex justify-between text-[#999999] ">
                <h3 className="text-[14px] font-Circular Std">Created</h3>
                <h3 className="text-[14px] font-Circular Std">Completed</h3>
              </div>
              <div className="flex justify-between text-white ">
                <h3 className="text-[14px] font-Circular Std">12/3/2023</h3>
                <h3 className="text-[14px] font-Circular Std">8/5/2023</h3>
              </div>
            </dev>

            <button className="w-full p-1 rounded text-center items-center justify-items-center bg-red-900 bg-opacity-16 border-2 border-[#B04638] hover:bg-sky-700 text-white font-Circular Std">
              Cancelled
            </button>

          </div>

          <div className="p-[10px] border-2 border-blue-500 rounded-[16px]">
            <Image
              className="w-full rounded-[12px]"
              src={require('../assets/img/sample.png')}
              alt="myimage"
            />
            <h2 className="text-white font-Circular Std text-[20px]">
              Gconsult Services
            </h2>

            <dev class="block h-[110px]">
              <div className="flex justify-between text-[#999999] ">
                <h3 className="text-[14px] font-Circular Std">Task Cost</h3>
                <h3 className="text-[14px] font-Circular Std">Task Status</h3>
              </div>
              <div className="flex justify-between text-white mb-3">
                <h3 className="text-[14px] font-Circular Std">2.45 CELO</h3>
                <h3 className="text-[14px] font-Circular Std">Ongoing</h3>
              </div>
              <div className="flex justify-between text-[#999999] ">
                <h3 className="text-[14px] font-Circular Std">Created</h3>
                <h3 className="text-[14px] font-Circular Std">Completed</h3>
              </div>
              <div className="flex justify-between text-white ">
                <h3 className="text-[14px] font-Circular Std">12/3/2023</h3>
                <h3 className="text-[14px] font-Circular Std">__/__/__</h3>
              </div>
            </dev>

            <div className="box-border justify-between">
              <button className="bg-red-700 p-1 px-4 rounded border-2 border-[#B04638] font-Circular Std text-white">
                Cancel
              </button>
              <button className="bg-green-700 float-right border-2 border-[#38B081] p-1 px-4 rounded font-Circular Std text-white">
                Approve
              </button>
            </div>

          </div>

          <div className="p-[10px] border-2 border-blue-500 rounded-[16px]">
            <Image
              className="w-full rounded-[12px]"
              src={require('../assets/img/sample.png')}
              alt="myimage"
            />
            <h2 className="text-white font-Circular Std text-[20px]">
              Gconsult Services
            </h2>

            <dev class="block h-[110px]">
              <div className="flex justify-between text-[#999999] ">
                <h3 className="text-[14px] font-Circular Std">Task Cost</h3>
                <h3 className="text-[14px] font-Circular Std">Task Status</h3>
              </div>
              <div className="flex justify-between text-white mb-3">
                <h3 className="text-[14px] font-Circular Std">2.45 CELO</h3>
                <h3 className="text-[14px] font-Circular Std">Ongoing</h3>
              </div>
              <div className="flex justify-between text-[#999999]">
                <h3 className="text-[14px] font-Circular Std">Created</h3>
                <h3 className="text-[14px] font-Circular Std">Completed</h3>
              </div>
              <div className="flex justify-between text-white ">
                <h3 className="text-[14px] font-Circular Std">12/3/2023</h3>
                <h3 className="text-[14px] font-Circular Std">8/5/2023</h3>
              </div>
            </dev>

            <button className="w-full p-1 rounded text-center items-center justify-items-center bg-red-900 bg-opacity-16 border-2 border-[#B04638] hover:bg-sky-700 text-white font-Circular Std">
              Cancelled
            </button>

          </div>

          <div className="border-2 border-blue-500 p-3 rounded-[16px]">
            <Image
              className="w-full rounded-[12px]"
              src={require('../assets/img/sample.png')}
              alt="myimage"
            />
            <h2 className="text-white text-[20px] font-Circular Std">
              Gconsult Services
            </h2>
            <div className="flex justify-between text-[#999999] ">
              <h3 className="text-[14px] font-Circular Std">Task Cost</h3>
              <h3 className="text-[14px] font-Circular Std">Task Status</h3>
            </div>
            <div className="flex justify-between text-white mb-3">
              <h3 className="text-[14px] font-Circular Std">2.45 CELO</h3>
              <h3 className="text-[14px] font-Circular Std">Ongoing</h3>
            </div>
            <div className="flex justify-between text-[#999999]">
              <h3 className="text-[14px] font-Circular Std">Created</h3>
              <h3 className="text-[14px] font-Circular Std">Completed</h3>
            </div>
            <div className="flex justify-between text-white ">
              <h3 className="text-[14px] font-Circular Std">12/3/2023</h3>
              <h3 className="text-[14px]">__/__/__</h3>
            </div>
            <div className="box-border mt-3 justify-between">
              <button className="bg-red-700 p-1 px-4 rounded border-2 border-[#B04638] font-Circular Std text-white">
                Cancel
              </button>
              <button className="bg-green-700 float-right border-2 border-[#38B081] p-1 px-4 rounded font-Circular Std text-white">
                Approve
              </button>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-col-1 sm:grid-flow-row gap-4 lg:grid-col-4 lg:grid-flow-col my-3">
          <div className="border-2 border-blue-500 p-3 rounded-[16px]">
            <Image
              className="w-full rounded-[12px]"
              src={require('../assets/img/sample.png')}
              alt="myimage"
            />
            <h2 className="text-white text-[20px] font-Circular Std">
              Gconsult Services
            </h2>
            <div className="flex justify-between text-[#999999] ">
              <h3 className="text-[14px] font-Circular Std">Task Cost</h3>
              <h3 className="text-[14px] font-Circular Std">Task Status</h3>
            </div>
            <div className="flex justify-between text-white mb-3">
              <h3 className="text-[14px] font-Circular Std">2.45 CELO</h3>
              <h3 className="text-[14px] font-Circular Std">Ongoing</h3>
            </div>
            <div className="flex justify-between text-[#999999] ">
              <h3 className="text-[14px] font-Circular Std">Created</h3>
              <h3 className="text-[14px] font-Circular Std">Completed</h3>
            </div>
            <div className="flex justify-between text-white ">
              <h3 className="text-[14px] font-Circular Std">12/3/2023</h3>
              <h3 className="text-[14px]">__/__/__</h3>
            </div>
            <div className="box-border mt-3 justify-between">
              <button className="bg-red-700 p-1 px-4 rounded border-2 border-[#B04638]  font-Circular Std text-white">
                Cancel
              </button>
              <button className="bg-green-700 float-right border-2 border-[#38B081] p-1 px-4 rounded font-Circular Std text-white">
                Approve
              </button>
            </div>
          </div>

          <div className="border-2 border-blue-500 p-3 rounded-[16px]">
            <Image
              className="w-full rounded-[12px]"
              src={require('../assets/img/sample.png')}
              alt="myimage"
            />
            <h2 className="text-white text-[20px] font-Circular Std">
              Gconsult Services
            </h2>
            <div className="flex justify-between text-[#999999] ">
              <h3 className="text-[14px] font-Circular Std">Task Cost</h3>
              <h3 className="text-[14px] font-Circular Std">Task Status</h3>
            </div>
            <div className="flex justify-between text-white mb-3">
              <h3 className="text-[14px] font-Circular Std">2.45 CELO</h3>
              <h3 className="text-[14px] font-Circular Std">Ongoing</h3>
            </div>
            <div className="flex justify-between text-[#999999] ">
              <h3 className="text-[14px] font-Circular Std">Created</h3>
              <h3 className="text-[14px] font-Circular Std">Completed</h3>
            </div>
            <div className="flex justify-between text-white ">
              <h3 className="text-[14px] font-Circular Std">12/3/2023</h3>
              <h3 className="text-[14px] font-Circular Std">8/5/2023</h3>
            </div>
            <button className="w-full p-1 rounded text-center items-center justify-items-center bg-red-900 bg-opacity-16 border-2 border-[#B04638] hover:bg-sky-700 text-white mt-2 font-Circular Std">
              Cancelled
            </button>
          </div>

          <div className="border-2 border-blue-500 p-3 rounded-[16px]">
            <Image
              className="w-full rounded-[12px]"
              src={require('../assets/img/sample.png')}
              alt="myimage"
            />
            <h2 className="text-white text-[20px] font-Circular Std">
              Gconsult Services
            </h2>
            <div className="flex justify-between text-[#999999] ">
              <h3 className="text-[14px] font-Circular Std">Task Cost</h3>
              <h3 className="text-[14px] font-Circular Std">Task Status</h3>
            </div>
            <div className="flex justify-between text-white mb-3">
              <h3 className="text-[14px] font-Circular Std">2.45 CELO</h3>
              <h3 className="text-[14px] font-Circular Std">Ongoing</h3>
            </div>
            <div className="flex justify-between text-[#999999] ">
              <h3 className="text-[14px] font-Circular Std">Created</h3>
              <h3 className="text-[14px] font-Circular Std">Completed</h3>
            </div>
            <div className="flex justify-between text-white ">
              <h3 className="text-[14px] font-Circular Std">12/3/2023</h3>
              <h3 className="text-[14px]">__/__/__</h3>
            </div>
            <div className="box-border mt-3 justify-between">
              <button className="bg-red-700 p-1 px-4 rounded border-2 border-[#B04638] font-Circular Std text-white">
                Cancel
              </button>
              <button className="bg-green-700 float-right border-2 border-[#38B081] p-1 px-4 rounded font-Circular Std text-white">
                Approve
              </button>
            </div>
          </div>

          <div className="border-2 border-blue-500 p-3 rounded-[16px]">
            <Image
              className="w-full rounded-[12px]"
              src={require('../assets/img/sample.png')}
              alt="myimage"
            />
            <h2 className="text-white text-[20px] font-Circular Std">
              Gconsult Services
            </h2>
            <div className="flex justify-between text-[#999999] ">
              <h3 className="text-[14px] font-Circular Std">Task Cost</h3>
              <h3 className="text-[14px] font-Circular Std">Task Status</h3>
            </div>
            <div className="flex justify-between text-white mb-3">
              <h3 className="text-[14px] font-Circular Std">2.45 CELO</h3>
              <h3 className="text-[14px] font-Circular Std">Ongoing</h3>
            </div>
            <div className="flex justify-between text-[#999999] ">
              <h3 className="text-[14px] font-Circular Std">Created</h3>
              <h3 className="text-[14px] font-Circular Std">Completed</h3>
            </div>
            <div className="flex justify-between text-white ">
              <h3 className="text-[14px] font-Circular Std">12/3/2023</h3>
              <h3 className="text-[14px] font-Circular Std">8/5/2023</h3>
            </div>
            <button class="w-full p-1 rounded text-center items-center justify-items-center bg-red-900 bg-opacity-16 border-2 border-[#B04638] hover:bg-sky-700 text-white mt-2 font-Circular Std">
              Cancelled
            </button>
          </div>

        </div>
        <div className='flex justify-end text-white space-x-2'>
          <h1>1</h1>
          <h1>2</h1>
          <h1>3</h1>
          <h1>...</h1>
          <h1>10</h1>
        </div>
      </div>
    </div>
  )
}