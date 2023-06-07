import HelloWorld1 from 0xea60a5af208cf3e1

transaction(myNewGreeting: String) {

  prepare(signer: AuthAccount) {}

  execute {
    HelloWorld1.changeGreeting(newGreeting: myNewGreeting)
  }
}