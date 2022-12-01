import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import styles from './header.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return(
    <header>
      <div class="logo">
        <Link href="/">
          <img src="/public/logo.svg" />
        </Link>
      </div>

      <nav>
        <ul>
          <li><a href="/new">Create</a></li>
          <li class="sp"></li>
          <li><a href="/bits">Bits</a></li>
        </ul>
      </nav>

      <Link class="btn" href="/login">
        Login <span class="rrw">⟶</span>
      </Link>
    </header>
  )
});
