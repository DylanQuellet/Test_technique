const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'Contacts';

// Fonction GET /contacts
module.exports.getContacts = async (event) => {
    const params = {
        TableName: TABLE_NAME,
    };

    try {
        const result = await dynamoDb.scan(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(result.Items),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not fetch contacts' }),
        };
    }
};

// Fonction GET /contacts/{id}
module.exports.getContact = async (event) => {
    const { id } = event.pathParameters;
    const params = {
        TableName: TABLE_NAME,
        Key: { id },
    };

    try {
        const result = await dynamoDb.get(params).promise();
        if (!result.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Contact not found' }),
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify(result.Item),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not fetch contact' }),
        };
    }
};

// Fonction POST /contacts
module.exports.createContact = async (event) => {
    const { name, email, phone } = JSON.parse(event.body);
    if (!name || !email) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid name or email' }),
        };
    }

    const id = `${Date.now()}`; // Génération d'un ID unique
    const newContact = { id, name, email, phone };

    const params = {
        TableName: TABLE_NAME,
        Item: newContact,
    };

    try {
        await dynamoDb.put(params).promise();
        return {
            statusCode: 201,
            body: JSON.stringify(newContact),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not create contact' }),
        };
    }
};

// Fonction PUT /contacts/{id}
module.exports.updateContact = async (event) => {
    const { id } = event.pathParameters;
    const { name, email, phone } = JSON.parse(event.body);
    
    if (!name || !email) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid name or email' }),
        };
    }

    const params = {
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression: 'set #name = :name, #email = :email, #phone = :phone',
        ExpressionAttributeNames: {
            '#name': 'name',
            '#email': 'email',
            '#phone': 'phone',
        },
        ExpressionAttributeValues: {
            ':name': name,
            ':email': email,
            ':phone': phone,
        },
        ReturnValues: 'ALL_NEW',
    };

    try {
        const result = await dynamoDb.update(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(result.Attributes),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not update contact' }),
        };
    }
};

// Fonction DELETE /contacts/{id}
module.exports.deleteContact = async (event) => {
    const { id } = event.pathParameters;

    const params = {
        TableName: TABLE_NAME,
        Key: { id },
    };

    try {
        await dynamoDb.delete(params).promise();
        return {
            statusCode: 204,
            body: null,
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not delete contact' }),
        };
    }
};
