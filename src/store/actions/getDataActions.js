import Global from '../global'
import actionTypes from '../actionTypes'
const KCG_GOV_DATA_URL = Global.ROOT_URL + '/api/action/datastore_search'
const KCG_GOV_SQL_DATA_URL = Global.ROOT_URL + '/api/action/datastore_search_sql'
const resourceId = '92290ee5-6e61-456f-80c0-249eae2fcc97'

export function getZoneValues() {
  return function(dispatch) {

    const params = new URLSearchParams({
      resource_id: resourceId,
      fields: 'Zone',
      limit: 500,
      offset: 0
    })

    // console.log(params2.toString())

    const promise = new Promise((resolve, reject) => {
      fetch(KCG_GOV_DATA_URL + '?' + params, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        mode: 'cors'
      })
      .then(response => {
        if (response.status !== 200) {
          response
            .text()
            .then(result => reject(result))
            .catch(error => reject(error))
        } else {
          let contentType = response.headers.get('Content-type')
          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then(result => {
                if (result) {
                  resolve(result)
                } else reject();
              })
              .catch(error => reject(error))
          } else {
            response
              .text()
              .then(result => resolve(result))
              .catch(error => reject(error))
          }
        }
      })
      .catch(error => reject(error))
    })

    return promise
  }
}

export function getCateValues() {
  return function(dispatch) {
    const params = new URLSearchParams({
      resource_id: resourceId,
      limit: 500,
      offset: 0
    })
    params.append('fields', 'Class1')
    params.append('fields', 'Class2')

    // console.log(params.toString())

    const promise = new Promise((resolve, reject) => {
      fetch(KCG_GOV_DATA_URL + '?' + params, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        mode: 'cors'
      })
      .then(response => {
        if (response.status !== 200) {
          response
            .text()
            .then(result => reject(result))
            .catch(error => reject(error))
        } else {
          let contentType = response.headers.get('Content-type')
          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then(result => {
                if (result) {
                  resolve(result)
                } else reject();
              })
              .catch(error => reject(error))
          } else {
            response
              .text()
              .then(result => resolve(result))
              .catch(error => reject(error))
          }
        }
      })
      .catch(error => reject(error))
    })

    return promise
  }
}

export function getItemInfo(itemid) {
  return function(dispatch) {
    let params = "sql=SELECT * from \"" + resourceId + "\" WHERE \"Id\"='"+itemid+"'";
    // console.log(params)
    const promise = new Promise((resolve, reject) => {
      fetch(KCG_GOV_SQL_DATA_URL + '?' + params, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        mode: 'cors'
      })
        .then(response => {
          if (response.status !== 200) {
            response
              .text()
              .then(result => reject(result))
              .catch(error => reject(error))
          } else {
            let contentType = response.headers.get('Content-type')
            if (contentType.indexOf('json') !== -1) {
              response
                .json()
                .then(result => {
                  if (result) {
                    let records = result.result.records;
                    // console.log(records)
                    resolve(records)
                  } else reject();
                })
                .catch(error => reject(error))
            } else {
              response
                .text()
                .then(result => resolve(result.result.records))
                .catch(error => reject(error))
            }
          }
        })
        .catch(error => reject(error))
    })

    return promise
  }
}

export function getItemsList(pageCount) {
  return function(dispatch) {
    
    function updatePageCount(pageCount) {
      return {
        type: actionTypes.updatePageCount,
        pageCount
      }
    }

    dispatch(updatePageCount(pageCount));

    let offset = (pageCount-1) * 10;

    const params = new URLSearchParams({
      resource_id: resourceId,
      limit: 10,
      offset: offset
    })

    const promise = new Promise((resolve, reject) => {
      fetch(KCG_GOV_DATA_URL + '?' + params, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        mode: 'cors'
      })
        .then(response => {
          if (response.status !== 200) {
            response
              .text()
              .then(result => reject(result))
              .catch(error => reject(error))
          } else {
            let contentType = response.headers.get('Content-type')
            if (contentType.indexOf('json') !== -1) {
              response
                .json()
                .then(result => {
                  if (result) {
                    // console.log(456)
                    resolve(result.result.records)
                  } else reject();
                })
                .catch(error => reject(error))
            } else {
              response
                .text()
                .then(result => resolve(result.result.records))
                .catch(error => reject(error))
            }
          }
        })
        .catch(error => reject(error))
    })

    return promise
  }
}

