({
    navigateToComponent : function(c, e, h) {
        console.log('recordId2');
        console.log(c.get("v.recordId"));
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef : "c:ReportPage",
            componentAttributes: {
                recordId : c.get("v.recordId")
            }

        });
        evt.fire();
    }
})