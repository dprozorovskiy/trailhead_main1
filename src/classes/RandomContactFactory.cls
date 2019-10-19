public class RandomContactFactory {
    public static List<Contact> generateRandomContacts(Integer numCon, String lastName) {
        List<Contact> con = new List<Contact>();
        
        for(Integer i=0;i<numCon;i++) {
            Contact c = new Contact(FirstName = 'Test '+i, LastName = lastName );
            con.add(c);
        }
                
        return con;
    }
}