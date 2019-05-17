export function fetchApi(url, options = {}) {
	return fetch(url, {
		mode: "cors",
		method: "GET",
		...options
	})
		.then(res => {
			if (res.ok || res.status === 404) {
				return Promise.resolve(res);
			}

			return Promise.reject(res);
		})
		.then(res => {
			const { headers } = res;

			const contentType = headers && headers.get("Content-Type");
			const isJSON = contentType && contentType.includes("application/json");

			if (isJSON) {
				return res.json();
			}

			return res;
		});
}

export function queryFormatHelper(query = []) {
	if (!Array.isArray(query)) {
		return "";
	}

	return query.reduce((acc, q, index) => {
		const prefix = index === 0 ? "?" : "&";

		return `${acc}${prefix}${q}`;
	}, "");
}
