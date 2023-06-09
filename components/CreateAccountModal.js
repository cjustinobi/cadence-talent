import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import * as fcl from '@onflow/fcl'
import * as t from '@onflow/types'
import {authorizationFunction} from "../helpers";
// import { createAccount } from '../utils'

const addre = '0xf8d6e0586b0a20c7'

const CreateAccountModal = () => {

  const router = useRouter()

  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [businessName, setBusinessName] = useState('')
  const [service, setService] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')

  const createAccountHandler = async () => {
    setLoading(true)
    const transactionId = await fcl.mutate({
      cadence: `
        import TalentMkt from 0xf8d6e0586b0a20c7

    transaction(_vendorAddress: Address) {

      prepare(acc: AuthAccount) {
      TalentMkt.createVendorAsset()
        // let vendorResource <- acc.load<@TalentMkt.Vendor>(from: /storage/TalentMkt)
        // log(vendorResource?.details)
        // acc.save(<-vendorResource!, to: /storage/TalentMkt)
      }
    }
    `,
      // args: (arg, t) => [],
      args: (arg, t) => [arg(addre, t.Address)],
    })

    console.log("Here is the transactionId: " + transactionId);

    var updateTxStatus = await fcl.tx(transactionId).onceSealed()

    console.log(updateTxStatus)
  }

  const createAccountHandlerx = async () => {
    setLoading(true)


    const transactionId = await fcl.send([
      fcl.transaction`
      import TalentMkt from 0xf8d6e0586b0a20c7 
  
      transaction() {
  
        prepare(acct: AuthAccount) {
          let vendorResource <- acct.load<@TalentMkt.Vendor>(from: /storage/TalentMkt)
          log(vendorResource?.details)
          acct.save(<-vendorResource!, to: /storage/TalentMkt)
        }
  
        execute {
          TalentMkt.createVendorAsset(
          _vendorAddress: "0xf8d6e0586b0a20c7"
          _businessName: businessName,
          _profession: service,
          _filePath: image,
          _description: description,
          _price: price
          )
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

    setShowModal(false)
    setLoading(false)
    await router.push('/')
  }

  useEffect(() => {
    // createAccountHandler()
  }, [])


  return (
    <>
      <button
        className="bg-blue-500 text-white active:bg-blue-500 font-bold px-6 py-2 rounded-[8px]  hover:-lg outline-none focus:outline-none mr-1"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Create Account
      </button>
      {showModal ? (

        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto w-[50%] my-6">
            <div className="border-0 rounded-lg -lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between py-2 pl-5 border-b border-solid border-gray-300 rounded-t ">
                <h3 className="text font-bold">Create Account</h3>
              </div>
              <div className="relative p-6 flex-auto">
                <form className="rounded px-4 pt-4 pb-4 w-full">
                  <label className="block text-black text-sm font-bold my-1">
                    Business Name
                  </label>
                  <input onChange={e => setBusinessName(e.target.value)} className=" appearance-none border rounded w-full py-2 px-1 text-black" />
                  <label className="block text-black text-sm font-bold my-1">
                    Service
                  </label>
                  <input onChange={e => setService(e.target.value)} className=" appearance-none border rounded w-full py-2 px-1 text-black" />
                  <label className="block text-black text-sm font-bold my-1">
                    Service Charge
                  </label>
                  <input onChange={e => setPrice(e.target.value)} type="number" className="appearance-none border rounded w-full py-2 px-1 text-black" />
                  <label className="block text-black text-sm font-bold my-1">
                    Logo
                  </label>
                  <input onChange={e => setImage(e.target.value)} className="appearance-none border rounded w-full py-2 px-1 text-black" />
                  <label className="block text-black text-sm font-bold my-1">
                    Description
                  </label>
                  <input onChange={e => setDescription(e.target.value)} className=" appearance-none border rounded w-full py-2 px-1 text-black" />
                </form>
              </div>
              <div className="flex items-center justify-end pr-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-gray-500 background-transparent font-bold uppercase px-6 py-2  mt-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="text-white bg-blue-500 active:bg-blue-700 font-bold uppercase text-sm px-6 py-2 mt-2 rounded  hover:-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={createAccountHandler}
                >
                  {loading ? 'Submitting ...' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </div>

      ) : null}
    </>
  )
}

export default CreateAccountModal