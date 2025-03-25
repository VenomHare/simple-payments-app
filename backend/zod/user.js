const z = require("zod");
const SignUpInput  =  z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    username: z.string().min(1).email("Email is required as username"),
    password: z.string().min(1)
}) 

const SignInInput = z.object({
    username: z.string().min(1).email(),
    password: z.string().min(1),
})

const UserEditRequest = z.object({
    password: z.string().min(3).optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
})

module.exports = {
    SignUpInput,
    SignInInput,
    UserEditRequest
}