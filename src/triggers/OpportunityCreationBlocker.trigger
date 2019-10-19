/**
 * Created by dmitriyprozorovskiy on 2019-06-18.
 */

trigger OpportunityCreationBlocker on Opportunity (after insert) {
    for (Opportunity opp : Trigger.new) {

        /* SOQL 101 Exception
         Bad implementation
        Account acc = [SELECT Id, CheckboxStatus__c, TextStringStatus__c
                        FROM Account
                        WHERE Id = :opp.AccountId];

         */
        //if (acc.TextStringStatus__c != 'Ok' || acc.CheckboxStatus__c) {
          //  opp.addError('You cannot !!! create an Opportunity from an Account whose TextStringStatus is not "Ok", or whose CheckboxStatus is TRUE');
        //}
    }
}