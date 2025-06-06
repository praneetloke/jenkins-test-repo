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
        {
            testReport,
            // BUILD_URL is a pre-defined Jenkins env var.
            // https://www.jenkins.io/doc/book/pipeline/jenkinsfile/#using-environment-variables
            jobUrl: process.env.BUILD_URL,
        }
    );

    const outputFile = path.join(process.cwd(), "summary.html");
    await fs.promises.writeFile(outputFile, html);
}

main().catch((err) => console.error("Error running main", err));
