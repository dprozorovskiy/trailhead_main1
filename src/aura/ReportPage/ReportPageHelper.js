({
    // Run on the component load and get the wrapper data for init.
    doInit_Helper : function(c, e, h){
        console.log(Math.random());
        h.showSpinner_Helper(c);
        console.log(2);
        window.setTimeout(
            $A.getCallback(function () {
            var clientWidth = c.find('ReportContainer').getElement().clientWidth
            if(clientWidth !== undefined && clientWidth < 600){
                c.set('v.dontShow', true);
                h.showToast_Helper(c, 'info', 'This report is not optimized for mobile yet, use desktop version to view complete report.');
            }
            }), 1000
        );
        console.log(3);
        var recId = c.get("v.recordId");
        console.log(4);
        if(recId !== undefined){console.log(5);
            try{
                var action =  c.get("c.getCampaignOverviewOnPageLoad_Apex");
                action.setParams({
                    "campaignOverviewId" : recId
                });
                action.setCallback(this, function (response) {
                    if(response.getState() == "SUCCESS"){
                        var storedResponse = (response.getReturnValue());
                        console.log(storedResponse);
                        if(storedResponse.messageWrapper.isError === false){
                            c.set('v.campaignOverviewHeader', storedResponse.COR_Header);
                            c.set('v.campaignFields', storedResponse.campaignFields);
                            c.set('v.domainCurrencyFields', storedResponse.domainCurrencyFields);

                            if(storedResponse.reportConfigurationList !== undefined && storedResponse.reportConfigurationList.length > 0){
                                c.set('v.isReportConfig', true);
                                c.set('v.reportConfigurationList', storedResponse.reportConfigurationList);
                            }else {
                                c.set('v.isReportConfig', true);
                                h.showToast_Helper(c, 'error', 'No configuration record found.');
                            }
                            var configObj = c.get('v.reportConfigurationObj');
                            configObj.Start_Date__c = storedResponse.COR_Header.StartDate;
                            configObj.End_Date__c = storedResponse.COR_Header.EndDate;
                            configObj.Monthly_Timeline__c = false;
                            configObj.Weekly_Timeline__c = true;
                            configObj.Campaign_Filter_1__c = 'product_brand__c';
                            configObj.Campaign_Filter_2__c = 'sub_brand__c';
                            configObj.Domain_Service_Filter__c = 'gross_total__c';
                            configObj.Timeline_Campaign_Filter_1__c = 'name';
                            c.set('v.reportConfigurationObj', configObj);
                            h.hideSpinner_Helper(c);
                        }else {
                            h.showToast_Helper(c, storedResponse.messageWrapper.variant, storedResponse.messageWrapper.message);
                        }

                    }else{
                        h.showToast_Helper(c, 'error', 'Unable to view report.');
                    }
                });
                $A.enqueueAction(action);
            } catch(ex) {
                console.log('Error: '+ex);
            }
        }else {
            h.showToast_Helper(c, 'error', 'Campaign Overview ID not found!');
        }


    },

    // showing toast when any messsaged has been arrived.
    showToast_Helper : function(c, variant, message) {
        c.find('notifLib').showToast({
            "variant": variant,
            "message": message
        });
    },

    // Open report config popup
    configPopup_Helper : function(c, e, h){
        c.set('v.configPopup', true);
    },

    // cloased report config popup
    closeConfigPopup_Helper : function(c, e, h){
        c.set('v.configPopup', false);
    },

    // get back to the camapign overvieew record.
    backtoRecord_Helper : function(c, e, h){
        try{
            window.history.back();
        }catch(ex) {
            h.showToast_Helper(c, 'error', ex);
        }
    },

    // Save report confige on clickling on save button.
    saveConfig_Helper : function(c, e, h){
        h.showSpinner_Helper(c);
        var reportConfigeSave = c.get('v.reportConfigurationObj');
        var compaignOverviewId = c.get('v.recordId');
        console.log(JSON.stringify(reportConfigeSave));
        if(compaignOverviewId !== undefined){
            if(reportConfigeSave.Name !== undefined){
                if(reportConfigeSave.Name !== null){
                    if(JSON.stringify(reportConfigeSave.Name).length > 0){
                        if(reportConfigeSave.Campaign_Filter_1__c !== ''){
                            if(reportConfigeSave.Campaign_Filter_2__c !== ''){
                                if(reportConfigeSave.Domain_Service_Filter__c !== ''){
                                    if(reportConfigeSave.End_Date__c !== null){
                                        if(reportConfigeSave.Start_Date__c	 !== null){
                                            try{
                                                var action =  c.get("c.saveCustomConfigure_Apex");
                                                action.setParams({
                                                    "campaignOverviewId" : compaignOverviewId,
                                                    "configObj" : JSON.stringify(reportConfigeSave)
                                                });
                                                action.setCallback(this, function (response) {
                                                    if(response.getState() == "SUCCESS"){
                                                        var storedResponse = (response.getReturnValue());
                                                        //console.log(storedResponse);
                                                        //h.hideSpinner_Helper(c);
                                                        if(storedResponse !== null){
                                                            c.set('v.savedReportConfiguration',storedResponse);
                                                            c.set('v.configPopup',false);
                                                            var configObj = c.get('v.reportConfigurationObj');
                                                            configObj.Monthly_Timeline__c = false;
                                                            configObj.Weekly_Timeline__c = true;
                                                            configObj.Campaign_Filter_1__c = 'brand__c';
                                                            configObj.Campaign_Filter_2__c = 'sub_brand__c';
                                                            configObj.Domain_Service_Filter__c = 'gross_total__c';
                                                            configObj.Timeline_Campaign_Filter_1__c = '';
                                                            configObj.Timeline_Campaign_Filter_2__c = '';
                                                            configObj.Timeline_Campaign_Filter_3__c = '';
                                                            configObj.Timeline_Campaign_Label_1__c = false;
                                                            configObj.Timeline_Campaign_Label_2__c = false;
                                                            configObj.Timeline_Campaign_Label_3__c = false;
                                                            configObj.Name = null;
                                                            c.set('v.reportConfigurationObj', configObj);
                                                            //h.getAllConfigList_Helper(c, e, h);
                                                            h.showToast_Helper(c, 'success', 'Configuration successfully saved.');
                                                            h.viewReport_Helper(c, e, h);
                                                        }else {
                                                            h.showToast_Helper(c, 'error', 'Saving the record was not successful..');
                                                        }

                                                    }else{
                                                        h.showToast_Helper(c, 'error', 'Something mishappens to saving record.');
                                                        console.log("Unable to view report.");
                                                    }
                                                });
                                                $A.enqueueAction(action);
                                            } catch(ex) {
                                                console.log('Error: '+ex);
                                                h.hideSpinner_Helper(c);
                                            }
                                        }else {
                                            $A.util.addClass(c.find('StardDate'), 'slds-has-error');
                                            h.showToast_Helper(c, 'error', 'Please fill mandatory field.');
                                            h.hideSpinner_Helper(c);
                                        }
                                    }else {
                                        $A.util.addClass(c.find('EndDate'), 'slds-has-error');
                                        h.showToast_Helper(c, 'error', 'Please fill mandatory field.');
                                        h.hideSpinner_Helper(c);
                                    }
                                } else {
                                    $A.util.addClass(c.find('DomainServiceFilter'), 'slds-has-error');
                                    h.showToast_Helper(c, 'error', 'Please fill mandatory field.');
                                    h.hideSpinner_Helper(c);
                                }
                            }else {
                                $A.util.addClass(c.find('CampaignFilter2'), 'slds-has-error');
                                h.showToast_Helper(c, 'error', 'Please fill mandatory field.');
                                h.hideSpinner_Helper(c);
                            }
                        }else {
                            $A.util.addClass(c.find('CampaignFilter1'), 'slds-has-error');
                            h.showToast_Helper(c, 'error', 'Please fill mandatory field.');
                        }    h.hideSpinner_Helper(c);
                    }else {
                        $A.util.addClass(c.find('configName'), 'slds-has-error');
                        h.showToast_Helper(c, 'error', 'Please fill mandatory field.');
                        h.hideSpinner_Helper(c);
                    }
                }else {
                    $A.util.addClass(c.find('configName'), 'slds-has-error');
                    h.showToast_Helper(c, 'error', 'Please fill mandatory field.');
                    h.hideSpinner_Helper(c);
                }
            }else {
                $A.util.addClass(c.find('configName'), 'slds-has-error');
                h.showToast_Helper(c, 'error', 'Please fill mandatory field.');
                h.hideSpinner_Helper(c);
            }
         } else {
             h.showToast_Helper(c, 'error', 'Compaign Overview Id not found.');
             h.hideSpinner_Helper(c);
         }

    },

    // Set the value on clicking radion button (Weekly or monthly).
    handleRadioClick_Helper : function(c, e, h){
        var label = e.getSource().get('v.label');
        if(label === 'Weekly'){
            c.set('v.reportConfigurationObj.Weekly_Timeline__c', true);
            c.set('v.reportConfigurationObj.Monthly_Timeline__c', false);
        }else if(label === 'Monthly'){
            c.set('v.reportConfigurationObj.Monthly_Timeline__c', true);
            c.set('v.reportConfigurationObj.Weekly_Timeline__c', false);
        }
    },

    // when select report config it put the object for manage report
    selectedReportConfig_Helper : function(c, e, h){
        var configList = c.get('v.reportConfigurationList');
        var selectedId = e.getSource().get('v.value');
        //console.log('selectedId>>> '+selectedId);
        if(configList !== undefined && selectedId !== undefined){
            configList.forEach(function(elem){
                if(elem.Id === selectedId){
                    c.set('v.savedReportConfiguration', elem);
                }
            });
        }
    },

    // to showing filetrd list on clicking filterlist icon
    showFilterList_Helper : function(c, e, h){
        if(c.get('v.isSelectedConfig') === true){
            h.showSpinner_Helper(c);
            c.set('v.isSelectedConfig', false);
            c.set('v.isReportConfig', true);
            h.getAllConfigList_Helper(c, e, h);
        }

    },

    // to get all the configurlist
    getAllConfigList_Helper : function(c, e, h){
        try{
            var action =  c.get("c.getCustomConfigure_Apex");
            action.setParams({
                "campaignOverviewId" : c.get('v.recordId')

            });
            action.setCallback(this, function (response) {
                if(response.getState() == "SUCCESS"){
                    var storedResponse = (response.getReturnValue());
                    //console.log(storedResponse);
                    if(storedResponse !== undefined && storedResponse.length > 0){
                        c.set('v.reportConfigurationList', storedResponse);
                    }else {
                        h.showToast_Helper(c, 'error', 'No configuration record found!');
                    }
                    h.hideSpinner_Helper(c);
                }else{
                    h.showToast_Helper(c, 'error', 'Unable to fetch report configuration');
                    console.log("Something misshapen");
                }
            });
            $A.enqueueAction(action);
        } catch(ex) {
            console.log('Error: '+ex);
        }
    },

    // To Showing report page with the calculated wrapper data.
    showReport_Helper : function(c, e, h){
        if(c.get('v.isReportConfig') === true && c.get('v.savedReportConfiguration') !== undefined){
            c.set('v.isSelectedConfig', true);
            c.set('v.isReportConfig', false);
        }
    },

    // To Showing report page with the calculated wrapper data.
    viewReport_Helper : function(c, e, h){
        h.showSpinner_Helper(c);
        c.set('v.isSelectedConfig', true);
        c.set('v.isReportConfig', false);
        var reportConfig = c.get('v.savedReportConfiguration');
        //console.log(reportConfig);
        try{
        	var action =  c.get("c.getCampaignOverviewViewReport_Apex");
        	action.setParams({
        		"campaignOverviewId" : c.get('v.recordId'),
        		"reportConfig" : JSON.stringify(reportConfig)

        	});
        	action.setCallback(this, function (response) {
        		if(response.getState() == "SUCCESS"){
        			var storedResponse = (response.getReturnValue());
        			console.log(storedResponse);

        			if(storedResponse !== null){
        			    if(storedResponse.messageWrapper.isError === true){
                            h.showToast_Helper(c, storedResponse.messageWrapper.variant, storedResponse.messageWrapper.message);
                        }
                        if(storedResponse.campaignRecordList !== undefined && storedResponse.campaignRecordList.length > 0){
                            c.set('v.timelineFilterDiv', storedResponse.campaignRecordList);
                        }
        			    c.set('v.CampaignDateTimeline', storedResponse);
        			    c.set('v.TimelineHeader', storedResponse.timelineHeader);
        			    c.set('v.timelineRecords', storedResponse.timelineRecords);
        			    if(reportConfig.Weekly_Timeline__c){
                            c.set('v.isWeekly', true);
                        }else if(reportConfig.Monthly_Timeline__c){
                            c.set('v.isWeekly', false);
                        }
                        window.setTimeout(
                        	$A.getCallback(function () {
                        	    var timelineWidth = c.find('ReportContainer').getElement().clientWidth;
                        	    var timelineHeight = c.find('ReportContainer').getElement().clientHeight;
                        	    var filterHeight = document.getElementById("CampaignFilterTableId").offsetHeight;

                        		if(timelineWidth !== undefined && timelineHeight !== undefined){
                        		    c.set('v.timelineWidth', timelineWidth - 470);
                        		    c.set('v.timelineHeight', timelineHeight);
                                }
                                if(filterHeight !== undefined && timelineHeight !== undefined){
                                    if(filterHeight > timelineHeight){
                                        filterHeight+=15;
                                        c.set('v.timelineHeight', (filterHeight + 'px'));
                                    }else {
                                        c.set('v.timelineHeight', undefined);
                                    }

                                }
                        	}), 2000
                        );
                        h.hideSpinner_Helper(c);
                    }
        		}else{
        			console.log("Something misshapen");
        		}
        	});
        	$A.enqueueAction(action);
        } catch(ex) {
        	console.log('Error: '+ex);
        }
    },

    //Showing spinner When this method is called
    showSpinner_Helper : function(c){
        c.set('v.showSpinner', true);
        window.setTimeout(
        	$A.getCallback(function () {
        		c.set('v.showSpinner', false);
        	}), 10000
        );

    },

    // hide spinner when this method is called
    hideSpinner_Helper : function(c){
        c.set('v.showSpinner', false);
    },

    // Show tooltip over on the camapign header
    showTooltip_Helper : function(c, e, h){
        var timelineRecords = c.get("v.timelineRecords");
        var campaignId = e.currentTarget.id;
        var campaignPopupObj = {};
        for(var i = 0; i < timelineRecords.length; i++) {
            var obj = timelineRecords[i];
            if(campaignId === obj.CampaignId) {
                campaignPopupObj = obj;
            }
        }
        c.set("v.campaignPopupObj", campaignPopupObj);
        //console.log('showTooltip');
//        $A.util.removeClass(c.find('tooltip'), 'slds-hide');
        var eventData = e;
        //console.log(eventData);
        var clientX = eventData.clientX;
        var clientY = eventData.clientY;
        //console.log('clientX: ' + clientX);
        //console.log('clientY: ' + clientY);
        c.set("v.tooltipTop", clientY-25-c.find('tooltip').getElement().clientHeight);
        c.set("v.tooltipLeft", clientX - (c.find('tooltip').getElement().clientWidth)/2);
    },

    // hide tooltip over on the camapign header
    hideTooltip_Helper : function(c, e, h){
        console.log('hideTooltip');
//        $A.util.addClass(c.find('tooltip'), 'slds-hide');
        c.set("v.tooltipTop", '-99999');
        c.set("v.tooltipLeft", '-99999');
    },

    // Show tooltip over on the domain rows
    showDomainTooltip_Helper : function(c, e, h){
        var timelineRecords = c.get("v.timelineRecords");
        var campaignId = e.currentTarget.id;
        var domainId = e.currentTarget.accessKey;
        var childDomainObj = {};
        if(timelineRecords !== undefined){
            for(var i = 0; i < timelineRecords.length; i++) {
                var obj = timelineRecords[i];
                if(campaignId === obj.CampaignId) {
                    if(obj.childDomainFilters !== undefined && obj.childDomainFilters.length > 0){
                        obj.childDomainFilters.forEach(function(elem){
                            if(elem.domainId === domainId){
                                childDomainObj = elem.DomainRecord;
                            }
                        });
                    }
                }
            }
        }
        c.set("v.domainPopupObj", childDomainObj);
        var eventData = e;
        var clientX = eventData.clientX;
        var clientY = eventData.clientY;
        c.set("v.tooltipDomainTop", clientY-25-c.find('tooltipForDomain').getElement().clientHeight);
        c.set("v.tooltipDomainLeft", clientX - (c.find('tooltipForDomain').getElement().clientWidth)/2);
    },

    // hide tooltip over on the domain rows
    hideDomainTooltip_Helper : function(c, e, h){
        c.set("v.tooltipDomainTop", '-99999');
        c.set("v.tooltipDomainLeft", '-99999');
    },
    // To rename the report config name
    editConfigName_Helper : function(c, e, h){
        c.set("v.isEdit", true);
    },
    // To rename the report config name
    saveConfigName_Helper : function(c, e, h){
        h.showSpinner_Helper(c);
        c.set("v.isEdit", false);
        try{
        	var action =  c.get("c.updateCustomConfigureName_Apex");
        	action.setParams({
        		"configObj" : JSON.stringify(c.get('v.savedReportConfiguration'))
        	});
        	action.setCallback(this, function (response) {
        		if(response.getState() == "SUCCESS"){
        			var storedResponse = (response.getReturnValue());
        			if(storedResponse !== null){
        			    console.log(storedResponse);
                        h.showToast_Helper(c, 'success', 'Configuration name succesfully updated!');
                    }else {
                        h.showToast_Helper(c, 'error', 'Unable to update configuration name.');
                        console.log("Something misshappens");
                    }
        		}else{
        		    h.showToast_Helper(c, 'error', 'Unable to update configuration name.');
        			console.log("Something misshappens");
        		}
        	});
        	$A.enqueueAction(action);
        } catch(ex) {
            h.showToast_Helper(c, 'error', 'Unable to update configuration name.');
        	console.log('Error: '+ex);
        }
        h.hideSpinner_Helper(c);
    },



})