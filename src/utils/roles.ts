export const roles = [
    {
        name : "super-admin",
        description : "site owner",
        permissions : [
            "view:ticket",
            "edit:ticket",
            "delete:ticket",
            "view:ticket-logs",
            "create:admin",
            "create:customer-support",
            "create:customer-support-level",
            "edit:customer-support-level",
            "update:customer-support:customer-support-level"
        ]
    },
    {
        name : "admin",
        description : "manages customer service representatives",
        permissions : [
            "view:ticket-logs",
            "create:customer-support",
            "create:customer-support-level",
            "edit:customer-support-level",
            "update:customer-support:customer-support-level"
        ]
    },
    {
        name : "customer-service",
        description : "handles customers tickets",
        permissions : [
            "view:ticket",
        ]
    },
    {
        name : "agent",
        description : "helps customers create tickets",
        permissions : [
            "view:ticket",
            "edit:ticket",
            "delete:ticket",
            "view:ticket-logs",
        ]
    }
]