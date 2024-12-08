Installation :
- Prérequis :
    Node.js installé sur la machine
    Express installé sur la machine
    Utilisation de VSC
- Cloner le dépôt git :
    git clone

- Lancer le serveur :
    "node index.js"

- Routes de l'API :
    GET /contacts = "curl http://localhost:3000/contacts"
    GET /contacts/{id} = "curl http://localhost:3000/contacts/1"
    POST /contacts = "curl -X POST -H "Content-Type: application/json" -d '{"name":"Dahak","email":"dahak@example.com","phone":"1234567890"}' http://localhost:3000/contacts"
    PUT /contacts/{id} = "curl -X PUT -H "Content-Type: application/json" -d '{"name":"Oscar","email":"oscar@example.com","phone":"0987654321"}' http://localhost:3000/contacts/1"
    DELETE /contacts/{id} = "curl -X DELETE http://localhost:3000/contacts/1"