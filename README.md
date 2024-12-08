## **Installation**

### **Prérequis**
**Node.js** installé sur la machine
**Express** installé sur la machine
Utilisation de VSC

1. **Cloner le dépôt git**
    "git clone https://github.com/DylanQuellet/Test_technique.git"
    "cd Test_technique"
    "npm install" dans la console pour avoir les dépendances

2. **Lancer le serveur**
    "node index.js"

3. **Routes de l'API**
    GET /contacts = "curl http://localhost:3000/contacts" ou "curl -X GET http://localhost:3000/contacts"
    GET /contacts/{id} = "curl http://localhost:3000/contacts/1" ou "curl -X GET http://localhost:3000/contacts/1"
    POST /contacts = "curl -X POST -H "Content-Type: application/json" -d '{"name":"Dahak","email":"dahak@example.com","phone":"1234567890"}' http://localhost:3000/contacts"
    PUT /contacts/{id} = "curl -X PUT -H "Content-Type: application/json" -d '{"name":"Oscar","email":"oscar@example.com","phone":"0987654321"}' http://localhost:3000/contacts/1"
    DELETE /contacts/{id} = "curl -X DELETE http://localhost:3000/contacts/1"

4. **AWS**
    Prérequis : "npm install -g serverless"
    Déploiment : "serverless deploy"
    Supprimer : "serverless remove"