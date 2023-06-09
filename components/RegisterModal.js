import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import * as fcl from '@onflow/fcl'
import * as t from '@onflow/types'
import {authorizationFunction} from "../helpers";
// import { createAccount } from '../utils'

const addre = '0xf8d6e0586b0a20c7'

export default function RegisterModal({modal, hideModal}) {

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

  const hideModalHandler = () => {
    hideModal()
  }

  useEffect(() => {
    // createAccountHandler()
  }, [])


  return (
    <section className={`${modal ? '': 'hidden'} Overlay absolute justify-center flex z-[1] top-[0] left-[0] right-[0] bottom-[0] h-[100%] bg-[rgba(15,15,15,0.9)] w-[100%] p-[0] m-0`}>

      <div className="relative top-[2%] md:top-[3%] md:max-w-[610px] lg:top-[4%]  lg:h-[90%] md:h-[95%] h-[96%] bg-black  rounded-[20px]  max-w-[750px] flex justify-center w-[100%] botton-[0%] m- p-[3%] align-center ">
        <div className="justify-center flex w-[100%] h-[100%] bg-[black]  items-center ">
          <div className="main-container grid w-[100%] top-[20%]  max-w-[700px]">
            <h1 className="text-[#fff] justify-center font-clashDisplay text-[30px] font-bold bottom-[100%] relative flex">
              Create Account
            </h1>

            <div className="grid grid-cols-2 gap-[20px]">
              <div className=" item-center justify-between">
                <span className="text-[#fff] font-circularStd md:text-[15px] text-[14px] lg:text-[19px]">
                  Business Name
                </span>{" "}

                <input
                  className="shadow appearance-none border bg-transparent rounded-[7px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="inputField"
                  type="text"
                  placeholder="Type here"
                />
              </div>
              <div className=" item-center justify-between">
                <span className="text-[#fff] font-circularStd md:text-[15px] text-[14px] lg:text-[19px]">
                  Service
                </span>{" "}

                <input
                  className="shadow appearance-none border bg-transparent rounded-[7px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="inputField"
                  type="text"
                  placeholder="Type here"
                />
              </div>
              <div className=" item-center justify-between">
                <span className="text-[#fff] font-circularStd md:text-[15px] text-[14px] lg:text-[19px]">
                  Service Charge
                </span>{" "}
                <br />
                <input
                  className="shadow appearance-none border bg-transparent rounded-[7px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="inputField"
                  type="text"
                  placeholder="Type here"
                />
              </div>
              <div className=" item-center justify-between">
                <span className="text-[#fff] font-circularStd md:text-[15px] text-[14px] lg:text-[19px]">
                  Upload Photo
                </span>{" "}
                <br />
                <button className="w-[100%] rounded-[8px] text-center p-[7px 25px] h-[42px] gap-[20px] justify-center items-center relative bg-transparent border flex">
                  <a
                    href=""
                    className=" border-r-[1px] border-t-[1px] border-b-[1px] relative z-[9] flex bg-[#141414] justify-center h-[41px] rounded-r-[12px] float-right w-[38%] top-[0] left-[32%] right-[0]  items-center text-[#999999] bottom-[0]"
                  >
                    Upload
                  </a>
                </button>
              </div>
            </div>

            <div className="center">
              <div className="top-[17px] relative grid">
                <span className="text-[#fff]  font-circularStd md:text-[15px] text-[14px] lg:text-[19px]">
                  Discription
                </span>
                <textarea
                  className="shadow appearance-none border  bg-transparent rounded-[7px] h-[100%] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your text..."
                  rows={4}
                />
              </div>

              <div className="section flex top-[40px] relative justify-between">
                <button onClick={hideModalHandler} className="w-[35%] border-2 h-[47px] border-none gap-[20px] p-[7px 25px] bg-gradient-to-t from-blue-500 via-teal-600 to-emerald-500 rounded-[8px]  relative justify-center rounded-[8px] text-center items-center  text-[#fff] flex">

                  Cancel


                    {/*<Image*/}
                    {/*  src={require("../pages/assets/img/Vector (20).png")}*/}

                  </button>
                {/*</div>*/}
                <button className="class w-[35%] rounded-[8px] text-center p-[7px 25px] h-[50px] gap-[20px] justify-center bg-gradient-to-t from-blue-500 via-teal-600 to-emerald-500 items-center relative  text-[#fff] flex">
                  Submit
                  {/*<Image src={require("../pages/assets/img/Vector (20).png")} />*/}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}