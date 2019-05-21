import { fetchApi, getData, queryFormatHelper } from "../AjaxHelpers";

beforeEach(() => {
	global.fetch.mockClear();
});

describe("fetchApi", () => {
	const url = "aKingsLife.com";
	const options = {
		people: "a person"
	};

	it("has correct url and options", async () => {
		await fetchApi(url, options);

		expect(global.fetch).toHaveBeenCalledTimes(1);
		expect(global.fetch.mock.calls[0][0]).toEqual(url);
		expect(global.fetch.mock.calls[0][1]).toEqual({
			method: "GET",
			mode: "cors",
			...options
		});
	});

	it("resolves Promise if res.ok is true and status = 200", async () => {
		const expected = {
			ok: true
		};

		global.fetch.mockImplementationOnce(() => {
			return Promise.resolve(expected);
		});

		const response = await fetchApi(url);

		expect(global.fetch).toHaveBeenCalledTimes(1);
		expect(response).toEqual(expected);
	});

	it("resolves Promise if status = 404", async () => {
		const expected = {
			ok: false,
			status: 404
		};

		global.fetch.mockImplementationOnce(() => {
			return Promise.resolve(expected);
		});

		const response = await fetchApi(url);

		expect(global.fetch).toHaveBeenCalledTimes(1);
		expect(response).toEqual(expected);
	});

	it("rejects Promise if res.ok is false", async () => {
		const errorMsg = "error happening!";
		const error = {
			ok: false,
			status: 400,
			error: errorMsg
		};

		global.fetch.mockImplementationOnce(() => {
			return Promise.resolve(error);
		});

		const response = await fetchApi("aKingsLife.com").catch(e => e);

		expect(response).toEqual(error);
	});
});

it("returns empty string for empty query", () => {
	expect(queryFormatHelper()).toMatch("");
});

it("returns empty string for query that is empty", () => {
	expect(queryFormatHelper()).toMatch("");

	expect(queryFormatHelper({})).toMatch("");
});

it("returns correct query", () => {
	const queryParams = {
		query1: true,
		query2: false,
		_30: 44
	};

	expect(queryFormatHelper(queryParams)).toMatch("?query1=true&query2=false&_30=44");
});
