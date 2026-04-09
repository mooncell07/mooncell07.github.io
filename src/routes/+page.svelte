<script lang="ts">
  import buttons from "$lib/buttons.json";
  import projects from "$lib/projects.json";
  import Nav from "$lib/components/Nav.svelte";
  import Footer from "$lib/components/Footer.svelte";

  import gsap from "gsap";
  import { onMount } from "svelte";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { ScrollSmoother } from "gsap/ScrollSmoother";
  import ScrollToTop from "$lib/components/ScrollToTop.svelte";

  let { data } = $props();

  let admin_status = $state("offline");
  let status_path = $state("sprites/Sprite-0005-export.gif");

  const langColorTable = $state({
    C: { primary: "--text", secondary: "--textSecondary" },
    Python: { primary: "--foam", secondary: "--foamSecondary" },
    Rust: { primary: "--rose", secondary: "--roseSecondary" },
    Kotlin: { primary: "--iris", secondary: "--irisSecondary" },
    JavaScript: { primary: "--gold", secondary: "--goldSecondary" },
    Go: { primary: "--pine", secondary: "--pineSecondary" },
  });

  const langIconTable = $state({
    Python: '<i class="fa-brands fa-python"></i>',
    Rust: '<i class="fa-brands fa-rust"></i>',
    JavaScript: '<i class="fa-brands fa-js"></i>',
    Go: '<i class="fa-brands fa-golang"></i>',
  });

  let navEntries = [
    { name: "Home", wide: "#home", narrow: "#home" },
    { name: "Projects", wide: "#projects", narrow: "#projects" },
    { name: "Blog", wide: "#blogs", narrow: "#blogs" },
  ];

  let socialEntries = [
    {
      name: "Github",
      link: "https://github.com/mooncell07",
      icon: '<i class="fa-brands fa-github"></i>',
    },
    {
      name: "Reddit",
      link: "https://www.reddit.com/user/fcomdword/",
      icon: '<i class="fa-brands fa-reddit"></i>',
    },
  ];

  let smoother = $state();

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    smoother = ScrollSmoother.create({
      wrapper: "main",
      content: "article",
      smooth: 1,
      effects: true,
    });

    gsap.set("article", { opacity: 1, delay: 0 });

    smoother.effects(".blogCard", { lag: (i) => i * 0.03 });
    smoother.effects(".projectCard", { lag: (i) => i * 0.03 });

    gsap.registerEffect({
      name: "fade",
      effect: (targets, config) => {
        return gsap.from(targets, {
          y: config.y,
          delay: 0,
          duration: config.duration,
          opacity: 0,
        });
      },
      defaults: { duration: 0.5 },
      extendTimeline: true,
    });

    const landingTimeline = gsap.timeline({ defaults: { delay: 0 } });
    landingTimeline
      .from("#landingTitle", { opacity: 0, duration: 0.8 })
      .fade("#landingDescription", { y: 2 });

    gsap.to("#landingFooter", {
      opacity: 0,
      scrollTrigger: {
        scrub: true,
      },
    });

    let scrollToTopButton = document.getElementById("scrollToTopButton");

    gsap.to("#scrollToTop", {
      scrollTrigger: {
        trigger: "#home",
        scrub: true,
        start: "top center",
        end: "+=400",

        onEnter: ({}) => {
          scrollToTopButton.style.pointerEvents = "auto";
        },
        onLeaveBack: ({}) => {
          scrollToTopButton.style.pointerEvents = "none";
        },
      },
      opacity: 1,
      y: -5,
    });

    async function getStatus() {
      let response = await fetch(
        "https://api.lanyard.rest/v1/users/1240115640745070663",
      );
      if (!response.ok) {
        throw new Error(`Fetch error from status api: ${response.status}`);
      }
      const data = await response.json();
      admin_status = data["data"]["discord_status"];
      if (admin_status == "online") {
        status_path = "sprites/Sprite-0003.gif";
      }
    }
    getStatus();
  });
</script>

