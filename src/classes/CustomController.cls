public class CustomController {

     public SelectOption[] getListViewOptions() {
        List<SelectOption> options = new List<SelectOption>();
        options.add(new SelectOption('All','All'));
        options.add(new SelectOption('Los Angeles','Los Angeles'));
        options.add(new SelectOption('New York','New York'));
        return options;
    }

    List<Account> acc;
    public String filterId { get; set; }
    public List<Account> getAccounts() {
        String city;
        if(filterId == 'All' || filterID == null)
            acc = [Select Id, Name, BillingCity from Account  LIMIT 20];
        else
            acc = [Select Id, Name, BillingCity from Account Where BillingCity  = : filterId LIMIT 20];
        return acc;
    }
}