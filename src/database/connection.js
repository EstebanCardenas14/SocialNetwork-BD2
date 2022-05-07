const neo4j = require('neo4j-driver');
const color = require('colors');

const connection = async () => {
    try {
        const driver = neo4j.driver(
            Process.env.NEO4J_URL,
            neo4j.auth.basic(Process.env.NEO4J_USER, Process.env.NEO4J_PASSWORD)
        );
        const session = driver.session();
        console.log(color.green('Connected to Neo4j'));
    } catch (error) {
        console.log(color.red(error));
    }
}
module.exports = connection;
