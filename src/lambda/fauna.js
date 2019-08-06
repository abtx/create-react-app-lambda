
var faunadb = require('faunadb'),
q = faunadb.query

var client = new faunadb.Client({ secret: 'fnADVHELL_ACBskDZ3uUUtGv8CeyR2etbpmHu8-u' })


export function handler(event, context, callback) {
    console.log("FAUNA queryStringParameters", event.queryStringParameters)

    var createP = client.query(
        q.Create(
          q.Collection('test'),
          { data: { testField: 'testValue' } }
        )
      )
    
    createP.then(function(response) {
        console.log('done')
    })

    callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: 'ok'})
    })
    
  }



