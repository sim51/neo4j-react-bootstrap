import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import neo4j from "~/services/neo4j/neo4j-baobab";
import tree from "~/store";

chai.use(chaiAsPromised);

describe('neo4j', () => {

    it('return db labels', () => {
        return chai.assert.eventually
            .lengthOf(
                Promise.resolve(neo4j.labels()),
                2)
            ;
    });

    it('return db relationship type', () => {
        return chai.assert.eventually
            .lengthOf(
                Promise.resolve(neo4j.relationshipTypes()),
                6
            );
    });

    it('return db properties', () => {
        return chai.assert.eventually
            .lengthOf(
                Promise.resolve(neo4j.propertyKeys()),
                11
            );
    });

    it('return db indexes', () => {
        return chai.assert.eventually
            .lengthOf(
                Promise.resolve(neo4j.indexes()),
                2
            );
    });

    it('return db constraints', () => {
        return chai.assert.eventually
            .lengthOf(
                Promise.resolve(neo4j.constraints()),
                3
            );
    });

    it('return cypher result', () => {
        return chai.assert.eventually
            .deepEqual(
                Promise.resolve(neo4j.cypher("RETURN 'Benoit' AS name, 33 AS age, 12.3 AS float")),
                [{ name:"Benoit", age:33, float: 12.3}]
            );
    });

    it('return graph result', () => {
        return chai.assert.isFulfilled(Promise.resolve(neo4j.graph("MATCH (n) RETURN n LIMIT 25")));
    });

    it('baobab change are taken', () => {
        // change the state
        tree.set('neo4j', {
            login: "neo4j",
            password: "bla",
            url: "bolt://localhost"
        });
        // commit it for sync
        tree.commit();

        return chai.assert.isRejected(neo4j.labels());
    });
});
