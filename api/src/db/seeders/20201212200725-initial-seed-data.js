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
        await queryInterface.bulkInsert(
            "Users",
            [
                {
                    firstName: "Admin",
                    lastName: "User",
                    email: "admin@scion.com",
                    password: "Admin",
                },
            ],
            {}
        );

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

        await queryInterface.bulkInsert(
            "UserRoles",
            [
                {
                    roleId: 1,
                    userId: 1,
                    createdById: 1,
                    updatedById: 1,
                },
            ],
            {}
        );

        await queryInterface.bulkInsert(
            "ResourceRoles",
            [
                {
                    roleId: 1,
                    resourceId: 1,
                    canEdit: true,
                    canCreate: true,
                    canDeactivate: true,
                    canApprove: true,
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    roleId: 1,
                    resourceId: 2,
                    canEdit: true,
                    canCreate: true,
                    canDeactivate: true,
                    canApprove: true,
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    roleId: 1,
                    resourceId: 3,
                    canEdit: true,
                    canCreate: true,
                    canDeactivate: true,
                    canApprove: true,
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    roleId: 1,
                    resourceId: 4,
                    canEdit: true,
                    canCreate: true,
                    canDeactivate: true,
                    canApprove: true,
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    roleId: 1,
                    resourceId: 5,
                    canEdit: true,
                    canCreate: true,
                    canDeactivate: true,
                    canApprove: true,
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    roleId: 1,
                    resourceId: 6,
                    canEdit: true,
                    canCreate: true,
                    canDeactivate: true,
                    canApprove: true,
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    roleId: 1,
                    resourceId: 7,
                    canEdit: true,
                    canCreate: true,
                    canDeactivate: true,
                    canApprove: true,
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    roleId: 1,
                    resourceId: 8,
                    canEdit: true,
                    canCreate: true,
                    canDeactivate: true,
                    canApprove: true,
                    createdById: 1,
                    updatedById: 1,
                },
                {
                    roleId: 1,
                    resourceId: 9,
                    canEdit: true,
                    canCreate: true,
                    canDeactivate: true,
                    canApprove: true,
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
