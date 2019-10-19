/**
 * Created by Dmitry Prozorovskiy on 2019-06-20.
 */
public without sharing class OpportunityTriggerHandler {
    private static final String ACCOUNT_STATUS = 'OK';
    private static final String ERR_MSG = 'You cannot create an Opportunity from an Account whose TextStringStatus is not "Ok", or whose CheckboxStatus is TRUE';
    
	public void onBeforeInsert(List<Opportunity> recs) {
       validateUpdates(recs);
    }
    
    private void validateUpdates(List<Opportunity> recs) {
        Set<Id> accountIdList = new Set<Id>();
        Map<Id, Account> accountMap = new Map<Id, Account>();
        
        for(Opportunity opp : recs) {
        	accountIdList.add(opp.AccountId);
        }
        
        for(Account acc : [
                SELECT Id, CheckboxStatus__c, TextStringStatus__c
                FROM Account
                WHERE Id IN:accountIdList]) {
            accountMap.put(acc.Id, acc);
        }
        
        for (Opportunity oppty : recs) {
            Account acc = accountMap.get(oppty.AccountId);

            if(accountMap.containsKey(oppty.AccountId) && 
               (acc.TextStringStatus__c != ACCOUNT_STATUS || acc.CheckboxStatus__c))
            {
                oppty.addError(ERR_MSG);
            }
    	}
    }
}