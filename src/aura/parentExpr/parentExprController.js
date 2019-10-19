/* parentExprController.js */
/*({
    updateParentAttr: function(cmp, evt) {
        //cmp.set("v.parentAttr", "updated parent attribute");
        
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef : "c:ReportPage",
            componentAttributes: {
                recordId : "a06f400000499hLAAQ"
            }

        });
        evt.fire();
    }
})
*/
({updateParentAttr : function(component, event, helper) {
    var evt = $A.get("e.force:navigateToComponent");
    console.log(evt);
    evt.setParams({
        componentDef : "c:ReportPage",
        componentAttributes: {
            contactName : component.get("v.recordId")
        }
    });
    evt.fire();
}
})