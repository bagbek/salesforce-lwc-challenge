public with sharing class AccountController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Name, Industry, AnnualRevenue, Phone, Website FROM Account];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountListByQuery(String nameQuery) {
        nameQuery = '%' + nameQuery + '%';
        List<Account> accountList = [SELECT  Name, Industry, AnnualRevenue, Phone, Website FROM Account WHERE Name LIKE :nameQuery];
        
        if(accountList.isEmpty()) {
            throw new QueryException('No Record Found for given name.');
        }
        return accountList; 
    }
}