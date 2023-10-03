const devCors = (req, res, next) => {
  const referer = req.get('referer') || req.get('origin') || '';
  const refererDomains = referer.match(/http(s)?:\/\/[^\/]*/);
  const refererDomain = refererDomains ? refererDomains[0] : '';
  const allowedDomains = [
    'http://127.0.0.1:5173',
    'http://localhost:5173',
    'https://venue-explorer.vercel.app',
  ];

  if (allowedDomains.includes(refererDomain)) {
    res.setHeader('Access-Control-Allow-Origin', refererDomain);
    res.setHeader('Access-Control-Allow-Methods','GET, POST');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials','true');
  }

  next();
}

module.exports = devCors;
