# NetSuite-Blocked-IF-Items

This SuiteScript Client Script is designed to run on the page of a Fulfillment record in NetSuite. It checks if the fulfillment is associated with a Transfer Order and identifies any blocked items that may prevent the fulfillment from being processed. The script provides alerts to inform users about blocked items both on page initialization and when attempting to save the record.

## Features

- **Page Initialization Check**: When the page is loaded, the script verifies whether the fulfillment is linked to a Transfer Order. If it is not, the script exits without further action.
- **Blocked Item Identification**: The script checks the items in the fulfillment against a predefined list of blocked item IDs. If any blocked items are found, their names are displayed in a dialog alert.
- **Save Record Validation**: During the save process, the script performs the same checks for blocked items. If any are present, the script prevents the record from being saved and alerts the user.

## Script Overview

### Dependencies

- `N/currentRecord`: Used to get the current record details.
- `N/ui/dialog`: Provides methods to display dialog alerts.
- `N/log`: Logs debugging information for troubleshooting.
- `N/record`: Facilitates loading item records for checking item details.

### Functions

- **pageInit(context)**: This function is triggered when the page is initialized. It logs the entry, checks if the fulfillment is from a Transfer Order, and identifies any blocked items to display in an alert.

- **saveRecord(context)**: This function is executed when the user attempts to save the record. It checks for blocked items and prevents the save if any are found, displaying a relevant alert.

## How to Use

1. **Deploy the Script**: In NetSuite, create a new Client Script record and paste this code into the script field. Deploy it to the Fulfillment record type.
2. **Configure Blocked Items**: Update the `blockedItemIds` array with the IDs of items that should not be included in the fulfillment.
3. **Test the Functionality**: Create a Fulfillment linked to a Transfer Order with various items to test if the alerts work as expected.

## Logging

The script includes debug logging to track its execution and any blocked items identified. You can view logs in the NetSuite script execution logs for further analysis.

## Notes

- Ensure that the item types (Inventory or Assembly) are correctly recognized in your NetSuite environment to avoid potential issues with blocked item identification.
- Modify the blocked items list as needed to suit your business requirements.

## License

This script is provided as-is without any warranty. Use it at your own risk.
