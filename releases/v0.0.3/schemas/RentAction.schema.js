export const RentAction = {
  label: "RentAction",
  description: `The act of giving money in return for temporary use, but not ownership, of an
object such as a vehicle or property. For example, an agent rents a property
from a landlord in exchange for a periodic payment.`,
  _id: {
    viewableBy: ["guests"],
    editableBy: ["members"],
    insertableBy: ["members"],
    type: String,
    optional: true,
  },
  createdAt: {
    viewableBy: ["guests"],
    editableBy: ["members"],
    insertableBy: ["members"],
    type: Date,
    optional: true,
    viewableBy: ["guests"],
    onInsert: (document, context) => {
      return new Date()
    },
  },
  userId: {
    viewableBy: ["guests"],
    editableBy: ["members"],
    insertableBy: ["members"],
    type: String,
    optional: true,
    resolveAs: {
      fieldName: "user",
      type: "User",
      resolver: (document, args, context) => {
        return context.Users.findOne(
          { _id: document.userId },
          {
            fields: context.Users.getViewableFields(
              context.currentUser,
              context.Users
            ),
          }
        )
      },
      optional: true,
    },
  },
  sameAs: {
    label: "sameAs",
    description: `URL of a reference Web page that unambiguously indicates the item's identity.
E.g. the URL of the item's Wikipedia page, Wikidata entry, or official website.`,
    viewableBy: ["guests"],
    editableBy: ["members"],
    insertableBy: ["members"],
    type: String,
    input: "url",
  },
  alternateName: {
    label: "alternateName",
    description: `An alias for the item.`,
    viewableBy: ["guests"],
    editableBy: ["members"],
    insertableBy: ["members"],
    type: String,
  },
  image: {
    label: "image",
    description: `An image of the item. This can be a URL or a fully described ImageObject.`,
    viewableBy: ["guests"],
    editableBy: ["members"],
    insertableBy: ["members"],
    resolveAs: {
      fieldName: "ImageObjectResolved",
      type: "ImageObject",
      resolver: (document, args, context) => {
        return context.ImageObject.findOne(
          { _id: document.ImageObject },
          {
            fields: context.ImageObject.getViewableFields(
              context.currentUser,
              context.ImageObject
            ),
          }
        )
      },
      optional: true,
    },
  },
  additionalType: {
    label: "additionalType",
    description: `An additional type for the item, typically used for adding more specific types
from external vocabularies in microdata syntax. This is a relationship between
something and a class that the thing is in. In RDFa syntax, it is better to use
the native RDFa syntax - the 'typeof' attribute - for multiple types. Schema.org
tools may have only weaker understanding of extra types, in particular those
defined externally.`,
    viewableBy: ["guests"],
    editableBy: ["members"],
    insertableBy: ["members"],
    type: String,
    input: "url",
  },
  name: {
    label: "name",
    description: `The name of the item.`,
    viewableBy: ["guests"],
    editableBy: ["members"],
    insertableBy: ["members"],
    type: String,
  },
  identifier: {
    label: "identifier",
    description: `The identifier property represents any kind of identifier for any kind of Thing,
such as ISBNs, GTIN codes, UUIDs etc. Schema.org provides dedicated properties
for representing many of these, either as textual strings or as URL (URI) links.
See background notes for more details.`,
    viewableBy: ["guests"],
    editableBy: ["members"],
    insertableBy: ["members"],
    type: String,
    input: "url",
  },
  mainEntityOfPage: {
    label: "mainEntityOfPage",
    description: `Indicates a page (or other CreativeWork) for which this thing is the main entity
being described. See background notes for details.`,
    viewableBy: ["guests"],
    editableBy: ["members"],
    insertableBy: ["members"],
    type: String,
    input: "url",
  },
  url: {
    label: "url",
    description: `URL of the item.`,
    viewableBy: ["guests"],
    editableBy: ["members"],
    insertableBy: ["members"],
    type: String,
    input: "url",
  },
  potentialAction: {
    label: "potentialAction",
    description: `Indicates a potential Action, which describes an idealized action in which this
thing would play an 'object' role.`,
    viewableBy: ["guests"],
    editableBy: ["members"],
    insertableBy: ["members"],
    resolveAs: {
      fieldName: "ActionResolved",
      type: "Action",
      resolver: (document, args, context) => {
        return context.Action.findOne(
          { _id: document.Action },
          {
            fields: context.Action.getViewableFields(
              context.currentUser,
              context.Action
            ),
          }
        )
      },
      optional: true,
    },
  },
  description: {
    label: "description",
    description: `A description of the item.`,
    viewableBy: ["guests"],
    editableBy: ["members"],
    insertableBy: ["members"],
    type: String,
  },
  disambiguatingDescription: {
    label: "disambiguatingDescription",
    description: `A sub property of description. A short description of the item used to
disambiguate from other, similar items. Information from other properties (in
particular, name) may be necessary for the description to be useful for
disambiguation.`,
    viewableBy: ["guests"],
    editableBy: ["members"],
    insertableBy: ["members"],
    type: String,
  },
  result: {
    label: "result",
    description: `The result produced in the action. e.g. John wrote a book.`,
    viewableBy: ["guests"],
    editableBy: ["members"],
    insertableBy: ["members"],
    resolveAs: {
      fieldName: "ThingResolved",
      type: "Thing",
      resolver: (document, args, context) => {
        return context.Thing.findOne(
          { _id: document.Thing },
          {
            fields: context.Thing.getViewableFields(
              context.currentUser,
              context.Thing
            ),
          }
        )
      },
      optional: true,
    },
  },
  startTime: {
    label: "startTime",
    description: `The startTime of something. For a reserved event or service (e.g.
FoodEstablishmentReservation), the time that it is expected to start. For
actions that span a period of time, when the action was performed. e.g. John
wrote a book from January to December.

Note that Event uses startDate/endDate instead of startTime/endTime, even when
describing dates with times. This situation may be clarified in future
revisions.`,
    viewableBy: ["guests"],
    editableBy: ["members"],
    insertableBy: ["members"],
    type: Date,
    input: "datetime",
  },
  actionStatus: {
    label: "actionStatus",
    description: `Indicates the current disposition of the Action.`,
    viewableBy: ["guests"],
    editableBy: ["members"],
    insertableBy: ["members"],
    resolveAs: {
      fieldName: "ActionStatusTypeResolved",
      type: "ActionStatusType",
      resolver: (document, args, context) => {
        return context.ActionStatusType.findOne(
          { _id: document.ActionStatusType },
          {
            fields: context.ActionStatusType.getViewableFields(
              context.currentUser,
              context.ActionStatusType
            ),
          }
        )
      },
      optional: true,
    },
  },
  target: {
    label: "target",
    description: `Indicates a target EntryPoint for an Action.`,
    viewableBy: ["guests"],
    editableBy: ["members"],
    insertableBy: ["members"],
    resolveAs: {
      fieldName: "EntryPointResolved",
      type: "EntryPoint",
      resolver: (document, args, context) => {
        return context.EntryPoint.findOne(
          { _id: document.EntryPoint },
          {
            fields: context.EntryPoint.getViewableFields(
              context.currentUser,
              context.EntryPoint
            ),
          }
        )
      },
      optional: true,
    },
  },
  agent: {
    label: "agent",
    description: `The direct performer or driver of the action (animate or inanimate). e.g. John 
wrote a book.`,
    viewableBy: ["guests"],
    editableBy: ["members"],
    insertableBy: ["members"],
    resolveAs: {
      fieldName: "PersonResolved",
      type: "Person",
      resolver: (document, args, context) => {
        return context.Person.findOne(
          { _id: document.Person },
          {
            fields: context.Person.getViewableFields(
              context.currentUser,
              context.Person
            ),
          }
        )
      },
      optional: true,
    },
  },
  endTime: {
    label: "endTime",
    description: `The endTime of something. For a reserved event or service (e.g.
FoodEstablishmentReservation), the time that it is expected to end. For actions
that span a period of time, when the action was performed. e.g. John wrote a
book from January to December.

Note that Event uses startDate/endDate instead of startTime/endTime, even when
describing dates with times. This situation may be clarified in future
revisions.`,
    viewableBy: ["guests"],
    editableBy: ["members"],
    insertableBy: ["members"],
    type: Date,
    input: "datetime",
  },
  participant: {
    label: "participant",
    description: `Other co-agents that participated in the action indirectly. e.g. John wrote a
book with Steve.`,
    viewableBy: ["guests"],
    editableBy: ["members"],
    insertableBy: ["members"],
    resolveAs: {
      fieldName: "OrganizationResolved",
      type: "Organization",
      resolver: (document, args, context) => {
        return context.Organization.findOne(
          { _id: document.Organization },
          {
            fields: context.Organization.getViewableFields(
              context.currentUser,
              context.Organization
            ),
          }
        )
      },
      optional: true,
    },
  },
  instrument: {
    label: "instrument",
    description: `The object that helped the agent perform the action. e.g. John wrote a book with 
a pen.`,
    viewableBy: ["guests"],
    editableBy: ["members"],
    insertableBy: ["members"],
    resolveAs: {
      fieldName: "ThingResolved",
      type: "Thing",
      resolver: (document, args, context) => {
        return context.Thing.findOne(
          { _id: document.Thing },
          {
            fields: context.Thing.getViewableFields(
              context.currentUser,
              context.Thing
            ),
          }
        )
      },
      optional: true,
    },
  },
  object: {
    label: "object",
    description: `The object upon which the action is carried out, whose state is kept intact or
changed. Also known as the semantic roles patient, affected or undergoer (which
change their state) or theme (which doesn't). e.g. John read a book.`,
    viewableBy: ["guests"],
    editableBy: ["members"],
    insertableBy: ["members"],
    resolveAs: {
      fieldName: "ThingResolved",
      type: "Thing",
      resolver: (document, args, context) => {
        return context.Thing.findOne(
          { _id: document.Thing },
          {
            fields: context.Thing.getViewableFields(
              context.currentUser,
              context.Thing
            ),
          }
        )
      },
      optional: true,
    },
  },
  error: {
    label: "error",
    description: `For failed actions, more information on the cause of the failure.`,
    viewableBy: ["guests"],
    editableBy: ["members"],
    insertableBy: ["members"],
    resolveAs: {
      fieldName: "ThingResolved",
      type: "Thing",
      resolver: (document, args, context) => {
        return context.Thing.findOne(
          { _id: document.Thing },
          {
            fields: context.Thing.getViewableFields(
              context.currentUser,
              context.Thing
            ),
          }
        )
      },
      optional: true,
    },
  },
  location: {
    label: "location",
    description: `The location of for example where the event is happening, an organization is
located, or where an action takes place.`,
    viewableBy: ["guests"],
    editableBy: ["members"],
    insertableBy: ["members"],
    resolveAs: {
      fieldName: "PostalAddressResolved",
      type: "PostalAddress",
      resolver: (document, args, context) => {
        return context.PostalAddress.findOne(
          { _id: document.PostalAddress },
          {
            fields: context.PostalAddress.getViewableFields(
              context.currentUser,
              context.PostalAddress
            ),
          }
        )
      },
      optional: true,
    },
  },
  priceSpecification: {
    label: "priceSpecification",
    description: `One or more detailed price specifications, indicating the unit price and
delivery or payment charges.`,
    viewableBy: ["guests"],
    editableBy: ["members"],
    insertableBy: ["members"],
    resolveAs: {
      fieldName: "PriceSpecificationResolved",
      type: "PriceSpecification",
      resolver: (document, args, context) => {
        return context.PriceSpecification.findOne(
          { _id: document.PriceSpecification },
          {
            fields: context.PriceSpecification.getViewableFields(
              context.currentUser,
              context.PriceSpecification
            ),
          }
        )
      },
      optional: true,
    },
  },
  price: {
    label: "price",
    description: `The offer price of a product, or of a price component when attached to
PriceSpecification and its subtypes.

Usage guidelines:

 * Use the priceCurrency property (with standard formats: ISO 4217 currency
   format e.g. "USD"; Ticker symbol for cryptocurrencies e.g. "BTC"; well known
   names for Local Exchange Tradings Systems (LETS) and other currency types
   e.g. "Ithaca HOUR") instead of including ambiguous symbols such as '$' in the
   value.
 * Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal
   point. Avoid using these symbols as a readability separator.
 * Note that both RDFa and Microdata syntax allow the use of a "content="
   attribute for publishing simple machine-readable values alongside more
   human-friendly formatting.
 * Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE'
   (U+0039)) rather than superficially similiar Unicode symbols.`,
    viewableBy: ["guests"],
    editableBy: ["members"],
    insertableBy: ["members"],
    type: Number,
    input: "number",
  },
  landlord: {
    label: "landlord",
    description: `A sub property of participant. The owner of the real estate property.`,
    viewableBy: ["guests"],
    editableBy: ["members"],
    insertableBy: ["members"],
    resolveAs: {
      fieldName: "PersonResolved",
      type: "Person",
      resolver: (document, args, context) => {
        return context.Person.findOne(
          { _id: document.Person },
          {
            fields: context.Person.getViewableFields(
              context.currentUser,
              context.Person
            ),
          }
        )
      },
      optional: true,
    },
  },
  realEstateAgent: {
    label: "realEstateAgent",
    description: `A sub property of participant. The real estate agent involved in the action.`,
    viewableBy: ["guests"],
    editableBy: ["members"],
    insertableBy: ["members"],
    resolveAs: {
      fieldName: "RealEstateAgentResolved",
      type: "RealEstateAgent",
      resolver: (document, args, context) => {
        return context.RealEstateAgent.findOne(
          { _id: document.RealEstateAgent },
          {
            fields: context.RealEstateAgent.getViewableFields(
              context.currentUser,
              context.RealEstateAgent
            ),
          }
        )
      },
      optional: true,
    },
  },
}
export default RentAction
