import { component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import Button from '~/components/button/button';
import TickIcn from '~/components/icons/TickIcn';
import { login } from '~/services/AuthService';
import styles from "./index.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  const email = useSignal("");
  const loading = useSignal(false);
  const sent = useSignal(false);

  return (
    <section class="login">
      <div class="block">
        <h3>Login</h3>

        {!sent.value && <>
          <p>Enter your email address to receive a login link</p>
          <input 
            type={"email"} 
            placeholder="Your email"
            onChange$={ ev => email.value = ev.target.value } />

          <Button
            loading={loading.value}
            onClick$={async () => {
              if (!email) return;
              loading.value = true;
              await login(email.value);
              loading.value = false;
              sent.value = true;
            }}>Login</Button>
        </>}

        {sent.value && <>
          <p class="sent"><TickIcn />An email was sent to {email.value}</p>
          <Button
            onClick$={async () => {
              sent.value = false;
            }}>Back to Login</Button>
        </>}

        <div class="bg"></div>
      </div>
    </section>
  )
});