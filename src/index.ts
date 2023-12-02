import chalk from "chalk";
import fs from "node:fs/promises";
import path from "node:path";
import { until } from "@open-draft/until";
import process from "node:process";
import { answers } from "./answers";

async function main(start = 1, end = 25): Promise<void> {
  for (let i = start; i <= end; i++) {
    const moduleDir = path.resolve(process.cwd(), "src", i.toString());
    const inputPath = path.resolve(moduleDir, "input.txt");

    const { error: inputReadError, data: input } = await until<
      NodeJS.ErrnoException,
      string
    >(() => fs.readFile(inputPath, { encoding: "utf8" }));

    if (inputReadError) {
      console.log(
        `--- Skipping day ${chalk.blue(i)}: ${chalk.yellow(
          inputReadError.code === "ENOENT"
            ? "input.txt not found"
            : inputReadError.code,
        )}`,
      );
      continue;
    }

    console.log(`--- Processing puzzle for day: ${chalk.blue(i)} `);

    const { part1, part2 } = await import(moduleDir);
    const attempt1 = part1(input);
    const attempt2 = part2(input);

    const [known1, known2] = answers[i] ?? [];

    if (known1 !== undefined) {
      console.log(
        `Checking ${chalk.cyan(attempt1)} === ${chalk.cyan(known1)}: `,
        attempt1 === known1 ? "✅" : "❌",
      );
    } else if (attempt1 !== undefined) {
      console.log(`Found solution: ${attempt1} `);
    }

    if (known2 !== undefined) {
      console.log(
        `Checking ${chalk.cyan(attempt2)} === ${chalk.cyan(known2)}: `,
        attempt2 === known2 ? "✅" : "❌",
      );
    } else if (attempt2 !== undefined) {
      console.log(`Found solution: ${attempt2} `);
    }
  }
}

main();
