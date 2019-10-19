public class ContactAndLeadSearch {
    public static List<List<sObject>> searchContactsAndLeads(String s1){
       List<List<sObject>> searchList = [FIND :s1 IN ALL Fields
                   RETURNING Lead(FirstName, LastName where FirstName = :s1 or LastName = :s1), Contact(FirstName,LastName), 
                                        Contact(FirstName, LastName where FirstName = :s1 or LastName = :s1)]; 
        
        return searchList;
    }
}