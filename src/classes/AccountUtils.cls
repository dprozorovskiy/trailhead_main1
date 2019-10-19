public class AccountUtils {
    public static  List<Account> accountsByState(String stateAbbr){
        List<Account> accountList = new List<Account>([SELECT Id, Name FROM Account where BillingState=:stateAbbr]);
		System.debug(accountList);
        return accountList;
    }
}