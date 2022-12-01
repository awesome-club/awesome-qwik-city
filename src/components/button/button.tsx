import { component$, PropFunction, Slot } from '@builder.io/qwik';
import "./button.css";

export interface ButtonProps {
  onClick$: PropFunction<() => void>;
  loading?: boolean;
}

export default component$((props: ButtonProps) => {
  return (
    <button
      class={`btn ${props.loading ? "loading": ""}`}
      disabled={props.loading}
      onClick$={props.onClick$}>
      
      {!props.loading && <Slot />}
      {props.loading && <div class="loading"></div>}

    </button>
  );
});