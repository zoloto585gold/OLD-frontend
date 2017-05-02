var Z585 = Z585 || {};

Z585.define = function (namespace) {
	var parts = namespace.split('.'),
		parent = Z585,
		i;

	if(parts[0] === 'Z585') {
		parts = parts.slice(1);
	}

	for(i = 0; i < parts.length; i++) {
		if(typeof parent[parts[i]] === 'undefined') {
			parent[parts[i]] = {};
		}

		parent = parent[parts[i]];
	}

	return parent;
};