import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { DocumentHead, Link } from '@builder.io/qwik-city';
import styles from "./index.css?inline";

export const head: DocumentHead = {
  title: "Twomindev",
  meta: [
    {name: "description", content: "Bite-sized code snippet"}
  ]
}

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <section class="home">
      <h1>
        Learn from bite-sized <br />
        <span>fun</span> code snippets
      </h1>

      <p>
        Create images of your code in seconds and<br /> 
        share them with yout audience.
      </p>

      <Link class="btn" href="/new">
        Create a Snippet
      </Link>

      <img src="/public/code.png" />
    </section>
  )
});