<Nav {navEntries} {smoother} />
<ScrollToTop {smoother} />
<main class="container mx-auto px-4">
  <article class="flex flex-col opacity-0">
    <section
      id="landing"
      class="flex flex-col items-center justify-center min-h-[100svh]"
    >
      <div id="landingContent" class="flex flex-col items-center mt-auto gap-1">
        <div id="landingTitle" class="select-none flex flex-row items-end">
          <h1
            class="text-5xl md:text-8xl lg:text-9xl text-(--text) text-shadow-glow"
          >
            mooncell07
          </h1>
          <img
            src="sprites/Sprite-0004.gif"
            alt="Star"
            class="star size-18 md:size-30 lg:size-40 mb-2"
          />
        </div>
        <p
          id="landingDescription"
          class="text-base md:text-md lg:text-lg max-w-200 text-center font-semibold text-(--highlightHigh)"
          style="font-family: IBM Plex Mono;"
        >
          Welcome to my side of the Internet!
        </p>
      </div>
      <div
        id="landingFooter"
        class="flex flex-col justify-center items-center gap-4 mb-2 mt-auto"
      >
        <div id="gotoHome" title="Go to Home" class="text-lg md:text-xl">
          <i
            class="text-2xl text-(--overlay) animate-bounce fa-solid fa-arrow-down"
          ></i>
        </div>
      </div>
    </section>
    <section id="home" class="flex flex-col justify-center items-center mb-10">
      <div
        id="homeContainer"
        class="bg-(--surface) rounded-lg shadow-base text-(--text) flex flex-col pt-[2ch] pb-[2ch] lg:max-w-[75%]"
      >
        <div
          class="flex flex-row max-w-fit self-center self-center md:self-start ml-[1.5ch] mb-[0.5ch] md:mb-0"
        >
          <img
            id="mobileStart"
            src="https://avatars.githubusercontent.com/u/80042274?v=4"
            aria-hidden="true"
            class="rounded-full size-30"
            alt="mooncell07 profile picture"
          />
          <div class="font-medium flex flex-col m-[2ch]">
            <span class="text-lg md:text-xl lg:text-2xl">Nova</span>
            <span class="text-sm md:text-base lg:text-lg text-(--subtle) pb-1"
              >a.k.a mooncell07</span
            >
            <div class="flex gap-[0.5ch]">
              <div
                class="overflow-hidden bg-(--loveSecondary) rounded-md flex flex-row justify-center items-center max-w-fit px-2 gap-[0.5ch]"
              >
                <img
                  src={status_path}
                  class="select-none size-8"
                  alt="Nova is {admin_status}"
                />

                <div
                  class="flex font-semibold text-sm md:text-base text-(--love)"
                >
                  {#if admin_status == "online"}<span class="animate-pulse"
                      >Online</span
                    >
                  {:else}Offline{/if}
                </div>
              </div>

              <div
                class="bg-(--overlay) rounded-md justify-center items-center max-w-fit px-2 flex gap-2"
              >
                {#each socialEntries as se}
                  <a href={se.link}>
                    <span
                      class="hover:text-(--love) text-lg md:text-xl duration-150 cursor-pointer"
                    >
                      {@html se.icon}
                    </span>
                  </a>
                {/each}
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-[1ch] pl-[1ch] pr-[1ch]">
          <div>
            <h1
              class="flex gap-[0.5ch] items-center text-base md:text-lg md:text-xl font-bold"
            >
              <i class="fa-regular fa-star text-(--love) hover:animate-pulse"
              ></i>
              ABOUT ME
            </h1>
            <div
              class="flex flex-col text-sm md:text-base lg:text-lg font-medium"
            >
              <span class="pb-[1ch]">
                Hello this is Nova. I'm a Computer Science Major, currently
                enrolled in a Postgraduate CS Programme. I'm also a hobbyist
                Open Source Dev. You can contact me on my mail: <span
                  class="font-semibold text-(--love)">mooncell07@proton.me</span
                ></span
              >
              <span>
                This site is built using the SvelteKit Web Framework & hosted on
                Github Pages.
              </span>
            </div>
          </div>

          <div>
            <h1
              class="flex gap-[0.5ch] items-center text-base md:text-lg lg:text-xl font-bold"
            >
              <i class="fa-regular fa-star text-(--iris) hover:animate-pulse"
              ></i>
              SYSTEM
            </h1>
            <p class="text-sm md:text-base lg:text-lg font-medium">
              I daily drive Arch Linux with Niri Window Manager. For Code
              Editing i use Neovim with LazyVim setup. My Dotfiles are available
              @ <a href="https://github.com/mooncell07/Dotfiles" class="gap-0"
                ><i class="fa-brands fa-github"></i>/<span
                  class="text-(--love) hover:underline font-semibold"
                  >dotfiles</span
                >
              </a>.
            </p>
          </div>

          <div>
            <h1
              class="flex gap-[0.5ch] items-center text-base md:text-lg lg:text-xl font-bold"
            >
              <i class="fa-regular fa-star text-(--rose) hover:animate-pulse"
              ></i>
              LANGUAGES
            </h1>
            <div class="flex flex-row flex-wrap gap-[0.5ch] pt-[0.5ch]">
              {#each Object.entries(langIconTable) as [key, value]}
                <div
                  class="flex items-center px-2 py-0.5 gap-[0.5ch] rounded-md font-semibold text-base md:text-md"
                  style="background-color: var({langColorTable[key][
                    'secondary'
                  ]});
                  "
                >
                  <div
                    class="flex items-center justify-center gap-[0.5ch]"
                    style="color: var({langColorTable[key]['primary']})"
                  >
                    {@html value}<span>{key}</span>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-center items-center pt-[0.5ch]">
          <div class="flex flex-row flex-wrap gap-2 justify-center">
            {#each Object.entries(buttons) as [key, value]}
              {#if value.link != null}
                <a href={value.link}>
                  <img src="/88x31s/{key}" alt={value.alt} />
                </a>
              {:else}
                <img src="/88x31s/{key}" alt={value.alt} />
              {/if}
            {/each}
          </div>
        </div>

        <div
          class="flex text-lg md:text-xl mt-4 gap-2 justify-center items-center text-(--text)"
        >
          <a href="https://ctp-webr.ing/nova/previous" title="CTP Webring Left"
            ><i class="fa-solid fa-arrow-left duration-150 hover:text-(--love)"
            ></i></a
          ><a href="https://ctp-webr.ing/"
            ><img
              src="./pictures/catppuccin.png"
              alt="ctp-webring"
              class="size-8 md:size-10"
            /></a
          ><a href="https://ctp-webr.ing/nova/next" title="CTP Webring Right"
            ><i class="fa-solid fa-arrow-right duration-150 hover:text-(--love)"
            ></i></a
          >
        </div>
      </div>
    </section>
    <section
      id="projects"
      class="flex flex-col justify-center items-center mb-10"
    >
      <div
        id="projectsContainer"
        class="flex flex-col gap-4 items-center md:items-start lg:w-[75%]"
      >
        <div class="select-none flex flex-row items-end">
          <h1
            id="projectsTitle"
            class=" text-5xl md:text-7xl text-(--text) text-shadow-glow"
          >
            Projects
          </h1>
          <img
            id="projectsTitleImage"
            src="sprites/Sprite-0006.gif"
            alt="projects star"
            class="star size-15 md:size-30 mb-1"
          />
        </div>
        <div id="projectsGrid">
          {#each Object.entries(projects) as [key, value]}
            <div class="grid grid-cols-1 grid-rows-1 projectCard">
              <div
                class="col-start-1 row-start-1 flex flex-col flex-1 p-[1ch] bg-(--surface) rounded-lg border-(--overlay) shadow-base"
              >
                <h1
                  class="font-bold text-base md:text-lg lg:text-xl pb-[0.5ch]"
                  style="color: var({langColorTable[value.langs[0]][
                    'primary'
                  ]});"
                >
                  <a href={value.url}>{key}</a>
                </h1>
                <p
                  class="text-(--text) pb-[1ch] font-medium text-sm md:text-base lg:text-lg flex-1"
                >
                  {value.desc}
                </p>
                <div>
                  {#each value.langs as lang}
                    <span
                      class="px-2 mr-1 rounded-lg font-semibold text-sm"
                      style="background-color: var({langColorTable[lang][
                        'secondary'
                      ]}); color: var({langColorTable[lang]['primary']});"
                      >{lang}</span
                    >
                  {/each}
                </div>
              </div>
              <div
                class="col-start-1 row-start-1 flex justify-center items-center rounded-lg opacity-0 duration-250 hover:opacity-100 hover:backdrop-blur-sm hover:bg-(--overlay)/30"
              >
                <a href={value.url}>
                  <div
                    class="font-bold text-lg md:text-xl lg:text-2xl"
                    style="color: var({langColorTable[value.langs[0]][
                      'primary'
                    ]});"
                  >
                    <i class="fa-brands fa-github text-(--text)"></i><span
                      class="text-(--text)">/</span
                    >{key}
                  </div>
                </a>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>
    <section id="blogs" class="flex flex-col justify-center items-center mb-10">
      <div
        id="BlogsContainer"
        class="flex flex-col gap-4 items-center md:items-start lg:w-[75%]"
      >
        <div class="select-none flex flex-row items-end">
          <h1
            id="blogsTitle"
            class=" text-5xl md:text-7xl text-(--text) text-shadow-glow"
          >
            Blog
          </h1>
          <img
            src="sprites/Sprite-0008.gif"
            alt="blogs star"
            class="star size-15 md:size-30 mb-1"
          />
        </div>
        <div id="blogGrid">
          {#each data.blogs as b}
            <div
              class="blogCard flex flex-col p-[1ch] bg-(--surface) duration-250 hover:bg-(--overlay) shadow-base rounded-lg"
            >
              <a href="b/{b.slug}">
                <h1
                  class="font-bold text-base md:text-lg lg:text-xl text-(--text)"
                >
                  {b.title}
                </h1>
                <span class="text-(--highlightHigh) text-xs italic pb-[0.5ch]"
                  >{b.date}</span
                >
                <hr class="mb-2 w-1/3 border-2 border-(--love)" />

                <span class="text-(--text) font-medium text-sm md:text-base">
                  {b.description}
                </span>
              </a>
            </div>
          {/each}
        </div>
      </div>
    </section>
    <Footer />
  </article>
</main>
