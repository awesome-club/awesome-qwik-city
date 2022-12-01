export interface SnippetDto {
  id: number;
  code: string;
  description: string;
}

export async function createSnippet(code: string, description: string) {
  return fetch("/snippet", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, description }),
  });
}

export async function getSnippets(
  controller?: AbortController,
): Promise<SnippetDto[]> {
  const resp = await fetch("/snippet", {
    signal: controller?.signal,
  });

  return (await resp.json()).data;
}
