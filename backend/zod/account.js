const z = require("zod");

const TransferRequest = z.object({
    to : z.string().min(1),
    amount: z.number().min(1)
})

module.exports = {
    TransferRequest
}