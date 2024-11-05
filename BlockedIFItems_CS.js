/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define(['N/currentRecord', 'N/ui/dialog', 'N/log', 'N/record'], function (currentRecord, dialog, log, record) {

    function pageInit(context) {
        var rec = currentRecord.get();

        // Log to check if the script is triggering
        log.debug({
            title: 'Script Triggered',
            details: 'Page Init function is running'
        });

        // Get the text value of the 'createdfrom' field to check if it's from a Transfer Order
        var createdFromText = rec.getText({ fieldId: 'createdfrom' });

        log.debug({
            title: 'Created From Text',
            details: 'Created From Transaction: ' + createdFromText
        });

        // If the createdfrom field contains 'Transfer Order'
        if (!createdFromText || !createdFromText.includes('Transfer Order')) {
            log.debug({
                title: 'Not a Transfer Order',
                details: 'Exiting script as the source transaction is not a Transfer Order.'
            });
            return; // Exit the script if not from a Transfer Order
        }

        var blockedItems = [];
        var blockedItemIds = [4780, 4779, 4781, 4782, 4783, 4784, 4785, 4786, 4787, 4693, 4788, 4714, 4715, 4716, 4717, 4789,
            4720, 4791, 4795, 4724, 4727, 4797, 4798, 4799, 4800, 4734, 4801, 5774, 4769, 9696, 4775, 4869, 4776, 4680, 4777,
            6575, 4778, 8489, 20883, 4692, 4731, 9698, 5270, 5272, 14428, 11499, 5271, 11704, 4677, 9093, 9594, 9697, 20880,
            16548, 10194, 9694, 9695, 10796, 11096, 20882, 22805, 17256, 22201, 22200];
        var lineCount = rec.getLineCount({ sublistId: 'item' });

        log.debug({
            title: 'Item Line Count',
            details: 'Number of items in the order: ' + lineCount
        });

        // Check for blocked items in the transfer order
        for (var i = 0; i < lineCount; i++) {
            var itemId = rec.getSublistValue({
                sublistId: 'item',
                fieldId: 'item',
                line: i
            });
        
            // Log the item ID being checked
            log.debug({
                title: 'Checking Item',
                details: 'Item ID at line ' + i + ': ' + itemId
            });
        
            // Check if the item is in the blocked items list
            if (blockedItemIds.includes(Number(itemId))) {
                // Dynamically get the item type
                var itemType = rec.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'itemtype',
                    line: i
                });

                if (itemType == 'InvtPart') {
                    var itemRecord = record.load({
                        type: record.Type.INVENTORY_ITEM, 
                        id: itemId
                    });
                } else if (itemType == 'Assembly') {
                    var itemRecord = record.load({
                        type: record.Type.ASSEMBLY_ITEM, 
                        id: itemId
                    });                }
        
                // Log the item type
                log.debug({
                    title: 'Item Type',
                    details: 'Item Type for item ID ' + itemId + ': ' + itemType
                });
        
                var itemName = itemRecord.getValue({ fieldId: 'displayname' }) || itemRecord.getValue({ fieldId: 'itemid' });
        
                blockedItems.push(itemName);
        
                log.debug({
                    title: 'Blocked Item Name',
                    details: 'Blocked item name: ' + itemName
                });
            }
        }

        // If blocked items are found, show a popup on page load
        if (blockedItems.length > 0) {
            var blockedItemList = blockedItems.join(", ");
            dialog.alert({
                title: 'Blocked Items Found',
                message: 'This fulfillment contains blocked items: ' + blockedItemList
            });

            log.debug({
                title: 'Blocked Items Found',
                details: 'Blocked items: ' + blockedItemList
            });
        }
    }

    function saveRecord(context) {
        var rec = currentRecord.get();

        // Get the text value of the 'createdfrom' field
        var createdFromText = rec.getText({ fieldId: 'createdfrom' });

        log.debug({
            title: 'Created From Text in saveRecord',
            details: 'Created From Transaction: ' + createdFromText
        });

        // If the createdfrom field does not contain 'Transfer Order', allow save
        if (!createdFromText || !createdFromText.includes('Transfer Order')) {
            log.debug({
                title: 'Not a Transfer Order',
                details: 'Allowing save as the source transaction is not a Transfer Order.'
            });
            return true;
        }

        var blockedItems = [];
        var blockedItemIds = [4780, 4779, 4781, 4782, 4783, 4784, 4785, 4786, 4787, 4693, 4788, 4714, 4715, 4716, 4717, 4789,
            4720, 4791, 4795, 4724, 4727, 4797, 4798, 4799, 4800, 4734, 4801, 5774, 4769, 9696, 4775, 4869, 4776, 4680, 4777,
            6575, 4778, 8489, 20883, 4692, 4731, 9698, 5270, 5272, 14428, 11499, 5271, 11704, 4677, 9093, 9594, 9697, 20880,
            16548, 10194, 9694, 9695, 10796, 11096, 20882, 22805, 17256, 22201, 22200];
        var lineCount = rec.getLineCount({ sublistId: 'item' });

        log.debug({
            title: 'Item Line Count in saveRecord',
            details: 'Number of items in the order: ' + lineCount
        });

        // Check for blocked items in the transfer order
        for (var i = 0; i < lineCount; i++) {
            var itemId = rec.getSublistValue({
                sublistId: 'item',
                fieldId: 'item',
                line: i
            });
        
            // Log the item ID being checked
            log.debug({
                title: 'Checking Item',
                details: 'Item ID at line ' + i + ': ' + itemId
            });
        
            // Check if the item is in the blocked items list
            if (blockedItemIds.includes(Number(itemId))) {
                // Dynamically get the item type
                var itemType = rec.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'itemtype',
                    line: i
                });

                if (itemType == 'InvtPart') {
                    var itemRecord = record.load({
                        type: record.Type.INVENTORY_ITEM, 
                        id: itemId
                    });
                } else if (itemType == 'Assembly') {
                    var itemRecord = record.load({
                        type: record.Type.ASSEMBLY_ITEM, 
                        id: itemId
                    });                }
        
                // Log the item type
                log.debug({
                    title: 'Item Type',
                    details: 'Item Type for item ID ' + itemId + ': ' + itemType
                });
        
                var itemName = itemRecord.getValue({ fieldId: 'displayname' }) || itemRecord.getValue({ fieldId: 'itemid' });
        
                blockedItems.push(itemName);
        
                log.debug({
                    title: 'Blocked Item Name',
                    details: 'Blocked item name: ' + itemName
                });
            }
        }

        // If there are blocked items, prevent saving the record
        if (blockedItems.length > 0) {
            var blockedItemList = blockedItems.join(", ");
            dialog.alert({
                title: 'Cannot Save',
                message: 'The following items are preventing the fulfillment from being saved: ' + blockedItemList
            });

            log.debug({
                title: 'Blocked Items Preventing Save',
                details: 'Blocked items: ' + blockedItemList
            });
            return false; // Prevent save
        }

        return true; // Allow save if no blocked items are found
    }

    return {
        pageInit: pageInit,
        saveRecord: saveRecord
    };
});
