import { readFileSync } from "node:fs";

const STABLE_VERSION = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

const fail = (message) => {
  throw new Error(message);
};

const parseStableVersion = (version) => {
  const match = STABLE_VERSION.exec(version);

  if (!match) {
    fail(`バージョンは 1.2.3 のように入力してください: ${version}`);
  }

  return match.slice(1).map(Number);
};

const compareVersions = (left, right) => {
  const leftParts = parseStableVersion(left);
  const rightParts = parseStableVersion(right);

  for (let index = 0; index < leftParts.length; index += 1) {
    if (leftParts[index] > rightParts[index]) return 1;
    if (leftParts[index] < rightParts[index]) return -1;
  }

  return 0;
};

const [targetVersion, publishedVersionsPath] = process.argv.slice(2);

parseStableVersion(targetVersion);

const publishedVersions = JSON.parse(
  readFileSync(publishedVersionsPath, "utf8"),
);

if (publishedVersions.includes(targetVersion)) {
  fail(`${targetVersion} はすでにnpmへ公開されています`);
}

const latestVersion = publishedVersions
  .filter((version) => STABLE_VERSION.test(version))
  .reduce((latest, version) =>
    compareVersions(version, latest) > 0 ? version : latest,
  );

// 古いバージョンを公開するとnpmのlatestタグが巻き戻ってしまう
if (compareVersions(targetVersion, latestVersion) <= 0) {
  fail(
    `${targetVersion} はnpm上の最新安定版 ${latestVersion} より新しくありません`,
  );
}

console.log(`公開バージョン: ${latestVersion} -> ${targetVersion}`);
