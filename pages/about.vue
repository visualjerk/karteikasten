<template>
  <section class="grid gap-14">
    <article class="grid gap-6">
      <h1 class="mb-2">About Karteikasten</h1>
      <p>
        This tool helps you learn "atomic" things like vocabulary, formula and
        everything else that fits on a card. It started as a learning project to
        tinker around with frameworks like Nuxt, Prisma and get better at
        TypeScript.
      </p>
      <p>
        The code is OpenSource and available at
        <a href="https://github.com/visualjerk/karteikasten" target="_blank"
          >GitHub</a
        >. If you would like to support it, you can:
      </p>
      <p class="flex flex-wrap gap-4">
        <a
          href="https://github.com/visualjerk/karteikasten"
          target="_blank"
          class="inline-flex gap-3 items-center py-2 px-4 border-4 border-purple-600 rounded-lg font-bold hover:shadow-md hover:shadow-purple-300"
        >
          <svg height="30" viewBox="0 0 16 16" class="text-slate-800">
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            ></path>
          </svg>
          Star it on GitHub
        </a>
        <a
          href="https://www.buymeacoffee.com/visualjerk"
          target="_blank"
          class="inline-flex gap-3 items-center py-2 px-4 border-4 border-purple-600 rounded-lg font-bold hover:shadow-md hover:shadow-purple-300"
        >
          <img
            src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
            style="width: auto; height: 30px"
          />
          Buy me a coffee
        </a>
        <a
          href="https://www.patreon.com/visualjerk"
          target="_blank"
          class="inline-flex gap-3 items-center py-2 px-4 border-4 border-purple-600 rounded-lg font-bold hover:shadow-md hover:shadow-purple-300"
        >
          <svg
            height="30"
            viewBox="0 0 569 546"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Patreon-Logo</title>
            <g>
              <circle
                fill="rgb(255, 66, 77)"
                id="Oval"
                cx="362.589996"
                cy="204.589996"
                r="204.589996"
              ></circle>
              <rect
                fill="rgb(36, 30, 18)"
                id="Rectangle"
                x="0"
                y="0"
                width="100"
                height="545.799988"
              ></rect>
            </g>
          </svg>
          Become a patreon
        </a>
      </p>
    </article>
    <article class="grid gap-6">
      <h2>How to use it?</h2>
      <p>
        Create a box for a topic you would like to learn (e.g. "German" or
        "Biology"). Then add cards to it, that represent small learning units
        you want to remember.
      </p>
      <p>
        Inside your box click "Start Learning" to enter the learning mode. You
        will see the first card, which you can either answer, reveal, or skip.
      </p>
      <p>
        Karteikasten will show you the cards which are most relevant to learn.
        This is based on your success in answering a card as well as the last
        time it was answered or revealed.
      </p>
    </article>
    <article class="grid gap-6">
      <h2>How to access boxes from another device?</h2>
      <p>
        The default authentication allows for anonymous usage in a single
        browser. If you want to access your boxes somewhere else, you need to
        login with a GitHub account
      </p>
    </article>
    <article class="grid gap-6">
      <h2 class="mb-4">Which tech stack does it use?</h2>
      <p>
        The app is built with
        <a href="https://v3.nuxtjs.org" target="_blank">Nuxt3</a>. It uses
        <a href="https://trpc.io" target="_blank">TRPC</a> to create the Rest
        API and <a href="https://www.prisma.io" target="_blank">Prisma</a> to
        communicate with a MySQL database. Authentication is provided by
        <a href="https://docs.github.com/en/rest" target="_blank"
          >GitHub's API</a
        >.
      </p>
      <p>
        It uses
        <a href="https://tailwindcss.com" target="_blank">TailwindCSS</a> and
        <a href="https://materialdesignicons.com" target="_blank"
          >Materialdesignicons</a
        >
        for styling.
      </p>

      <p>
        The production environment is deployed to
        <a href="https://vercel.com" target="_blank">Vercel</a>. The database is
        served by
        <a href="https://planetscale.com" target="_blank">Planetscale</a>. App
        and database are hosted on a server in EU West, which means you might
        get a slower experience when accessing it from somewhere else.
      </p>
    </article>
  </section>
</template>
