import { ObjectId } from 'bson'

const TYPEOF_COLLECTION = 'object'

export const isModel = x => Boolean(x && x.name === 'model')

export const isCollectionOrModel = x =>
  Boolean(x && (typeof x === TYPEOF_COLLECTION || isModel(x)))

export const getCollection = x => (isModel(x) ? x.collection : x)

export const isObjectId = id => {
  // Extracted from:
  // https://github.com/mongodb/js-bson/blob/master/src/objectid.ts#L312
  if (id instanceof ObjectId) {
    return true
  }

  // Duck-Typing detection of ObjectId like objects
  if (
    typeof id === 'object' &&
    'toHexString' in id &&
    typeof id.toHexString === 'function'
  ) {
    if (typeof id.id === 'string') {
      return id.id.length === 12
    }
    return (
      id.toHexString().length === 24 &&
      checkForHexRegExp.test(id.id.toString('hex'))
    )
  }

  return false
}

// Regular expression that checks for hex value
const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
