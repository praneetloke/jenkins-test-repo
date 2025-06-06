import fs from "fs";
import path from "path";

import { expect, test } from "vitest";

import { sum } from "./sum.js";

test("adds two numbers", async () => {
    await fs.promises.mkdir("logs");
    await fs.promises.writeFile(
        path.join("logs", "sum.test.log"),
        "calling sum with args 1,2"
    );
    const result = sum(1, 2);
    expect(result).toBe(4);
});
