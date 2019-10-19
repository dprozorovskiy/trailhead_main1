public class NewCaseListController {
	public List<Case> getNewCases()
    {
        string status = 'New';
         List<Case> results = Database.query( 
            'SELECT Id, CaseNumber ' +
            'FROM Case ' +
             'WHERE Status=:status'
        );
        return results;
    }
}