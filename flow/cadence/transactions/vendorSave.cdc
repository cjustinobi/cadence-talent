import TalentMkt1 from f8d6e0586b0a20c7

transaction {

    // No need to do anything in prepare because we are not working with
    // account storage.
	prepare(acct: AuthAccount) {
    
        //let talentMarket = acct.borrow<&TalentMkt.TalentMkt>(from: /storage/talentMarket)
            //?? panic("Could not borrow a reference to the TalentMkt contract.")

        let vendorAddress: Address = 0x1234567890
        let businessName = "Example Business"
        let profession = "Example Profession"
        let filePath = "example/file/path"
        let description = "Example description"
        let price: UInt64 = 100
        let totalAmount: UInt64 = 1000
        let transactionCount: UInt64 = 10
        let rating: UInt64 = 5

        let tmkt <- TalentMkt1.createVendorAsset(
        _vendorAddress: vendorAddress,
            _businessName: businessName,
            _profession: profession,
            _filePath: filePath,
            _description: description,
            _price: price,
            _totalAmount: totalAmount,
            _transactionCount: transactionCount,
            _rating: rating)

        acct.save(<-tmkt, to: /storage/TalentMkt)

    
    }

    // In execute, we log a string to confirm that the transaction executed successfully.
	execute {
        log("Saved Hello Resource to account.")
	}
}