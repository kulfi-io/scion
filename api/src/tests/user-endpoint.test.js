import app from "../server";
import supertest from "supertest";
import dotenv from "dotenv";
import { createHash } from "../utils";

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
});

const request = supertest(app);
const gplUrl = process.env.API_BASE_URL;
const badRequestor = createHash("100");

let token, requestor;
const storeLoginData = (err, res) => {
    if (!err) {
        token = res.body.data.login.token;
        requestor = res.body.data.login.requestor;
    }
};

describe("Executive Officer Tests", () => {
    test("login", (done) => {
        request
            .post(gplUrl)
            .send({
                query: `{
                login(email: "admin@scion.com" password:"password") {
                    requestor
                    token 
                    user {id firstName lastName fullName}
                    roles{id name isDefault resources {
                        id name permissions
                    }} 
                }
            }`,
            })
            .set("Accept", "application/json")
            .expect("Content-type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                if (res.body.errors) return done(res.body.errors[0].message);

                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.data.login.user.firstName).toEqual("Admin");
                expect(res.body.data.login.roles.length).toEqual(1);
                expect(res.body.data.login.token).toBeTruthy();
                expect(res.body.data.login.requestor).toBeTruthy();
                storeLoginData(err, res);
                done();
            });
    });

    test("authentication-failure-for-retrieve-users", async (done) => {
        request
            .post(gplUrl)
            .send({
                query: `{
                users(requestor: "${requestor}") {
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
            .set("Accept", "application/json")
            .expect("Content-type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body.errors[0].message).toEqual("Not Authenticated");
                done();
            });
    });

    test("requestor-failure-for-retrieve-users", async (done) => {
        request
            .post(gplUrl)
            .send({
                query: `{
                users(requestor: "${badRequestor}") {
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
            .set("Accept", "application/json")
            .set("authorization", token)
            .expect("Content-type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body.errors[0].message).toEqual(
                    "Unauthorized Requestor"
                );
                done();
            });
    });

    test("retrieve-users", async (done) => {
        request
            .post(gplUrl)
            .send({
                query: `{
                users(requestor: "${requestor}") {
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
            .set("Accept", "application/json")
            .set("authorization", token)
            .expect("Content-type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                if (res.body.errors) return done(res.body.errors[0].message);

                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.data.users.length).toEqual(1);
                done();
            });
    });

    test("requestor-failure-for-retrieve-user-by-Id", async (done) => {
        request
            .post(gplUrl)
            .send({
                query: `{
                userById(id: 1 requestor: "${badRequestor}") {
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
            .set("Accept", "application/json")
            .set("authorization", token)
            .expect("Content-type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body.errors[0].message).toEqual(
                    "Unauthorized Requestor"
                );
                done();
            });
    });

    test("authentication-failure-for-retrieve-user-by-Id", async (done) => {
        request
            .post(gplUrl)
            .send({
                query: `{
                userById(id: 1 requestor: "${requestor}") {
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
            .set("Accept", "application/json")
            .expect("Content-type", /json/)
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
                userById(id: 1 requestor: "${requestor}") {
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
            .set("Accept", "application/json")
            .set("authorization", token)
            .expect("Content-type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                if (res.body.errors) return done(res.body.errors[0].message);

                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.data.userById.id).toEqual(1);
                done();
            });
    });

    test("requestor-failure-for-retrieve-user-by-email", async (done) => {
        request
            .post(gplUrl)
            .send({
                query: `{
                userByEmail(email: "admin@scion.com"  requestor: "${badRequestor}") {
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
            .set("Accept", "application/json")
            .set("authorization", token)
            .expect("Content-type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body.errors[0].message).toEqual(
                    "Unauthorized Requestor"
                );
                done();
            });
    });

    test("authentication-failure-for-retrieve-user-by-email", async (done) => {
        request
            .post(gplUrl)
            .send({
                query: `{
                userByEmail(email: "admin@scion.com"  requestor: "${requestor}") {
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
            .set("Accept", "application/json")
            .expect("Content-type", /json/)
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
                userByEmail(email: "admin@scion.com"  requestor: "${requestor}") {
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
            .set("Accept", "application/json")
            .set("authorization", token)
            .expect("Content-type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                if (res.body.errors) return done(res.body.errors[0].message);

                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.data.userByEmail.id).toEqual(1);
                done();
            });
    });

    test("authentication-failure-forcreate-user", async (done) => {
        request
            .post(gplUrl)
            .send({
                query: `mutation {
                    addUser(firstName: "Lucy", lastName: "Dog", email: "lucy-dog@scion.com", password: "password", roleId: 1, requestor: "${requestor}") {
                        id
                    }
                }`,
            })
            .set("Accept", "application/json")
            .expect("Content-type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body.errors[0].message).toEqual("Not Authenticated");
                done();
            });
    });

    test("requestor-failure-for-create-user", async (done) => {
        request
            .post(gplUrl)
            .send({
                query: `mutation {
                    addUser(firstName: "Lucy", lastName: "Dog", email: "lucy-dog@scion.com", password: "password", roleId: 1, requestor: "${badRequestor}") {
                        id
                    }
                }`,
            })
            .set("Accept", "application/json")
            .set("authorization", token)
            .expect("Content-type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body.errors[0].message).toEqual(
                    "Unauthorized Requestor"
                );
                done();
            });
    });

    test("create-user", async (done) => {
        request
            .post(gplUrl)
            .send({
                query: `mutation {
                    addUser(firstName: "Lucy", lastName: "Dog", email: "lucy-dog@scion.com", password: "password", roleId: 1, requestor: "${requestor}") {
                        id
                    }
                }`,
            })
            .set("Accept", "application/json")
            .set("authorization", token)
            .expect("Content-type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                if (res.body.errors) return done(res.body.errors[0].message);

                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.data.addUser.id).toBeTruthy();
                done();
            });
    });

    test("authentication-failure-for-change-password", async (done) => {
        request
            .post(gplUrl)
            .send({
                query: `mutation {
                    changePassword( requestor: "${requestor}", oldPassword: "password", password: "newPassword") {
                        id
                    }
                }`,
            })
            .set("Accept", "application/json")
            .expect("Content-type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body.errors[0].message).toEqual("Not Authenticated");
                done();
            });
    });

    test("requestor-failure-for-change-password", async (done) => {
        request
            .post(gplUrl)
            .send({
                query: `mutation {
                    changePassword( requestor: "${badRequestor}", oldPassword: "password", password: "newPassword") {
                        id
                    }
                }`,
            })
            .set("Accept", "application/json")
            .set("authorization", token)
            .expect("Content-type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body.errors[0].message).toEqual(
                    "Unauthorized Requestor"
                );
                done();
            });
    });

    test("change-password", async (done) => {
        request
            .post(gplUrl)
            .send({
                query: `mutation {
                    changePassword( requestor: "${requestor}", oldPassword: "password", password: "newPassword") {
                        id
                    }
                }`,
            })
            .set("Accept", "application/json")
            .set("authorization", token)
            .expect("Content-type", /json/)
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
            .set("Accept", "application/json")
            .expect("Content-type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                if (res.body.errors) return done(res.body.errors[0].message);

                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.data.login.user.firstName).toEqual("Admin");
                expect(res.body.data.login.roles.length).toEqual(1);
                expect(res.body.data.login.token).toBeTruthy();
                expect(res.body.data.login.requestor).toBeTruthy();
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
            .set("Accept", "application/json")
            .expect("Content-type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                if (res.body.errors) return done(res.body.errors[0].message);

                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.data.login.user.firstName).toEqual("Lucy");
                expect(res.body.data.login.roles.length).toEqual(1);
                expect(res.body.data.login.token).toBeTruthy();
                expect(res.body.data.login.requestor).toBeTruthy();
                storeLoginData(err, res);
                done();
            });
    });

    test("authentication-failure-for-deactivation", (done) => {
        request
            .post(gplUrl)
            .send({
                query: `mutation {
                    deactivateUser( requestor: "${requestor}", id: 2) {
                        id
                    }
                }`,
            })
            .set("Accept", "application/json")
            .expect("Content-type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body.errors[0].message).toEqual("Not Authenticated");
                done();
            });
    });

    test("requestor-failure-for-deactivation", (done) => {
        request
            .post(gplUrl)
            .send({
                query: `mutation {
                    deactivateUser( requestor: "${badRequestor}", id: 2) {
                        id
                    }
                }`,
            })
            .set("Accept", "application/json")
            .set("authorization", token)
            .expect("Content-type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body.errors[0].message).toEqual(
                    "Unauthorized Requestor"
                );
                done();
            });
    });

    test("deactivate-failure-for-invalid-id", (done) => {
        request
            .post(gplUrl)
            .send({
                query: `mutation {
                    deactivateUser( requestor: "${requestor}", id: 3) {
                        id
                    }
                }`,
            })
            .set("Accept", "application/json")
            .set("authorization", token)
            .expect("Content-type", /json/)
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
                    deactivateUser( requestor: "${requestor}", id: 2) {
                        id
                    }
                }`,
            })
            .set("Accept", "application/json")
            .set("authorization", token)
            .expect("Content-type", /json/)
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
