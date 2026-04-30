/**
 * Reads `stargazers_count` from the public GitHub API (no auth). Returns
 * `undefined` if the request fails or the field is missing.
 */
export const fetchGitHubStargazerCount = async (
  repo: string,
): Promise<number | undefined> => {
  try {
    const res = await fetch(`https://api.github.com/repos/KyleGough/${repo}`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) {
      return undefined;
    }
    const data = (await res.json()) as { stargazers_count?: unknown };
    if (typeof data.stargazers_count === "number") {
      return data.stargazers_count;
    }
  } catch {
    // Build continues without the stargazer pill
  }
  return undefined;
};
