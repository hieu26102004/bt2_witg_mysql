// Tự động chọn service phù hợp theo môi trường
let service;
const env = process.env.NODE_ENV || 'development';

if (env === 'development_mongo') {
    service = require('./MongoCRUDService.js');
    // Nếu MongoCRUDService dùng export default:
    if (service.default) service = service.default;
} else {
    service = require('./CRUDService.js');
}

module.exports = service;
