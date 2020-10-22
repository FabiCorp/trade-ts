db.createUser(
    {
        user    :   "trading",
        pwd     :   "secret",
        roles   :   [
            {
                role    :   "readWrite",
                db      :   "trading-db"
            }
        ]
    }
)