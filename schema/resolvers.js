const { GraphQLScalarType } = require('graphql'),
      { Kind } = require('graphql/language'),
      { URL } = require('url'),
      {
        parseResolveInfo,
        simplifyParsedResolveInfoFragmentWithType
      } = require('graphql-parse-resolve-info'),
      schemaChecker = require('../lib/schemaChecker.js');

function buildFilters({
    OR = [],
    AND = [],
}) {

    function buildONE({
        OR = [],
        name_contains,
        description_contains,
        inlevel,
        url_contains,
    }) {
        const filter = (name_contains || description_contains || inlevel || url_contains) ? [] : null;
        if (name_contains) {
            filter.push({
                "name": {
                    $regex: `.*${name_contains}.*`,
                    $options: 'i'
                }
            });
        }

        if (description_contains) {
            filter.push({
                "description": {
                    $regex: `.*${description_contains}.*`,
                    $options: 'i'
                }
            });
        }

        if (inlevel) {
            filter.push({
                "level": inlevel
            });
        }

        if (url_contains) {
            filter.push({
                "url": {
                    $regex: `.*${url_contains}.*`,
                    $options: 'i'
                }
            });
        }

        if (OR.length > 0) {
            filter.push({
                "$or": buildARR(OR)
            });
        }

        return filter
    }

    function buildARR(arr) {

        if (arr.length < 1) {
            return null
        }
        filtersOR = []

        for (let i = 0; i < arr.length; i++) {
            var filtersOR = filtersOR.concat(buildONE(arr[i]));
        }

        return filtersOR

    }

    let filters = {};

    if (OR.length > 0) {
        filters.$or = buildARR(OR)
    }

    if (AND.length > 0) {
        filters.$and = buildARR(AND)
    }


    return filters;
}


function buildProjection(resolveInfo) {
    var pro = {};

    const parsedResolveInfoFragment = parseResolveInfo(
      resolveInfo
    );
    const simplifiedFragment = simplifyParsedResolveInfoFragmentWithType(
      parsedResolveInfoFragment,
      resolveInfo.returnType
    );

    for (const x in simplifiedFragment.fieldsByTypeName) {
      for (const y in simplifiedFragment.fieldsByTypeName[x]) {
        if(!pro[y]) pro[y] = 1;
      }
    }

    return pro;
}



function UrlValue(value) {
  try {
    new URL(value);
    return value
  } catch (error) {
    return null
  }
}


module.exports = {
    Query: {
      allkeyword: async (root, data, { keywordDB: { getAll } }, resolveInfo) => {
          return await getAll({},buildProjection(resolveInfo));
      },

      keyword: async (root, data, { keywordDB: { getOneByID } }, resolveInfo) => {
          return await getOneByID(data,buildProjection(resolveInfo));
      },

    },

    Mutation: {

      createKeyword: async (root, data, { keywordDB: { createKeyword } }, resolveInfo) => {
        console.log(data);
        if (schemaChecker(data.Data)) return await createKeyword(data)
        else return null
      },

      updateKeyword: async (root, data, { keywordDB: { updateOneByID } }, resolveInfo) => {
        if (schemaChecker(data.Data)) return await updateOneByID(data);
        else return null
      },

      deleteKeyword: async (root, data, { keywordDB: { deleteOneByID } }, resolveInfo) => {
        return await deleteOneByID(data);
      },
    },


    HTMLTag: {
        id: root => root._id || root.id,
    },

    HTMLAttribute: {
        id: root => root._id || root.id,
    },


    Url: new GraphQLScalarType({
      name: 'Url',
      description: 'Url custom scalar type',
      parseValue: UrlValue,
      serialize: UrlValue,
      parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
          return oddValue(value);
        }
        return null;
      },
    }),
};


