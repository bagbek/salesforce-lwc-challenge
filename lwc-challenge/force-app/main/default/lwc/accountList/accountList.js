import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccountList';

import ACCOUNT_OBJECT from '@salesforce/schema/Account';

import NAME from '@salesforce/schema/Account.Name';
import INDUSTRY from '@salesforce/schema/Account.Industry';
import ANNUAL_REVENUE from '@salesforce/schema/Account.AnnualRevenue';
import PHONE from '@salesforce/schema/Account.Phone';
import WEBSITE from '@salesforce/schema/Account.Website';

const COLUMNS = [
    { label: 'Name', fieldName: NAME.fieldApiName, type: 'text', sortable: "true" },
    { label: 'Industry', fieldName: INDUSTRY.fieldApiName, type: 'text', sortable: "true" },
    { label: 'Annual Revenue', fieldName: ANNUAL_REVENUE.fieldApiName, type: 'currency', sortable: "true" },
    { label: 'Phone', fieldName: PHONE.fieldApiName, type: 'text', sortable: "true" },
    { label: 'Website', fieldName: WEBSITE.fieldApiName, type: 'text', sortable: "true" }
];


export default class AccountList extends LightningElement {

    @track data;
    @track columns = COLUMNS;
    @track sortBy;
    @track sortDirection;

    //#region Getting the Data 

  

    @wire(getAccounts)
    accounts(result) {
        if (result.data) {
            this.error = undefined;
            this.data = result.data;
        } else if (result.error) {
            this.error = result.error;
            this.data = undefined;
        }
    }

    //#endregion

}