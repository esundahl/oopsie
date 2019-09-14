
module.exports = function (e, req, res) {
	const status = e.statusCode || e.status || validErrorCode(e)
	const message = status > 499 ? sanitize(status) : e.message
	res.status(status).json({status, message: m(status, message)})
}

function m(status, message) {
	if (message) return message
	switch (status) {
		case 401: return 'Unauthorized'
		case 404: return 'Not Found'
		default: return message
	}
}

function sanitize(status) {
	switch (status) {
	case 501: return 'Not Implemented'
	case 502: return 'Bad Gateway'
	case 503: return 'Service Unavailable'
	case 504: return 'Gateway Timeout'
	case 505: return 'HTTP Version Not Supported'
	case 506: return 'Variant Also Negotiates'
	case 507: return 'Insufficient Storage'
	case 508: return 'Loop Detected'
	case 510: return 'Not Extended'
	case 511: return 'Network Authentication Required'
	default: return 'Internal Server Error'
	}
}

function validErrorCode(code) {
	return (typeof code === 'number' && (code % 1) === 0 && code.toString().length === 3)
		? code
		: 500
}
