import { component$, useClientEffect$, useStylesScoped$, useSignal} from '@builder.io/qwik';
import { Compartment, EditorState } from "@codemirror/state";
import { basicSetup, EditorView } from 'codemirror';
import { cobalt } from "thememirror";
import { javascript } from "@codemirror/lang-javascript";
import styles from './snippet.css?inline';
import EditorHeader from '../editor-header/editor-header';

export interface SnippetProps {
  id: number;
  description: string;
  code: string;
}

export default component$(({id, description, code}: SnippetProps) => {
  useStylesScoped$(styles);

  const element = useSignal<HTMLDivElement>()

  useClientEffect$(async () => {
    console.log("here", element.value, "b");
    const tabSize = new Compartment();
    const language = new Compartment();

    const editor = new EditorView({
      parent: element.value,
    });

    editor.setState(EditorState.create({
      doc: JSON.parse(code).doc,
      extensions: [
        basicSetup,
        cobalt,
        EditorState.readOnly.of(true),
        language.of(javascript()),
        tabSize.of(EditorState.tabSize.of(8)),
      ]
    }));
  });

  return (
    <article class="snippet">
      <EditorHeader />
      <div id={`code-${id}`} ref={element}></div>
      <p>{description}</p>
    </article> 
  );
});