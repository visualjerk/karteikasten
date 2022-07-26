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
        <a href="https://github.com/visualjerk/karteikasten">GitHub</a>. If you
        would like to support it, you can:
      </p>
      <p class="flex gap-4">
        <a
          href="https://www.buymeacoffee.com/visualjerk"
          class="inline-flex gap-4 items-center py-2 px-6 border-4 border-purple-600 rounded-lg font-bold hover:shadow-md hover:shadow-purple-300"
        >
          <img
            src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
            style="width: auto; height: 40px"
          />
          Buy me a coffee
        </a>
        <a
          href="https://www.patreon.com/visualjerk"
          class="inline-flex gap-4 items-center py-2 px-6 border-4 border-purple-600 rounded-lg font-bold hover:shadow-md hover:shadow-purple-300"
        >
          <svg
            height="40px"
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
        The app is build with
        <a href="https://v3.nuxtjs.org/" target="_blank">Nuxt 3</a>. It uses
        <a href="https://trpc.io/" target="_blank">TRPC</a> to create the Rest
        API and <a href="https://www.prisma.io/" target="_blank">Prisma</a> to
        communicate with a MySQL database. Authentication is provided by
        <a href="https://docs.github.com/en/rest" target="_blank"
          >GitHub's API</a
        >.
      </p>
      <p>
        It uses
        <a href="https://tailwindcss.com/" target="_blank">TailwindCSS</a> and
        <a href="https://materialdesignicons.com/" target="_blank"
          >Materialdesignicons</a
        >
        for styling.
      </p>

      <p>
        The production environment is deployed to
        <a href="https://vercel.com/" target="_blank">Vercel</a>. The database
        is served by
        <a href="https://planetscale.com/" target="_blank">Planetscale</a>. App
        and database are hosted on a server in EU West, which means you might
        get a slower experience when accessing it from somewhere else.
      </p>
    </article>
  </section>
</template>
