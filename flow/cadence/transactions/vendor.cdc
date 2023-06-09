import TalentMkt from f8d6e0586b0a20c7

// This transaction calls the "hello" method on the HelloAsset object
// that is stored in the account's storage by removing that object
// from storage, calling the method, and then putting it back in storage

transaction {

    prepare(acct: AuthAccount) {

        // Load the resource from storage, specifying the type to load it as
        // and the path where it is stored
        let vendorResource <- acct.load<@TalentMkt.Vendor>(from: /storage/TalentMkt)

        // We use optional chaining (?) because the value in storage
        // may or may not exist, and thus is considered optional.
        log(vendorResource?.details)

        // Put the resource back in storage at the same spot
        // We use the force-unwrap operator `!` to get the value
        // out of the optional. It aborts if the optional is nil
        acct.save(<-vendorResource!, to: /storage/TalentMkt)
    }
}