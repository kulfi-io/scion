"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
            // User // password = password
        await queryInterface.bulkInsert(
            "Users",
            [
                {
                    firstName: "Admin",
                    lastName: "User",
                    email: "admin@scion.com",
                    password: "$2b$10$Dd556/LUlbWMSOmQWcQ7VeUG46CoEJj7pY/807.F1xfc89hwd1yUW",
                },
            ],
            {}
        );
            // Roles
        await queryInterface.bulkInsert(
            "Roles",
            [
                {
                    name: "Executive Officer",
                    description:
                        "Manages all modules and components across all pool and spaces",
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    name: "Executive Pool Officer",
                    description:
                        "Manages Pool, Payment and Communication for a given Pool",
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    name: "Executive Space Officer",
                    description: "Manages all modules for a given Space",
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    name: "Space Manager",
                    description:
                        "Manages Approval, Communication, Reporting and Access for a given Space",
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    name: "Contractor",
                    description: "Manages Work related items for given space",
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    name: "Doner",
                    description: "Donates to Pools",
                    createdById: 1,
                    updatedById: 1,
                },
            ],
            {}
        );
            // Resources
        await queryInterface.bulkInsert(
            "Resources",
            [
                {
                    name: "Resources",
                    description:
                        "Responsible for managing available components",
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    name: "Financials",
                    description:
                        "Responsible for managing payments and donation related transactions",
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    name: "Work",
                    description: "Responsible for managing work related items",
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    name: "Reporting",
                    description:
                        "Responsible for providing reporting for a given pool or space",
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    name: "Donations",
                    description: "Responsible for manging donation",
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    name: "User",
                    description: "Responsible for managing User access",
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    name: "Spaces",
                    description: "Responsible for managing sacred spaces",
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    name: "Pools",
                    description: "Responsible for managing pools",
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    name: "Communication",
                    description:
                        "Responsible for managing communications module",
                    createdById: 1,
                    updatedById: 1,
                },
            ],
            {}
        );
            // Permissions
        await queryInterface.bulkInsert(
            "Permissions",
            [
                {
                    name: 'canViewResource',
                    createdById: 1,
                    updatedById: 1
                },
                {
                    name: 'canApprove',
                    createdById: 1,
                    updatedById: 1
                },
                {
                    name: 'canManageSelf',
                    createdById: 1,
                    updatedById: 1
                },
                {
                    name: 'canManage',
                    createdById: 1,
                    updatedById: 1
                },
                {
                    name: 'canManageAccrossAll',
                    createdById: 1,
                    updatedById: 1
                }
               
            ]
        );
            // User Role
        await queryInterface.bulkInsert(
            "UserRoles",
            [
                {
                    roleId: 1,
                    userId: 1,
                    isDefault: true,
                    createdById: 1,
                    updatedById: 1,
                },
            ],
            {}
        );

            // ResourceRole
            // Doner
            // Executive Officer
        await queryInterface.bulkInsert(
            "ResourceRoles",
            [

                {
                    roleId: 6,
                    resourceId: 5,
                    permissionId: 1,
                    createdById: 1,
                    updatedById:1
                },
                {
                    roleId: 6,
                    resourceId: 6,
                    permissionId: 3,
                    createdById: 1,
                    updatedById:1
                },
                {
                    roleId: 6,
                    resourceId: 7,
                    permissionId: 1,
                    createdById: 1,
                    updatedById:1
                },



                {
                    roleId: 1,
                    resourceId: 1,
                    permissionId: 1,
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    roleId: 1,
                    resourceId: 1,
                    permissionId: 5,
                    createdById: 1,
                    updatedById: 1,
                },
             
               
                {
                    roleId: 1,
                    resourceId: 2,
                    permissionId: 1,
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    roleId: 1,
                    resourceId: 2,
                    permissionId: 5,
                    createdById: 1,
                    updatedById: 1,
                },
                

                {
                    roleId: 1,
                    resourceId: 3,
                    permissionId: 1,
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    roleId: 1,
                    resourceId: 3,
                    permissionId: 5,
                    createdById: 1,
                    updatedById: 1,
                },
               

                {
                    roleId: 1,
                    resourceId: 3,
                    permissionId: 1,
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    roleId: 1,
                    resourceId: 3,
                    permissionId: 5,
                    createdById: 1,
                    updatedById: 1,
                },
               

                {
                    roleId: 1,
                    resourceId: 4,
                    permissionId: 1,
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    roleId: 1,
                    resourceId: 4,
                    permissionId: 5,
                    createdById: 1,
                    updatedById: 1,
                },
               
                {
                    roleId: 1,
                    resourceId: 5,
                    permissionId: 1,
                    createdById: 1,
                    updatedById: 1,
                },

                {
                    roleId: 1,
                    resourceId: 6,
                    permissionId: 1,
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    roleId: 1,
                    resourceId: 6,
                    permissionId: 5,
                    createdById: 1,
                    updatedById: 1,
                },
                

                {
                    roleId: 1,
                    resourceId: 7,
                    permissionId: 1,
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    roleId: 1,
                    resourceId: 7,
                    permissionId: 5,
                    createdById: 1,
                    updatedById: 1,
                },
               
                {
                    roleId: 1,
                    resourceId: 8,
                    permissionId: 1,
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    roleId: 1,
                    resourceId: 8,
                    permissionId: 5,
                    createdById: 1,
                    updatedById: 1,
                },
                
                {
                    roleId: 1,
                    resourceId: 9,
                    permissionId: 1,
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    roleId: 1,
                    resourceId: 9,
                    permissionId: 5,
                    createdById: 1,
                    updatedById: 1,
                },
    
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("UserRoles", null, {
            truncate: true,
            cascade: true,
        });

        await queryInterface.bulkDelete("Resources", null, {
            truncate: true,
            cascade: true,
        });

        await queryInterface.bulkDelete("Roles", null, {
            truncate: true,
            cascade: true,
        });

        await queryInterface.bulkDelete("Users", null, {
            truncate: true,
            cascade: true,
        });
    },
};
