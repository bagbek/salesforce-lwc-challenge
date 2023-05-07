@isTest
private class AccountControllerTest {
    @isTest
    static void testGetAccountList() {
        // Create test data
        List<Account> testAccounts = new List<Account>();
        testAccounts.add(new Account(Name = 'Test Account 1', Industry = 'Test Industry 1', AnnualRevenue = 1000, Phone = '123-456-7890', Website = 'www.test1.com'));
        testAccounts.add(new Account(Name = 'Test Account 2', Industry = 'Test Industry 2', AnnualRevenue = 2000, Phone = '123-456-7891', Website = 'www.test2.com'));
        insert testAccounts;

        // Call the method to be tested
        List<Account> resultAccounts = AccountController.getAccountList();

        // Assert that the result matches the expected values
        Assert.areEqual(testAccounts.size(), resultAccounts.size());
        for (Integer i = 0; i < testAccounts.size(); i++) {
            Account expectedAccount = testAccounts[i];
            Account resultAccount = resultAccounts[i];
            Assert.areEqual(expectedAccount.Name, resultAccount.Name);
            Assert.areEqual(expectedAccount.Industry, resultAccount.Industry);
            Assert.areEqual(expectedAccount.AnnualRevenue, resultAccount.AnnualRevenue);
            Assert.areEqual(expectedAccount.Phone, resultAccount.Phone);
            Assert.areEqual(expectedAccount.Website, resultAccount.Website);
        }
    }


    @isTest
    static void testGetAccountListByQuery() {
        // Test data setup
        List<Account> accounts = new List<Account>();
        accounts.add(new Account(Name = 'Acme Corporation', Industry = 'Manufacturing', AnnualRevenue = 5000000, Phone = '1234567890', Website = 'www.acme.com'));
        accounts.add(new Account(Name = 'XYZ Company', Industry = 'Technology', AnnualRevenue = 10000000, Phone = '9876543210', Website = 'www.xyzcorp.com'));
        insert accounts;
        
        // Test method call
        List<Account> result = AccountController.getAccountListByQuery('Company');
        
        // Verify results
        Assert.areEqual(1, result.size());
        Assert.areEqual('XYZ Company', result[0].Name);
        Assert.areEqual('Technology', result[0].Industry);
        Assert.areEqual(10000000, result[0].AnnualRevenue);
        Assert.areEqual('9876543210', result[0].Phone);
        Assert.areEqual('www.xyzcorp.com', result[0].Website);
    }
    
    @isTest
    static void testGetAccountListByQuery_NoResults() {
        // Test method call with no matching records
        try {
            List<Account> result = AccountController.getAccountListByQuery('FooBar');
            System.assert(false, 'Expected exception not thrown.');
        } catch (QueryException e) {
            System.debug(e.getMessage());
            Assert.areEqual('No Record Found for given name.', e.getMessage());
        }
    }
}