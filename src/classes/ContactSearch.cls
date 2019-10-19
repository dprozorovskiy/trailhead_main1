public class ContactSearch {
    public static Contact[] searchForContacts(String p1, String p2){
        Contact[] contacts = [SELECT Name
                               FROM Contact
                               WHERE LastName = :p1 AND MailingPostalCode = :p2];
        return contacts;
    }
}