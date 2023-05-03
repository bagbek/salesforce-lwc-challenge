import { LightningElement, wire, track } from 'lwc';

import getAccounts from '@salesforce/apex/AccountController.getAccountList';
import getAccountListByQuery from '@salesforce/apex/AccountController.getAccountListByQuery';

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

allAccounts;

@wire(getAccounts)
accounts(result) {
    if (result.data) {
        this.error = undefined;
        this.totalAccounts = result.data.length;
        this.allAccounts = result.data;
        this.data = this.allAccounts.slice(0, this.pageSize);
    } else if (result.error) {
        this.error = result.error;
        this.data = undefined;
        this.totalAccounts = 0;
    }
}

//#endregion

//#region Sorting 
    
    // Function to sort accountlist based on the column header
    doSorting(event) {
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        this.sortData(this.sortBy, this.sortDirection);
    }

    // Helper function to sort data based on the column header
    sortData(fieldname, direction) {
        let parseData = JSON.parse(JSON.stringify(this.data));
        let keyValue = a => a[fieldname];
        let isReverse = direction === 'asc' ? 1 : -1;
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; 
            y = keyValue(y) ? keyValue(y) : '';
            return isReverse * ((x > y) - (y > x));
        });
        this.data = parseData;
    }   

//#endregion

//#region Searching 

nameQuery;
handleNameQuery(event){
    this.nameQuery = event.target.value;
}

// Function to fetch Accounts based on entered name query
searchAccountHandler() {
    getAccountListByQuery({nameQuery: this.nameQuery})
    .then(result => {
        this.totalAccounts = result.length;
        this.allAccounts = result;
        this.data = this.allAccounts.slice(0, this.pageSize);
    })
    .catch(error => this.data = null);
}

//#endregion

//#region Pagination 

totalAccounts = 0;
pageSize = 5;
handlePagination(event){
    const start = (event.detail - 1) * this.pageSize;
    const end = this.pageSize * event.detail;
    this.data = this.allAccounts.slice(start, end);
}

//#endregion

//#region Create Account 

accountObject = ACCOUNT_OBJECT;
accountFields = [NAME, INDUSTRY, ANNUAL_REVENUE, PHONE, WEBSITE];

@track showModal = false; 
    
openModal() {            
    this.showModal = true;
}

hideModal() {   
    this.showModal = false;
} 

handleSuccess(event) {
    const evt = new ShowToastEvent({
        title: 'Account created successfully.',
        message: 'Account Record ID: ' + event.detail.id,
        variant: 'success',
    });
    this.dispatchEvent(evt);
}

//#endregion

}