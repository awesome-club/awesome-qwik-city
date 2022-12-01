import { component$, useStylesScoped$, useResource$, Resource } from '@builder.io/qwik';
import Snippet from '~/components/snippet/Snippet';
import { getSnippets, SnippetDto } from '~/services/SnippetService';
import styles from "./index.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  const bitsResource = useResource$<SnippetDto[]>(({cleanup}) => {
    const controller = new AbortController();
    cleanup(() => controller.abort());
    return getSnippets(controller);
  })

  return (
    <section class="bits">
      <Resource
        value={bitsResource}
        onPending={() => <>Loading...</>}
        onRejected={(error) => <>{error.message}</>}
        onResolved={bits => (
          <ul>
            {bits.map(bit => <li>
              <Snippet id={bit.id} code={bit.code} description={bit.description} />
            </li>)}
          </ul>
        )} />
    </section>
  )
});
