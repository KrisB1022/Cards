import * as endpoints from "../ApiEndpoints";

it("matches snapshot", () => {
	expect(endpoints).toMatchSnapshot();
});
