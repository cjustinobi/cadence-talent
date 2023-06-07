pub fun createVendor(
  businessName: String,
  profession: String,
  filePath: String,
  description: String,
  price: UFix64
) {

  if self.account.storage.vendorExists[msg.sender] {
    panic("Vendor already exists")
  }

  let vendor: @Vendor
  vendor.vendorAddress = <-msg.sender
  vendor.businessName = businessName
  vendor.profession = profession
  vendor.filePath = filePath
  vendor.description = description
  vendor.price = price
  vendor.totalAmount = 0.0
  vendor.transactionCount = 0

  self.account.storage.vendorExists[msg.sender] = true

  self.account.storage.vendors.push(vendor)
  self.account.storage.vendorCount = self.account.storage.vendorCount + 1

  self.addVendorAddress(msg.sender)
}
