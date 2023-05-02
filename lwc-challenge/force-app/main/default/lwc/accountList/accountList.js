import { LightningElement, wire } from 'lwc';
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

}