const API_KEY = 'rex_6f04eubgjBIXJhXGqF4PEm9VfFGMok32E1aZOZSlKaQ6iWvZ';
const BASE    = 'https://rexactivator.com';

exports.handler = async (event) => {
  const cors = {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: cors, body: '' };

  try {
    const { path: apiPath, body: reqBody } = JSON.parse(event.body || '{}');
    const url    = `${BASE}${apiPath}`;
    const isPost = !!reqBody;

    const res = await fetch(url, {
      method:  isPost ? 'POST' : 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
      ...(isPost ? { body: JSON.stringify(reqBody) } : {}),
    });

    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : { _raw: '(respuesta vacía)', status: res.status };
    } catch (_) {
      data = { _raw: text, status: res.status };
    }
    return { statusCode: res.status, headers: { ...cors, 'Content-Type': 'application/json' }, body: JSON.stringify(data) };
  } catch (e) {
    return { statusCode: 500, headers: { ...cors, 'Content-Type': 'application/json' }, body: JSON.stringify({ error: e.message }) };
  }
};