export function getSqlItemsList(pageCount, filter) {
  // console.log('getSqlData')
  return function (dispatch) {

    function updatePageCount(pageCount) {
      return {
        type: actionTypes.updatePageCount,
        pageCount
      }
    }

    dispatch(updatePageCount(pageCount));

    let offset = (pageCount - 1) * 10;

    let params = "";
    
    let zonesql = '',
      catesql = '',
      ticketsql = '',
      sql = '';

    if (filter.zoneTags.length > 0) {
      if (filter.zoneTags.length === 1) {
        zonesql = '"Zone"=\'' + filter.zoneTags[0] + "'";
      } else {
        zonesql = '"Zone"=\'' + filter.zoneTags.join('\' OR "Zone"=\'') + "'";
        zonesql = '(' + zonesql + ')';
      }
    }
    if (filter.cateTags.length > 0) {
      if (filter.cateTags.length === 1) {
        catesql = '"Class1"=\'' + filter.cateTags[0] + "'";
      } else {
        catesql = '"Class1"=\'' + filter.cateTags.join('\' OR "Class1"=\'') + "'";
        catesql = '(' + catesql + ')';
      }
    }
    if (filter.isFreeTag) {
      ticketsql = '"Ticketinfo"=\'免費參觀\'';
    }

    if (zonesql !== '' && catesql !== '' && ticketsql !== '') {
      sql = zonesql + " AND " + catesql + " AND " + ticketsql;

    } else if (zonesql !== '' && catesql !== '') {
      sql = zonesql + " AND " + catesql;

    } else if (zonesql !== '' && ticketsql !== '') {
      sql = zonesql + " AND " + ticketsql;

    } else if (catesql !== '' && ticketsql !== '') {
      sql = catesql + " AND " + ticketsql;

    } else if (zonesql !== '') {
      sql = zonesql;
    } else if (catesql !== '') {
      sql = catesql;
    } else if (ticketsql !== '') {
      sql = ticketsql;
    }
    
    params = "sql=SELECT * from \"" + resourceId + "\" WHERE " + sql +" LIMIT 10 OFFSET "+ offset;
    // console.log(params)

    const promise = new Promise((resolve, reject) => {
      fetch(KCG_GOV_SQL_DATA_URL + '?' + params, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        mode: 'cors'
      })
        .then(response => {
          if (response.status !== 200) {
            response
              .text()
              .then(result => reject(result))
              .catch(error => reject(error))
          } else {
            let contentType = response.headers.get('Content-type')
            if (contentType.indexOf('json') !== -1) {
              response
                .json()
                .then(result => {
                  if (result) {
                    let records = result.result.records;
                    // console.log(records)
                    resolve(records)
                  } else reject();
                })
                .catch(error => reject(error))
            } else {
              response
                .text()
                .then(result => resolve(result.result.records))
                .catch(error => reject(error))
            }
          }
        })
        .catch(error => reject(error))
    })

    return promise
  }
}

export function getItemsTotalNum() {
  return function (dispatch) {
    function updateItemsTotal(total) {
      return {
        type: actionTypes.updateItemsTotal,
        total
      }
    }

    let params = "sql=SELECT count(*) from \"" + resourceId + "\"";
    
    const promise = new Promise((resolve, reject) => {
      fetch(KCG_GOV_SQL_DATA_URL + '?' + params, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        mode: 'cors'
      })
        .then(response => {
          if (response.status !== 200) {
            response
              .text()
              .then(result => reject(result))
              .catch(error => reject(error))
          } else {
            let contentType = response.headers.get('Content-type')
            if (contentType.indexOf('json') !== -1) {
              response
                .json()
                .then(result => {
                  if (result) {
                    let total = parseInt(result.result.records[0].count);

                    dispatch(updateItemsTotal(total));
                    resolve(total);
                  } else reject();
                })
                .catch(error => reject(error))
            } else {
              response
                .text()
                .then(result => resolve(result.result.records))
                .catch(error => reject(error))
            }
          }
        })
        .catch(error => reject(error))
    })
  
    return promise
  }
}

export function getFilterItemsTotalNum(filter) {
  // console.log('filterNumTotal')
  return function (dispatch) {
    function updateItemsTotal(total) {
      return {
        type: actionTypes.updateItemsTotal,
        total
      }
    }

    let params = "";

    let zonesql = '',
      catesql = '',
      ticketsql = '',
      opensql = '',
      sql = '';

    if (filter.zoneTags.length > 0) {
      if (filter.zoneTags.length === 1) {
        zonesql = '"Zone"=\'' + filter.zoneTags[0] + "'";
      } else {
        zonesql = '"Zone"=\'' + filter.zoneTags.join('\' OR "Zone"=\'') + "'";
        zonesql = '(' + zonesql + ')';
      }
    } 
    if (filter.cateTags.length > 0) {
      if (filter.cateTags.length === 1) {
        catesql = '"Class1"=\'' + filter.cateTags[0] + "'";
      } else {
        catesql = '"Class1"=\'' + filter.cateTags.join('\' OR "Class1"=\'') + "'";
        catesql = '(' + catesql + ')';
      }
    }
    if(filter.isFreeTag) {
      ticketsql = '"Ticketinfo"=\'免費參觀\'';
    }

    if (zonesql !== '' && catesql !== '' && ticketsql !== '') {
      sql = zonesql + " AND " + catesql + " AND " + ticketsql;

    } else if (zonesql !== '' && catesql !== '') {
      sql = zonesql + " AND " + catesql;

    } else if (zonesql !== '' && ticketsql !== ''){
      sql = zonesql + " AND " + ticketsql;

    } else if (catesql !== '' && ticketsql !== '') {
      sql = catesql + " AND " + ticketsql;
      
    } else if (zonesql !== '') {
      sql = zonesql;
    } else if (catesql !== '') {
      sql = catesql;
    } else if (ticketsql !== '') {
      sql = ticketsql;
    }
   
    params = "sql=SELECT count(*) from \"" + resourceId + "\" WHERE " + sql ;
    // console.log('sql', params)
    const promise = new Promise((resolve, reject) => {
      fetch(KCG_GOV_SQL_DATA_URL + '?' + params, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        mode: 'cors'
      })
        .then(response => {
          if (response.status !== 200) {
            response
              .text()
              .then(result => reject(result))
              .catch(error => reject(error))
          } else {
            let contentType = response.headers.get('Content-type')
            if (contentType.indexOf('json') !== -1) {
              response
                .json()
                .then(result => {
                  if (result) {
                    let total = parseInt(result.result.records[0].count);
                    dispatch(updateItemsTotal(total));
                    resolve(total);
                  } else reject();
                })
                .catch(error => reject(error))
            } else {
              response
                .text()
                .then(result => resolve(result.result.records))
                .catch(error => reject(error))
            }
          }
        })
        .catch(error => reject(error))
    })

    return promise
  }
}