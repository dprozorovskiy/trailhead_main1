trigger ClosedOpportunityTrigger on Opportunity (after insert,after update) {
List<task> nav=New List<task>();

  for(opportunity opp:trigger.new){
   if(opp.StageName=='closed won'){
    task t=new task(whatid=opp.id,subject='Follow Up Test Task');
    nav.add(t); 
    }
   }
     insert nav;

 }