/**
 * Created by Dmitry Prozorovskiy on 2019-06-20.
 */
trigger OpportunityTrigger on Opportunity (before insert) {
    OpportunityTriggerHandler handler = new OpportunityTriggerHandler();

    if (Trigger.isBefore) {
        if (Trigger.isInsert) {
            handler.onBeforeInsert(Trigger.new);
        }
    }
}