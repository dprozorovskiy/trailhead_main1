trigger BatchApexErrorTrigger on BatchApexErrorEvent (after insert) {
    
    BatchLeadConvertErrors__c[] batchLeadConvertErrors = new BatchLeadConvertErrors__c[]{};
    
        for(BatchApexErrorEvent a: Trigger.new){
            BatchLeadConvertErrors__c b=new BatchLeadConvertErrors__c();
            b.AsyncApexJobId__c=a.AsyncApexJobId;
            b.Records__c=a.JobScope;
            b.StackTrace__c=a.StackTrace;
            batchLeadConvertErrors.add(b);
        }
    	
    if(batchLeadConvertErrors.size()>0){
        insert batchLeadConvertErrors;
    }
}