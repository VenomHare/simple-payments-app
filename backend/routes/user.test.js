const axios = require("axios");
const Config = require("../config");
const { Users } = require("../db");

const ENDPOINT = Config.TEST_ENDPOINT;

describe("V1 User Router - Signup", () => {
    

    test("should signup successfully with valid details", async () => {
        const req = await axios.post(`${ENDPOINT}/api/v1/user/signup`, {
            username: "somemail@example.com",
            password: "somerandompassword",
            firstName: "John",
            lastName: "Doe"
        });

        expect(req.status).toBe(200);
        expect(req.data.token).not.toBeNull();
        expect(req.data.message).toBe("User Created Successfully!");
    });

    Users.deleteOne({username: "somemail@example.com"});

    test("should deny signup if email is already taken", async () => {
        // First request to create a user
        await axios.post(`${ENDPOINT}/api/v1/user/signup`, {
            username: "existing@example.com",
            password: "password123",
            firstName: "Jane",
            lastName: "Doe"
        });

        // Second request with the same username should fail
        await expect(
            axios.post(`${ENDPOINT}/api/v1/user/signup`, {
                username: "existing@example.com",
                password: "anotherpassword",
                firstName: "Someone",
                lastName: "Else"
            })
        ).rejects.toMatchObject({
            response: {
                status: 411,
                data: { message: "Email Already Taken / Incorrect Inputs" }
            }
        });
    });

    Users.deleteOne({username: "existing@example.com"});

    test("should deny signup with missing or invalid fields", async () => {
        await expect(
            axios.post(`${ENDPOINT}/api/v1/user/signup`, {
                username: "", // Empty username
                password: "ab", // Weak password
                firstName: "Jane"
                // Missing lastName
            })
        ).rejects.toMatchObject({
            response: {
                status: 411,
                data: { message: "Email Already Taken / Incorrect Inputs" }
            }
        });
    });
});
