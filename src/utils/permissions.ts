export const permissions = [
    //ticket permissions
    {
        name : "view:ticket",
        description : "allows user to view ticket"
    },
    {
        name : "edit:ticket",
        description : "allows user to edit ticket"
    },
    {
        name : "delete:ticket",
        description : "allows user to delete a ticket"
    },
    {
        name : "view:ticket-logs",
        description : "allows user to view ticket logs"
    },

    // user permissions
    {
        name : "create:admin",
        description : "allows user to create an admin"
    }, 
    {
        name : "create:customer-support",
        description : "can add new customer support"
    },
    {
        name : "create:customer-support-level",
        description : "can create new customer support level"
    }, 
    {
        name : "edit:customer-support-level",
        description : "can edit customer support level"
    },
    {
        name : "update:customer-support:customer-support-level",
        description : "can change the customer support level of a customer support user"
    }
]