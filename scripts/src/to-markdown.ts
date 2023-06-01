#!/usr/bin/env -S deno run --allow-net --allow-read --allow-write

import { Readability } from "npm:@mozilla/readability";
import { NodeHtmlMarkdown } from "npm:node-html-markdown";
import { Window } from "npm:@zuisong/happy-dom-deno";

const BASE_DIR = Deno.cwd() + "/articles";

const mockClientHeaders = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
};

async function saveFile(fileName: string, md: string) {
  await Deno.mkdir(BASE_DIR, { recursive: true });
  await Deno.writeTextFile(fileName, md);
}

const cmdUrl = Deno.args[0];
let url: URL;

try {
  url = new URL(cmdUrl);
} catch (err) {
  console.error("Please provide a valid URL");
  Deno.exit(1);
}

const disableMarkdown = Deno.args.includes("--no-markdown");
const writeToFile = Deno.args.includes("--write");
const response = await fetch(cmdUrl, {
  headers: mockClientHeaders,
});

const html = await response.text();
const window = new Window();
window.document.body.innerHTML = html;

const reader = new Readability(window.document);
const article = reader.parse();

if (!article) {
  console.log(`[error]: failed to parse article from ${cmdUrl}`);
  Deno.exit(1);
}

if (!disableMarkdown) {
  const md = NodeHtmlMarkdown.translate(article.content);

  if (writeToFile) {
    const fileName = `${BASE_DIR}/${url.hostname.replaceAll(".", "_")}_${Date.now()}.md`;
    await saveFile(fileName, md);

    console.log(`[log]: generated file ${fileName} successfully`);
    Deno.exit(0);
  }

  console.log(md);
  Deno.exit(0);
}

if (writeToFile) {
  const fileName = `${BASE_DIR}/${url.hostname}_${Date.now()}.md`;
  await saveFile(fileName, article.textContent);

  console.log(`[log]: generated file ${fileName} successfully`);
  Deno.exit(0);
}

console.log(article.textContent);
Deno.exit(0);
