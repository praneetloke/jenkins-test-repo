import fs from "fs";
import path from "path";

import ejs from "ejs";

interface AssertionResult {
    // Some fields have been omitted for brevity.

    fullName: string;
    status: string;
    title: string;
    failureMessages: string[];
}

interface TestResult {
    // Some fields have been omitted for brevity.

    status: string;
    name: string;
    assertionResults: AssertionResult[];
}

interface TestReport {
    // Some fields have been omitted for brevity.

    success: boolean;
    numFailedTestSuites: number;
    numFailedTests: number;
    testResults: TestResult[];
}

async function main() {
    const reportJson = await fs.promises.readFile("test-report.json", "utf-8");
    const testReport: TestReport = JSON.parse(reportJson);
    const html = await ejs.renderFile(
        path.join(
            process.cwd(),
            "summaryGenerator",
            "views",
            "buildDescription.ejs"
        ),
        { testReport, jobUrl: process.env.BUILD_URL }
    );
    await fs.promises.writeFile(path.join(process.cwd(), "summary.html"), html);
}

main().catch((err) => console.error("Error running main", err));
