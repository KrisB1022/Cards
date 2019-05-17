import { fetchApi, getData, queryFormatHelper } from "../AjaxHelpers";

beforeEach(() => {
	global.fetch.mockClear();
});

// beforeAll(() => {
// 	global.fetch.mockImplementation((...args) => {
// 		return Promise.resolve({
// 			ok: true,
// 			status: 200,
// 			json: () => args,
// 			headers: {
// 				get: jest.fn().mockReturnValue("application/json")
// 			}
// 		});
// 	});
// });

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
		const expected = "json called";
		const okay = {
			ok: true,
			status: 200,
			json: jest.fn().mockReturnValue(expected),
			headers: {
				get: jest.fn().mockReturnValue("application/json")
			}
		};

		global.fetch.mockImplementationOnce(() => {
			return Promise.resolve(okay);
		});

		const response = await fetchApi(url);

		expect(global.fetch).toHaveBeenCalledTimes(1);
		expect(okay.json).toHaveBeenCalledTimes(1);
		expect(okay.headers.get).toHaveBeenCalledTimes(1);
		expect(response).toMatch(expected);
	});

	it("resolves Promise if status = 404", async () => {
		const expected = "json called";
		const okay = {
			ok: false,
			status: 404,
			json: jest.fn().mockReturnValue(expected),
			headers: {
				get: jest.fn().mockReturnValue("application/json")
			}
		};

		global.fetch.mockImplementationOnce(() => {
			return Promise.resolve(okay);
		});

		const response = await fetchApi(url);

		expect(global.fetch).toHaveBeenCalledTimes(1);
		expect(okay.json).toHaveBeenCalledTimes(1);
		expect(okay.headers.get).toHaveBeenCalledTimes(1);
		expect(response).toMatch(expected);
	});

	it("returns response if contentType != json", async () => {
		const expected = "json called...";
		const okay = {
			ok: false,
			status: 404,
			json: jest.fn().mockReturnValue(expected),
			headers: {
				get: jest.fn().mockReturnValue("plain/text")
			}
		};

		global.fetch.mockImplementationOnce(() => {
			return Promise.resolve(okay);
		});

		const response = await fetchApi(url);

		expect(global.fetch).toHaveBeenCalledTimes(1);
		expect(okay.json).not.toHaveBeenCalled();
		expect(okay.headers.get).toHaveBeenCalledTimes(1);
		expect(response).toEqual(okay);
	});

	it("rejects Promise if if res.ok is false", async () => {
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

it("returns empty string for query that is not an array", () => {
	expect(queryFormatHelper(1234)).toMatch("");
});

it("returns correct query", () => {
	const query = [["query1"], ["query2"], [4]];
	expect(queryFormatHelper(query)).toMatch("?query1&query2&4");
});
