mongo -- "$MONGO_INITDB_DATABASE" <<EOF
    db.createUser({
        roles: [
            {role: 'readWrite', db: "${MONGO_INITDB_DATABASE}"}
        ]
    })
EOF