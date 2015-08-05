/* eslint-disable no-unused-vars */
/* globals Session Meteor Services */
function changeServicesRegexToSpecifiedColor (lairServiceRegex, lairColor) {
  // Changes the status of a given service to the specified color
  //
  // Updated to include Regex by Isaiah Sarju
  // Created by: Dan Kottmann
  // Updated by: Ryan Dorey
  // Usage: changeServicesRegexToSpecifiedColor(/*.sql.*/, 'lair-blue')
  // Colors available: lair-grey, lair-blue, lair-green, lair-orange, lair-red
  // Requires client-side updates: true

  var projectId = Session.get('projectId')
  var modifiedBy = Meteor.user().emails[0].address

  if (lairColor !== 'lair-grey' && lairColor !== 'lair-blue' && lairColor !== 'lair-green' && lairColor !== 'lair-orange' && lairColor !== 'lair-red') {
    console.log('Invalid color specified')
    return
  }
  var services = Services.find({
    'projectId': projectId,
    'service': {
      '$regex': lairServiceRegex
    }
  }).fetch()
  if (services.length < 1) {
    console.log('No services found')
    return
  }
  services.forEach(function (service) {
    Services.update({
      '_id': service._id
    }, {
      $set: {
        'status': lairColor,
        'lastModifiedBy': modifiedBy
      }
    })
  })
  console.log('Total of ' + services.length + ' service(s) updated to ' + lairColor + '.')
}
