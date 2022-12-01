import { component$, useClientEffect$, noSerialize, useStore, useStylesScoped$, NoSerialize } from '@builder.io/qwik';
import { basicSetup, EditorView } from 'codemirror';
import { Compartment, EditorState } from "@codemirror/state";
import { cobalt } from "thememirror";
import styles from "./index.css?inline";
import Button from '~/components/button/button';
import { javascript } from "@codemirror/lang-javascript";
import { createSnippet } from '~/services/SnippetService';
import EditorHeader from '~/components/editor-header/editor-header';

export default component$(() => {
  useStylesScoped$(styles);

  const state = useStore({
    saving: false,
    description: "",
    editor: null as NoSerialize<EditorView> | null
  });

  useClientEffect$(async () => {
    const tabSize = new Compartment();
    const language = new Compartment();

    const editor = new EditorView({
      parent: document.getElementById("editor")!
    });

    editor.setState(EditorState.create({
      doc: "// your code here",
      extensions: [
        basicSetup, cobalt, language.of(javascript()), tabSize.of(EditorState.tabSize.of(8)), 
      ]
    }));

    state.editor = noSerialize(editor);
  })

  return (
    <section class="editor">
      <div class="blk">
        <EditorHeader />
        <div id="editor"></div>
        <textarea placeholder="Details..."
          onChange$={ev => state.description = ev.target.value} />
      </div>

      <footer>
        <Button
          loading={state.saving}
          onClick$={async () => {
            state.saving = true;
            const code = state.editor?.state.toJSON();
            await createSnippet(JSON.stringify(code), state.description);
            state.saving = false;
            window.location.href = "/bits";
          }}>Save</Button>
      </footer>
    </section>
  )
});