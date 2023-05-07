declare module "@salesforce/apex/AccountController.getAccountList" {
  export default function getAccountList(): Promise<any>;
}
declare module "@salesforce/apex/AccountController.getAccountListByQuery" {
  export default function getAccountListByQuery(param: {nameQuery: any}): Promise<any>;
}
