/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	rootDir: "./services",
	roots: ["../test"],
	coverageDirectory: "<rootDir>/coverage",
	coverageReporters: ["json", "html"],
	reporters: [
		"default",
		[
			"jest-html-reporter",
			{
				outputPath: "./public/test-report.html",
			},
		],
	],
};
