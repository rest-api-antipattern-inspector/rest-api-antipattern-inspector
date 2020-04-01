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
  305,
  306,
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
  421,
  422,
  423,
  424,
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
  506,
  507,
  508,
  510,
  511,
]

export const getGETStatuses = () => {
  const copyOfStatuses = commonStatuses.slice()
  copyOfStatuses.push(200)
  return copyOfStatuses
}

// TODO have standard, add 200 for
// get & 201 for post
