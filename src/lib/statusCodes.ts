/**
 * For now based on this:
 https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
 */

const commonStatuses = [
  100,
  101,
  103,

  200,
  202,
  203,
  204,
  205,
  206,
  207,
  208,
  226,

  300,
  301,
  302,
  303,
  304,
  307,
  308,

  400,
  401,
  402,
  403,
  404,
  405,
  406,
  407,
  408,
  409,
  410,
  411,
  412,
  413,
  414,
  415,
  416,
  417,
  418,
  422,
  425,
  426,
  428,
  429,
  431,
  451,
  499,

  500,
  501,
  502,
  503,
  504,
  505,
  511,
  521,
]

export const getGETStatuses = () => {
  const getStatuses = commonStatuses.slice()
  getStatuses.push(200)
  return getStatuses
}

// TODO Post, same almost but remove
// 200 and add 201

// for others, just remove 200

// TODO have standard, add 200 for
// get & 201 for post
