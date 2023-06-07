pub contract TalentMkt1 {

    //pub var vendors: [Address]
    pub var vendors: @{Address: Vendor}
    //pub var transactions: {Address: Transaction}

	pub var vendorCount: Int

	pub enum Status: UInt {
		pub case Cancelled
		pub case InProgress
		pub case Reviewing
		pub case Completed
	}

    pub struct VendorDetails {
        pub let vendorAddress: Address
        pub let businessName: String
        pub let profession: String
        pub let filePath: String
        pub let description: String
        pub let price: UInt64
        pub let totalAmount: UInt64
        pub let transactionCount: UInt64
        pub let rating: UInt64
    

        init(address: Address, businessName: String, profession: String, filePath: String, description: String, price: UInt64, totalAmount: UInt64, transactionCount: UInt64, rating: UInt64) {
            self.vendorAddress = address
            self.businessName = businessName
            self.profession = profession
            self.filePath = filePath
            self.description = description
            self.price = price
            self.totalAmount = totalAmount
            self.transactionCount = transactionCount
            self.rating = rating
        }
    }

    pub struct Transaction {
        pub let vendorIndex: UInt64
        pub let vendor: Address
        pub let customer: Address 
        pub let amount: UInt64
        pub let status: Status
        pub let dateCreated: UFix64
        pub let dateCompleted: UFix64
        pub let dateReviewing: UFix64
    

        init(vendorIndex: UInt64, vendor: Address, customer: Address, amount: UInt64, status: Status, dateCreated: UFix64, dateCompleted: UFix64, dateReviewing: UFix64) {
            self.vendorIndex = vendorIndex
            self.vendor = vendor
            self.customer = customer
            self.amount = amount
            self.status = status
            self.dateCreated = dateCreated
            self.dateCompleted = dateCompleted
            self.dateReviewing = dateReviewing
        }
    }

    pub resource Customer {
        pub let txs: [Transaction]

        access(contract) fun createTransaction(_vendorIndex: UInt64, _vendor: Address, _customer: Address, _amount: UInt64, _status: Status, _dateCreated: UFix64, _dateCompleted: UFix64, _dateReviewing: UFix64) {
            self.txs.append(Transaction(vendorIndex: _vendorIndex, vendor: _vendor, customer: _customer, amount: _amount, status: _status, dateCreated: _dateCreated, dateCompleted: _dateCompleted, dateReviewing: _dateReviewing))
        }

        init(_vendorIndex: UInt64, _vendor: Address, _customer: Address, _amount: UInt64, _status: Status, _dateCreated: UFix64, _dateCompleted: UFix64, _dateReviewing: UFix64) {
        //init(_vendorIndex: UInt64, _vendor: Address, _customer: Address, _amount: UInt64, _status: Status, _dateCreated: UFix64, _dateCompleted: UFix64, _dateReviewing: UFix64) {
            self.txs = []
        }
        
    }

    pub resource Vendor {
        pub let details: VendorDetails

        init(_vendorAddress: Address, _businessName: String, _profession: String, _filePath: String, _description: String, _price: UInt64, _totalAmount: UInt64, _transactionCount: UInt64, _rating: UInt64) {
            self.details = VendorDetails(address: _vendorAddress, businessName: _businessName, profession: _profession, filePath: _filePath, description: _description, price: _price, totalAmount: _totalAmount, transactionCount: _transactionCount, rating: _rating)
        }
    }

    pub fun createVendorAsset(_vendorAddress: Address, _businessName: String, _profession: String, _filePath: String, _description: String, _price: UInt64, _totalAmount: UInt64, _transactionCount: UInt64, _rating: UInt64): @Vendor {
        self.vendorCount = self.vendorCount + 1
        
        return  <- create Vendor(_vendorAddress: _vendorAddress, _businessName: _businessName, _profession: _profession, _filePath: _filePath, _description: _description, _price: _price, _totalAmount: _totalAmount, _transactionCount: _transactionCount, _rating: _rating)
        //self.vendors[_vendorAddress] <-! vendor
       
    }

    pub fun getVendor(vendorAddress: Address): &Vendor? {
        return &self.vendors[vendorAddress] as &Vendor?
    }

    pub fun getVendors(): [&Vendor] {
        let answer: [&Vendor] = []
        for vendorAddress in self.vendors.keys {
            answer.append(self.getVendor(vendorAddress: vendorAddress)!)
        }
        return answer
    }


    init() {
        self.vendors <- {}
        self.vendorCount = 1
    }
}