(function () {
	var debug = Z585.define('Z585.debug');

	debug.list = ''; // @string

	debug.log = function (message) {
		this.list += message + '\n';
	};
} ());