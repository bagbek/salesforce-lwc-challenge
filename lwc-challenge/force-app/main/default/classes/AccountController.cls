public with sharing class AccountController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Name, Industry, AnnualRevenue, Phone, Website FROM Account];
    }
}