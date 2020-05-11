// In-memory DB implementation, as database isn't needed there

export const db = {}
export function exists (uuid) {
    return db.hasOwnProperty(uuid) // eslint-disable-line
}

export function get (uuid) {
  return db[uuid]
}

export function add (uuid, id) {
  db[uuid] = id
}

export function deleteItem (uuid) {
  delete db[uuid]
}
