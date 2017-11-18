const {
  ObjectID
} = require('mongodb');

// Error handler
const FormError = require('../lib/error');


module.exports = ({ Keywords }, { userByID }) => {

    let methods = {}

    methods.getAll = async (query, pro) => {
        const result = await Keywords.find(query, Object.assign({keywordkind: 1}, pro)).toArray();
        return result;
    }

    methods.getOneByID = async (data, pro) => {

        if(data.id) {
            data = { _id: new ObjectID(data.id) }
        } else if ( !(data.keyword && data.keywordkind) ) {
            return null;
        }

        const result = await Keywords.findOne(data, Object.assign({keywordkind: 1}, pro));
        return result;
    }

    methods.createKeyword = async ({ Data }) => {
        const result = await Keywords.insert(
            Data,   // update statement
        );
        return Object.assign({ id: result.insertedIds[0] }, Data);;
    }

    methods.updateOneByID = async ({ id, Data }) => {
        const result = await Keywords.findAndModify(
            { _id: new ObjectID(id) },
            [],        // represents a sort order if multiple matches
            Data,   // update statement
            { new: true });
        return result.value;
    }


    methods.deleteOneByID = async ({ id }) => {
        const result = await Keywords.remove(
            { _id: new ObjectID(id) },
        )
        return "OK";
    }

    return methods;
};
