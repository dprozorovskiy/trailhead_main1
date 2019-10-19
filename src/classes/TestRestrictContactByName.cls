@isTest
private class TestRestrictContactByName {
    @isTest static void TestDeleteAccountWithOneOpportunity() {
        Contact con = new Contact(LastName='INVALIDNAME');
        
        Test.startTest();
        Database.SaveResult result = Database.insert(con);
        Test.stopTest();
   
        System.assert(!result.isSuccess());
        System.assert(result.getErrors().size() > 0);
        System.assertEquals('The Last Name "'+con.LastName+'" is not allowed for DML',
                             result.getErrors()[0].getMessage());
        
    }
    
}