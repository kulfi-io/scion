import app from "../server";
import supertest from "supertest";
import dotenv from "dotenv";

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
});

let request = supertest(app);
const gplUrl = process.env.API_BASE_URL;

let token;
const storeLoginData = (err, res) => {
    if (!err) {
        token = res.body.data.login.token;
    }
};

describe("Executive Officer Role Tests", () => {
    test("login", (done) => {
        request
            .post(gplUrl)
            .send({
                query: `{
                login(email: "admin@scion.com" password:"password") {
                    token 
                    user {id firstName lastName fullName}
                    roles{id name isDefault resources {
                        id name permissions
                    }} 
                }
            }`,
            })
            .set("Content-type", "application/json")
            .set("Origin", process.env.ORIGIN_WHITELIST)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                if (res.body.errors) return done(res.body.errors[0].message);

                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.data.login.user.firstName).toEqual("Admin");
                expect(res.body.data.login.roles.length).toEqual(1);
                expect(res.body.data.login.token).toBeTruthy();
                storeLoginData(err, res);
                done();
            });
    });

    test("authentication-failure-for-retrieve-users", async (done) => {
        request
            .post(gplUrl)
            .send({
                query: `{
                users {
                    id
                    firstName
                    lastName
                    email
                    roles { id name isDefault}
                    createdAt
                    createdBy{id, firstName lastName email}
                    updatedAt
                    updatedBy{id firstName lastName email}
                }
            }`,
            })
            .set("Content-Type", "application/json")
            .set("Origin", process.env.ORIGIN_WHITELIST)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body.errors[0].message).toEqual("Not Authenticated");
                done();
            });
    });

    test("retrieve-users", async (done) => {
        request
            .post(gplUrl)
            .send({
                query: `{
                users {
                    id
                    firstName
                    lastName
                    email
                    roles { id name isDefault}
                    createdAt
                    createdBy{id, firstName lastName email}
                    updatedAt
                    updatedBy{id firstName lastName email}
                }
            }`,
            })
            .set("Content-Type", "application/json")
            .set("authorization", token)
            .set("Origin", process.env.ORIGIN_WHITELIST)

            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                if (res.body.errors) return done(res.body.errors[0].message);

                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.data.users.length).toEqual(1);
                done();
            });
    });

    test("authentication-failure-for-retrieve-user-by-Id", async (done) => {
        request
            .post(gplUrl)
            .send({
                query: `{
                userById(id: 1 ) {
                    id
                    firstName
                    lastName
                    email
                    roles { id name isDefault}
                    createdAt
                    createdBy{id, firstName lastName email}
                    updatedAt
                    updatedBy{id firstName lastName email}
                }
            }`,
            })
            .set("Content-Type", "application/json")
            .set("Origin", process.env.ORIGIN_WHITELIST)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body.errors[0].message).toEqual("Not Authenticated");
                done();
            });
    });

    test("retrieve-user-by-id", async (done) => {
        request
            .post(gplUrl)
            .send({
                query: `{
                userById(id: 1 ) {
                    id
                    firstName
                    lastName
                    email
                    roles { id name isDefault}
                    createdAt
                    createdBy{id, firstName lastName email}
                    updatedAt
                    updatedBy{id firstName lastName email}
                }
            }`,
            })
            .set("Content-Type", "application/json")
            .set("authorization", token)
            .set("Origin", process.env.ORIGIN_WHITELIST)

            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                if (res.body.errors) return done(res.body.errors[0].message);

                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.data.userById.id).toEqual(1);
                done();
            });
    });

    test("authentication-failure-for-retrieve-user-by-email", async (done) => {
        request
            .post(gplUrl)
            .send({
                query: `{
                userByEmail(email: "admin@scion.com" ) {
                    id
                    firstName
                    lastName
                    email
                    roles { id name isDefault}
                    createdAt
                    createdBy{id, firstName lastName email}
                    updatedAt
                    updatedBy{id firstName lastName email}
                }
            }`,
            })
            .set("Content-Type", "application/json")
            .set("Origin", process.env.ORIGIN_WHITELIST)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body.errors[0].message).toEqual("Not Authenticated");
                done();
            });
    });

    test("retrieve-user-by-email", async (done) => {
        request
            .post(gplUrl)
            .send({
                query: `{
                userByEmail(email: "admin@scion.com" ) {
                    id
                    firstName
                    lastName
                    email
                    roles { id name isDefault}
                    createdAt
                    createdBy{id, firstName lastName email}
                    updatedAt
                    updatedBy{id firstName lastName email}
                }
            }`,
            })
            .set("Content-Type", "application/json")
            .set("authorization", token)
            .set("Origin", process.env.ORIGIN_WHITELIST)

            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                if (res.body.errors) return done(res.body.errors[0].message);

                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.data.userByEmail.id).toEqual(1);
                done();
            });
    });

    test("authentication-failure-for-create-user", async (done) => {
        request
            .post(gplUrl)
            .send({
                query: `mutation {
                    addUser(firstName: "Lucy", lastName: "Dog", email: "lucy-dog@scion.com", password: "password", roleId: 1) {
                        id
                    }
                }`,
            })
            .set("Content-Type", "application/json")
            .set("Origin", process.env.ORIGIN_WHITELIST)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body.errors[0].message).toEqual("Not Authenticated");
                done();
            });
    });

    test("create-user", async (done) => {
        request
            .post(gplUrl)
            .send({
                query: `mutation {
                    addUser(firstName: "Lucy", lastName: "Dog", email: "lucy-dog@scion.com", password: "password", roleId: 1) {
                        id
                    }
                }`,
            })
            .set("Content-Type", "application/json")
            .set("authorization", token)
            .set("Origin", process.env.ORIGIN_WHITELIST)

            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                if (res.body.errors) return done(res.body.errors[0].message);

                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.data.addUser.id).toBeTruthy();
                done();
            });
    });

    test("duplicate-email-create-user-returns-validation-error", async (done) => {
        request
            .post(gplUrl)
            .send({
                query: `mutation {
                    addUser(firstName: "Lucy", lastName: "Dog", email: "lucy-dog@scion.com", password: "password", roleId: 1) {
                        id
                    }
                }`,
            })
            .set("Content-Type", "application/json")
            .set("authorization", token)
            .set("Origin", process.env.ORIGIN_WHITELIST)

            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body.errors[0].message).toEqual("Validation error");
                done();
            });
    });

    test("authentication-failure-for-change-password", async (done) => {
        request
            .post(gplUrl)
            .send({
                query: `mutation {
                    changePassword(email: "admin@scion.com", oldPassword: "password", password: "newPassword") {
                        id
                    }
                }`,
            })
            .set("Content-Type", "application/json")
            .set("Origin", process.env.ORIGIN_WHITELIST)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body.errors[0].message).toEqual("Not Authenticated");
                done();
            });
    });

    test("change-password", async (done) => {
        request
            .post(gplUrl)
            .send({
                query: `mutation {
                    changePassword(email: "admin@scion.com", oldPassword: "password", password: "newPassword") {
                        id
                    }
                }`,
            })
            .set("Content-Type", "application/json")
            .set("authorization", token)
            .set("Origin", process.env.ORIGIN_WHITELIST)

            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                if (res.body.errors) return done(res.body.errors[0].message);

                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.data.changePassword.id).toBeTruthy();
                done();
            });
    });

    test("login-with-new-password", (done) => {
        request
            .post(gplUrl)
            .send({
                query: `{
                login(email: "admin@scion.com" password:"newPassword") {
                    requestor
                    token
                    user {id firstName lastName fullName}
                    roles{id name isDefault resources {
                        id name permissions
                    }}
                }
            }`,
            })
            .set("Content-Type", "application/json")
            .set("Origin", process.env.ORIGIN_WHITELIST)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                if (res.body.errors) return done(res.body.errors[0].message);

                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.data.login.user.firstName).toEqual("Admin");
                expect(res.body.data.login.roles.length).toEqual(1);
                expect(res.body.data.login.token).toBeTruthy();
                storeLoginData(err, res);
                done();
            });
    });

    test("login-with-newly-added-user", (done) => {
        request
            .post(gplUrl)
            .send({
                query: `{
                login(email: "lucy-dog@scion.com" password:"password") {
                    requestor
                    token
                    user {id firstName lastName fullName}
                    roles{id name isDefault resources {
                        id name permissions
                    }}
                }
            }`,
            })
            .set("Content-Type", "application/json")
            .set("Origin", process.env.ORIGIN_WHITELIST)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                if (res.body.errors) return done(res.body.errors[0].message);

                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.data.login.user.firstName).toEqual("Lucy");
                expect(res.body.data.login.roles.length).toEqual(1);
                expect(res.body.data.login.token).toBeTruthy();
                storeLoginData(err, res);
                done();
            });
    });

    test("authentication-failure-for-deactivation", (done) => {
        request
            .post(gplUrl)
            .send({
                query: `mutation {
                    deactivateUser(id: 2) {
                        id
                    }
                }`,
            })
            .set("Content-Type", "application/json")
            .set("Origin", process.env.ORIGIN_WHITELIST)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body.errors[0].message).toEqual("Not Authenticated");
                done();
            });
    });

    test("deactivate-failure-for-invalid-id", (done) => {
        request
            .post(gplUrl)
            .send({
                query: `mutation {
                    deactivateUser(id: 3) {
                        id
                    }
                }`,
            })
            .set("Content-Type", "application/json")
            .set("authorization", token)
            .set("Origin", process.env.ORIGIN_WHITELIST)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body.errors[0].message).toEqual(
                    "Deactivation Failure"
                );
                done();
            });
    });

    test("deactivate-newly-added-user", (done) => {
        request
            .post(gplUrl)
            .send({
                query: `mutation {
                    deactivateUser(id: 2) {
                        id
                    }
                }`,
            })
            .set("Content-Type", "application/json")
            .set("authorization", token)
            .set("Origin", process.env.ORIGIN_WHITELIST)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                if (res.body.errors) return done(res.body.errors[0].message);

                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.data.deactivateUser.id).toBeTruthy();
                done();
            });
    });
});
