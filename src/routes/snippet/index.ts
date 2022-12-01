import type { RequestHandler } from "@builder.io/qwik-city";
import { supabase } from "~/utils/supabase";
import { SnippetDto } from "../../services/SnippetService";

const SnippetTable = "snippet";

export const onGet: RequestHandler = async () => {
  return await supabase
    .from(SnippetTable)
    .select();
};

export const onPost: RequestHandler<SnippetDto> = async (ev) => {
  const { code, description } = await ev.request.json();

  await supabase
    .from(SnippetTable)
    .upsert([{
      code,
      description,
    }]);
};
