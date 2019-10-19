({
NavigatetoC2 : function(component, event, helper) {
var evt = $A.get("e.force:navigateToComponent");
evt.setParams({
componentDef : "c:MyComponent2",
componentAttributes: {
 
}
});
evt.fire();
},
    showToast : function(component, event, helper) {
    var toastEvent = $A.get("e.force:showToast");
    toastEvent.setParams({
        "title": "Success!",
        "message": "The record has been updated successfully."
    });
    toastEvent.fire();
}
})