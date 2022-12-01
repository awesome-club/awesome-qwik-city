import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './editor-header.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header class="editor-header">
      <nav>
        <span /><span /><span />
      </nav>
    </header>
  );
});
