class Utils {
    resolveBankAccount(account, bank) {
        return new Promise((resolve) => {
            request.get(
                {
                    url: `${process.env.PAYSTACK_BASE_URL}/bank/resolve?account_number=${account}&bank_code=${bank}`,
                    headers: {
                        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    },
                },
                (error, res, body) => {
                    if (body && body.status && body.data) resolve(body.data);
                    resolve(false);
                }
            );
        });
    }

}
module.exports = Utils