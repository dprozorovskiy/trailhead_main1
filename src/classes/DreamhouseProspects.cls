public with sharing class DreamhouseProspects {
    public String sortOrder {set; get;}
    public Boolean getIsClassic() {
        return (UserInfo.getUiThemeDisplayed() == 'Theme3');
    }
    public List<Lead> getLeads() {
        if (sortOrder == null) {
            sortOrder = 'LastName';
        }        
        return Database.query('SELECT Description,Email,FirstName,Id,LastName,Phone FROM Lead ORDER BY '+sortOrder);
    }
    public pageReference sortList() {
        getLeads();
        return null;
    }
}