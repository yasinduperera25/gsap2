import type { AnimationExample } from '@/types'

export const examples: AnimationExample[] = [
  {
    id: 'basic-tween',
    order: 1,
    title: 'Basic Tween Animation',
    summary: 'The smallest GSAP building block: one target, one set of properties, one smooth result.',
    explanation:
      'A tween animates properties from their current values to the values you provide. GSAP handles timing, easing and rendering on every frame.',
    tip: 'Use gsap.to() when you know the destination. The starting values are read from the element.',
    level: 'beginner',
    categories: ['Basics', 'Tween'],
    scene: 'boxes',
    accent: '#c6ff4a',
    code: `const tween = gsap.to(".box", {
  x: 120,
  rotation: 360,
  scale: 1.15,
  backgroundColor: "#c6ff4a",
  duration: 1.2,
  ease: "power2.inOut",
  stagger: 0.08
});`,
  },
  {
    id: 'gsap-to',
    order: 2,
    title: 'gsap.to()',
    summary: 'Animate toward a destination with a declarative property object.',
    explanation:
      'gsap.to() is the workhorse of GSAP. Every property in the vars object becomes part of the tween, including CSS transforms, colors and custom values.',
    tip: 'Chain repeat and yoyo to make a tween loop without writing any extra logic.',
    level: 'beginner',
    categories: ['Basics', 'Tween'],
    scene: 'boxes',
    accent: '#22d3ee',
    code: `gsap.to(".box", {
  x: 180,
  borderRadius: "50%",
  backgroundColor: "#22d3ee",
  rotation: 180,
  duration: 1.2,
  stagger: 0.1,
  repeat: 1,
  yoyo: true
});`,
  },
  {
    id: 'gsap-from',
    order: 3,
    title: 'gsap.from()',
    summary: 'Start from a set of values and animate back to the element’s natural state.',
    explanation:
      'gsap.from() is ideal for entrance animations. You describe where the element should come from, and GSAP animates it to its current CSS values.',
    tip: 'Pair from() with a stagger and a springy ease for instant reveal polish.',
    level: 'beginner',
    categories: ['Basics', 'Tween'],
    scene: 'boxes',
    accent: '#8b5cf6',
    code: `gsap.from(".box", {
  x: -140,
  opacity: 0,
  rotation: -180,
  scale: 0.4,
  duration: 0.9,
  ease: "back.out(1.7)",
  stagger: 0.08
});`,
  },
  {
    id: 'gsap-fromto',
    order: 4,
    title: 'gsap.fromTo()',
    summary: 'Take full control of both the start and end states.',
    explanation:
      'When the starting values must be explicit, gsap.fromTo() lets you define both sides of the animation. This is useful for reversible or stateful effects.',
    tip: 'fromTo() is also handy when the element’s current inline styles should not influence the animation.',
    level: 'beginner',
    categories: ['Basics', 'Tween'],
    scene: 'boxes',
    accent: '#f472b6',
    code: `gsap.fromTo(".box",
  { x: -80, y: 40, rotation: -45, opacity: 0.2 },
  {
    x: 80,
    y: -20,
    rotation: 45,
    opacity: 1,
    duration: 1.1,
    ease: "power3.inOut",
    stagger: 0.1,
    yoyo: true,
    repeat: 1
  }
);`,
  },
  {
    id: 'duration-delay',
    order: 5,
    title: 'Duration & Delay',
    summary: 'Shape rhythm with timing: how long each tween lasts and when it begins.',
    explanation:
      'Duration controls the length of an animation. Delay offsets its start. Staggering durations and delays is the quickest way to create an organic cascade.',
    tip: 'Keep entrance animations under a second. Use delay to build anticipation, not to make users wait.',
    level: 'beginner',
    categories: ['Basics', 'Timing'],
    scene: 'boxes',
    accent: '#fbbf24',
    code: `const boxes = gsap.utils.toArray<HTMLElement>(".box");

boxes.forEach((box, i) => {
  gsap.to(box, {
    x: 60 + i * 12,
    rotation: (i + 1) * 30,
    duration: 0.4 + i * 0.3,
    delay: i * 0.08,
    ease: "power2.out"
  });
});`,
  },
  {
    id: 'easing-functions',
    order: 6,
    title: 'Easing Functions',
    summary: 'Give motion personality with linear, power, back, elastic and bounce eases.',
    explanation:
      'Easing changes the rate of change over time. The right ease makes a UI feel intentional; the wrong one makes it feel mechanical.',
    tip: 'power2.out and power3.out are reliable defaults for UI. Save elastic and bounce for playful moments.',
    level: 'beginner',
    categories: ['Basics', 'Easing'],
    scene: 'rows',
    accent: '#34d399',
    code: `gsap.utils.toArray<HTMLElement>(".ease-row").forEach((row) => {
  const dot = row.querySelector(".ease-dot");

  gsap.fromTo(dot, { x: 0 }, {
    x: () => row.clientWidth - 32,
    duration: 1.4,
    ease: row.dataset.ease,
    repeat: 1,
    yoyo: true
  });
});`,
  },
  {
    id: 'stagger-animations',
    order: 7,
    title: 'Stagger Animations',
    summary: 'Animate a group with offset timing for a polished cascade.',
    explanation:
      'The stagger property offsets each target in a group. You can use a number, an object with each/from, or a function for total control.',
    tip: 'Stagger from the center or edges to create direction. A little offset goes a long way.',
    level: 'beginner',
    categories: ['Basics', 'Stagger'],
    scene: 'boxes',
    accent: '#a78bfa',
    code: `gsap.from(".box", {
  y: 60,
  opacity: 0,
  scale: 0.6,
  duration: 0.8,
  ease: "back.out(1.7)",
  stagger: {
    each: 0.12,
    from: "center"
  }
});`,
  },
  {
    id: 'timeline-animations',
    order: 8,
    title: 'Timeline Animations',
    summary: 'Sequence multiple tweens and control them as one animation.',
    explanation:
      'A timeline is a container for tweens. Position parameters such as "-=0.3" or "<" let you overlap and choreograph motion precisely.',
    tip: 'Use timeline defaults for ease and duration, then override only where a step needs to stand out.',
    level: 'beginner',
    categories: ['Timeline'],
    scene: 'boxes',
    accent: '#60a5fa',
    code: `const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

tl.to(".box-1", { x: 80, rotation: 180, backgroundColor: "#c6ff4a" })
  .to(".box-2", { y: -60, scale: 1.2, backgroundColor: "#22d3ee" }, "-=0.3")
  .to(".box-3", { x: -80, rotation: -180, backgroundColor: "#8b5cf6" }, "<")
  .to(".box-4", { y: 60, scale: 0.8, backgroundColor: "#f472b6" }, "-=0.2");`,
  },
  {
    id: 'hover-animations',
    order: 9,
    title: 'Hover Animations',
    summary: 'Use pointer intent to add tactile micro-interactions.',
    explanation:
      'A hover timeline can play on mouseenter and reverse on mouseleave. Because GSAP records the current state, the reverse feels natural even mid-animation.',
    tip: 'Always include a focus state too. Hover-only interactions exclude keyboard users.',
    level: 'beginner',
    categories: ['Interaction'],
    scene: 'boxes',
    accent: '#f97316',
    interaction: 'hover',
    code: `const card = document.querySelector(".hover-target");
const glow = document.querySelector(".hover-glow");

const tl = gsap.timeline({ paused: true });

tl.to(card, {
  y: -10,
  scale: 1.04,
  boxShadow: "0 30px 80px rgba(198,255,74,0.25)",
  duration: 0.45,
  ease: "power2.out"
}).to(glow, { scale: 1.6, opacity: 0.5, duration: 0.45 }, 0);

card.addEventListener("mouseenter", () => tl.play());
card.addEventListener("mouseleave", () => tl.reverse());`,
  },
  {
    id: 'click-animations',
    order: 10,
    title: 'Click-triggered Animations',
    summary: 'Respond to user actions with a satisfying burst of motion.',
    explanation:
      'Click handlers can create a new tween each time, so repeated clicks feel responsive. Use overwrite or killTweensOf if interactions can fire quickly.',
    tip: 'Combine a scale pop with a small rotation for a playful button press.',
    level: 'beginner',
    categories: ['Interaction'],
    scene: 'boxes',
    accent: '#ef4444',
    interaction: 'click',
    code: `const target = document.querySelector(".click-target");

target.addEventListener("click", () => {
  gsap.fromTo(target, { scale: 0.9 }, {
    scale: 1,
    duration: 0.6,
    ease: "elastic.out(1, 0.4)"
  });

  gsap.to(target, {
    rotation: "+=25",
    duration: 0.4,
    ease: "power2.out"
  });
});`,
  },
  {
    id: 'timeline-sequencing',
    order: 11,
    title: 'GSAP Timeline Sequencing',
    summary: 'Choreograph a multi-step story with labels and position parameters.',
    explanation:
      'Labels turn a timeline into a readable storyboard. Jump to a label, insert nested timelines, and keep the whole sequence scrubbable.',
    tip: 'Name important moments with addLabel(). Future you will thank present you.',
    level: 'intermediate',
    categories: ['Timeline'],
    scene: 'cards',
    accent: '#c6ff4a',
    code: `const tl = gsap.timeline({
  defaults: { ease: "power3.out", duration: 0.7 }
});

tl.addLabel("intro")
  .from(".seq-card", { y: 60, opacity: 0, stagger: 0.15 })
  .addLabel("focus")
  .to(".seq-card:nth-child(2)", { y: -16, scale: 1.08 }, "focus")
  .to(".seq-card", { backgroundColor: "#c6ff4a", stagger: 0.08 }, "focus+=0.2")
  .to(".seq-card", {
    backgroundColor: "#121a2b",
    y: 0,
    scale: 1
  }, ">-0.2");`,
  },
  {
    id: 'scrolltrigger-basic',
    order: 12,
    title: 'ScrollTrigger Basic Animation',
    summary: 'Connect an animation to scroll position with a few lines of code.',
    explanation:
      'ScrollTrigger watches an element and starts, updates or completes an animation based on scroll. Scrub ties the animation progress directly to the scrollbar.',
    tip: 'Refresh ScrollTrigger after fonts, images or dynamic content change layout.',
    level: 'intermediate',
    categories: ['ScrollTrigger'],
    scene: 'scroll-sections',
    accent: '#22d3ee',
    interaction: 'scroll',
    code: `gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray<HTMLElement>(".scroll-section").forEach((section) => {
  gsap.from(section.querySelector(".scroll-content"), {
    y: 60,
    opacity: 0,
    scrollTrigger: {
      scroller: ".stage-viewport",
      trigger: section,
      start: "top 80%",
      end: "top 40%",
      scrub: true
    }
  });
});`,
  },
  {
    id: 'scroll-reveal',
    order: 13,
    title: 'Scroll-triggered Reveal',
    summary: 'Reveal content as it enters the viewport with toggle actions.',
    explanation:
      'toggleActions maps scroll events to animation playback: onEnter, onLeave, onEnterBack and onLeaveBack. This gives you full control over one-shot reveals.',
    tip: 'Use "play none none reverse" for a reveal that gracefully rewinds when scrolling back up.',
    level: 'intermediate',
    categories: ['ScrollTrigger', 'Basics'],
    scene: 'scroll-reveal',
    accent: '#8b5cf6',
    interaction: 'scroll',
    code: `gsap.from(".reveal-card", {
  y: 50,
  opacity: 0,
  scale: 0.9,
  stagger: 0.12,
  duration: 0.7,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".reveal-grid",
    start: "top 85%",
    toggleActions: "play none none reverse"
  }
});`,
  },
  {
    id: 'pinning-sections',
    order: 14,
    title: 'Pinning Sections',
    summary: 'Pin an element in place while the rest of the page scrolls.',
    explanation:
      'Pinning is a classic scroll-driven technique. ScrollTrigger holds the trigger in place for the defined scroll distance, allowing a scene to unfold.',
    tip: 'Keep pinned sections short and purposeful. Long pins can feel like a scroll trap.',
    level: 'intermediate',
    categories: ['ScrollTrigger'],
    scene: 'scroll-pin',
    accent: '#f472b6',
    interaction: 'scroll',
    code: `const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".pin-section",
    start: "top top",
    end: "+=500",
    pin: true,
    scrub: true
  }
});

tl.to(".pin-item", {
  x: 80,
  backgroundColor: "#c6ff4a",
  stagger: 0.2
});`,
  },
  {
    id: 'horizontal-scrolling',
    order: 15,
    title: 'Horizontal Scrolling',
    summary: 'Translate vertical scroll into a horizontal journey.',
    explanation:
      'Pin a horizontal track, then animate its x position based on scroll progress. invalidateOnRefresh recalculates the distance when the layout changes.',
    tip: 'Compute the distance from scrollWidth, not a hardcoded value, so the effect survives responsive layouts.',
    level: 'intermediate',
    categories: ['ScrollTrigger'],
    scene: 'scroll-horizontal',
    accent: '#fbbf24',
    interaction: 'scroll',
    code: `const track = document.querySelector(".horizontal-track");
const distance = track.scrollWidth - window.innerWidth;

gsap.to(track, {
  x: -distance,
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-section",
    start: "top top",
    end: () => "+=" + distance,
    scrub: 1,
    pin: true,
    invalidateOnRefresh: true
  }
});`,
  },
  {
    id: 'text-reveal',
    order: 16,
    title: 'Text Reveal Animation',
    summary: 'Split text into characters or words and animate them with precision.',
    explanation:
      'SplitText gives you arrays of characters, words and lines. Animate those elements for editorial-style reveals that feel crafted rather than generic.',
    tip: 'Wrap lines in an overflow-hidden container so characters can slide in from below.',
    level: 'intermediate',
    categories: ['Text'],
    scene: 'text',
    accent: '#34d399',
    code: `const split = new SplitText(".reveal-heading", {
  type: "chars,words"
});

gsap.from(split.chars, {
  yPercent: 120,
  opacity: 0,
  rotation: 8,
  duration: 0.8,
  ease: "back.out(1.4)",
  stagger: 0.03
});`,
  },
  {
    id: 'image-reveal',
    order: 17,
    title: 'Image Reveal Animation',
    summary: 'Use clip-path and layered wipes to unveil imagery.',
    explanation:
      'clip-path is a performant way to mask an image. Combine a clip animation with an overlay wipe and a subtle scale for a cinematic reveal.',
    tip: 'Animate the overlay and the image with slightly different timing to create depth.',
    level: 'intermediate',
    categories: ['Image'],
    scene: 'image',
    accent: '#a78bfa',
    code: `const tl = gsap.timeline();

tl.fromTo(".image-panel",
  { clipPath: "inset(0 100% 0 0)" },
  { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power4.inOut" }
)
.fromTo(".image-overlay",
  { yPercent: 0 },
  { yPercent: -100, duration: 1, ease: "power4.inOut" },
  0
)
.from(".image-label", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
.to(".image-panel", { scale: 1.04, duration: 1.2, ease: "power2.out" }, "-=0.5");`,
  },
  {
    id: 'parallax-effects',
    order: 18,
    title: 'Parallax Effects',
    summary: 'Move layers at different speeds to create depth.',
    explanation:
      'Parallax is a depth cue. gsap.quickTo() is perfect for pointer-driven parallax because it creates a reusable, high-performance setter.',
    tip: 'Limit parallax to decorative layers. Keep interactive targets stable and easy to click.',
    level: 'intermediate',
    categories: ['Interaction'],
    scene: 'parallax',
    accent: '#60a5fa',
    code: `const layers = gsap.utils.toArray<HTMLElement>(".parallax-layer");
const setters = layers.map((layer) => ({
  depth: Number(layer.dataset.depth),
  x: gsap.quickTo(layer, "x", { duration: 0.8, ease: "power3.out" }),
  y: gsap.quickTo(layer, "y", { duration: 0.8, ease: "power3.out" })
}));

window.addEventListener("mousemove", (event) => {
  const x = event.clientX / window.innerWidth - 0.5;
  const y = event.clientY / window.innerHeight - 0.5;

  setters.forEach((layer) => {
    layer.x(x * layer.depth * 80);
    layer.y(y * layer.depth * 80);
  });
});`,
  },
  {
    id: 'svg-animations',
    order: 19,
    title: 'SVG Animations',
    summary: 'Draw paths, rotate rings and animate vector details.',
    explanation:
      'GSAP can animate any SVG attribute. DrawSVG makes line drawing effortless, while transformOrigin gives precise control over rotations.',
    tip: 'Set transformOrigin explicitly on SVG elements. Their default origin is often not what you expect.',
    level: 'intermediate',
    categories: ['SVG'],
    scene: 'svg',
    accent: '#f97316',
    code: `gsap.registerPlugin(DrawSVGPlugin);

const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4 });

tl.fromTo(".svg-path",
  { drawSVG: "0%" },
  { drawSVG: "100%", duration: 1.6, ease: "power2.inOut" }
)
.to(".svg-ring", {
  rotation: 360,
  transformOrigin: "50% 50%",
  duration: 2.4,
  stagger: 0.2,
  ease: "none"
}, 0)
.fromTo(".svg-dot",
  { scale: 0 },
  { scale: 1, duration: 0.6, ease: "back.out(2)" },
  0.6
);`,
  },
  {
    id: 'draggable-elements',
    order: 20,
    title: 'Draggable Elements',
    summary: 'Make elements draggable with bounds, inertia and edge resistance.',
    explanation:
      'Draggable turns DOM elements into interactive objects. InertiaPlugin adds momentum and lets users throw elements around naturally.',
    tip: 'Always set bounds. Unbounded drag can accidentally push content outside the viewport.',
    level: 'intermediate',
    categories: ['Draggable', 'Interaction'],
    scene: 'draggable',
    accent: '#ef4444',
    interaction: 'drag',
    code: `gsap.registerPlugin(Draggable, InertiaPlugin);

const draggables = Draggable.create(".drag-token", {
  bounds: ".drag-bounds",
  inertia: true,
  edgeResistance: 0.65,
  cursor: "grab",
  activeCursor: "grabbing"
});`,
  },
  {
    id: 'batch-animations',
    order: 21,
    title: 'Batch Animations',
    summary: 'Reveal groups of elements efficiently as they enter the viewport.',
    explanation:
      'ScrollTrigger.batch groups elements that trigger together and passes them to your callbacks. It is an efficient way to stagger large grids.',
    tip: 'Set the initial hidden state with gsap.set() and let the batch callbacks handle the reveal.',
    level: 'intermediate',
    categories: ['ScrollTrigger', 'Stagger'],
    scene: 'scroll-batch',
    accent: '#14b8a6',
    interaction: 'scroll',
    code: `gsap.set(".grid-tile", { opacity: 0, y: 30, scale: 0.9 });

ScrollTrigger.batch(".grid-tile", {
  start: "top 88%",
  onEnter: (batch) => gsap.to(batch, {
    opacity: 1,
    y: 0,
    scale: 1,
    stagger: 0.08,
    duration: 0.6,
    overwrite: true
  }),
  onLeaveBack: (batch) => gsap.to(batch, {
    opacity: 0,
    y: 30,
    scale: 0.9,
    duration: 0.3,
    overwrite: true
  })
});`,
  },
  {
    id: 'scrub-animations',
    order: 22,
    title: 'Scrub Animations',
    summary: 'Tie animation progress directly to scroll for a tactile experience.',
    explanation:
      'With scrub enabled, the timeline becomes a scroll-controlled playback head. The user literally scrubs through the animation.',
    tip: 'Use a small scrub value like 0.5 or 1 to smooth out jittery wheel events.',
    level: 'intermediate',
    categories: ['ScrollTrigger'],
    scene: 'scroll-scrub',
    accent: '#eab308',
    interaction: 'scroll',
    code: `const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".scrub-section",
    start: "top top",
    end: "bottom bottom",
    scrub: 1
  }
});

tl.to(".scrub-progress", { scaleX: 1, ease: "none" }, 0)
  .to(".scrub-box", {
    x: (i) => i * 24,
    rotation: 180,
    backgroundColor: "#c6ff4a",
    stagger: 0.1
  }, 0)
  .to(".scrub-heading", { y: -40, opacity: 0.2 }, 0);`,
  },
  {
    id: 'advanced-timelines',
    order: 23,
    title: 'Advanced GSAP Timelines',
    summary: 'Layer labels, nested sequences and state changes inside one timeline.',
    explanation:
      'Advanced timelines combine labels, overlapping tweens and property resets. The result is a single source of truth for a complex sequence.',
    tip: 'Build complex sequences from small named phases. It makes debugging and iterating much easier.',
    level: 'advanced',
    categories: ['Timeline'],
    scene: 'cards',
    accent: '#c6ff4a',
    code: `const tl = gsap.timeline({
  defaults: { ease: "power3.out" }
});

tl.addLabel("intro")
  .from(".adv-card", {
    y: 60,
    opacity: 0,
    rotationX: -30,
    stagger: 0.12,
    duration: 0.7
  })
  .addLabel("focus")
  .to(".adv-card:nth-child(2)", {
    scale: 1.12,
    y: -14,
    duration: 0.6
  }, "focus")
  .to(".adv-card", {
    backgroundColor: "#c6ff4a",
    color: "#071008",
    stagger: 0.08,
    duration: 0.4
  }, "focus+=0.2")
  .to(".adv-card", {
    scale: 1,
    y: 0,
    backgroundColor: "#121a2b",
    color: "#e8edf7",
    stagger: 0.08,
    duration: 0.5
  }, ">-0.2");`,
  },
  {
    id: 'scroll-driven',
    order: 24,
    title: 'Scroll-driven Animations',
    summary: 'Drive a layered scene entirely from scroll progress.',
    explanation:
      'Scroll-driven scenes often combine multiple layers moving at different rates. A single scrubbed timeline keeps everything perfectly in sync.',
    tip: 'Animate transforms and opacity for the smoothest scroll performance. Avoid layout properties.',
    level: 'advanced',
    categories: ['ScrollTrigger', 'Advanced'],
    scene: 'scroll-driven',
    accent: '#22d3ee',
    interaction: 'scroll',
    code: `const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".driven-section",
    start: "top top",
    end: "bottom bottom",
    scrub: 1
  }
});

tl.to(".driven-layer-1", { yPercent: -20, ease: "none" }, 0)
  .to(".driven-layer-2", { yPercent: -50, ease: "none" }, 0)
  .to(".driven-card", {
    y: (i) => -i * 40,
    rotation: (i) => (i % 2 ? 8 : -8),
    stagger: 0.1
  }, 0)
  .to(".driven-number", { scale: 1.4, opacity: 1 }, 0);`,
  },
  {
    id: 'motion-path',
    order: 25,
    title: 'Motion Path Animations',
    summary: 'Send an element along a custom SVG path with automatic rotation.',
    explanation:
      'MotionPathPlugin maps an element’s position to a path. autoRotate aligns the element with the path direction for convincing movement.',
    tip: 'Use align and alignOrigin to position the element exactly on the path from the first frame.',
    level: 'advanced',
    categories: ['SVG', 'Advanced'],
    scene: 'path',
    accent: '#8b5cf6',
    code: `const path = document.querySelector(".motion-path");

gsap.to(".path-dot", {
  duration: 2.4,
  ease: "power1.inOut",
  repeat: -1,
  repeatDelay: 0.5,
  motionPath: {
    path,
    align: path,
    alignOrigin: [0.5, 0.5],
    autoRotate: true
  }
});`,
  },
  {
    id: 'flip-animations',
    order: 26,
    title: 'Flip Plugin Animations',
    summary: 'Animate layout changes between two states with a single Flip call.',
    explanation:
      'Flip records an element’s state, lets the DOM change, then animates from the old state to the new one. It is magic for reordering lists and grids.',
    tip: 'Use absolute: true during the flip to prevent surrounding layout from jumping.',
    level: 'advanced',
    categories: ['Advanced'],
    scene: 'flip',
    accent: '#f472b6',
    code: `gsap.registerPlugin(Flip);

const grid = document.querySelector(".flip-grid");
const tiles = gsap.utils.toArray(".flip-card");

function shuffle() {
  const state = Flip.getState(tiles);
  grid.appendChild(grid.firstElementChild);

  Flip.from(state, {
    duration: 0.7,
    ease: "power2.inOut",
    absolute: true,
    stagger: 0.03
  });
}

shuffle();`,
  },
  {
    id: 'morphing-animations',
    order: 27,
    title: 'Morphing Animations',
    summary: 'Smoothly morph one SVG shape into another.',
    explanation:
      'MorphSVGPlugin interpolates between paths, even when they have different numbers of points. It is perfect for logo and icon transitions.',
    tip: 'Keep both paths in the same coordinate space and avoid sharp corners changing too dramatically.',
    level: 'advanced',
    categories: ['SVG', 'Advanced'],
    scene: 'morph',
    accent: '#fbbf24',
    code: `const target = document.querySelector(".morph-target").getAttribute("d");

gsap.to(".morph-path", {
  duration: 1.4,
  morphSVG: target,
  ease: "power2.inOut",
  repeat: -1,
  yoyo: true,
  repeatDelay: 0.4
});`,
  },
  {
    id: 'complex-stagger',
    order: 28,
    title: 'Complex Stagger Effects',
    summary: 'Use grid-aware staggers to ripple motion across a layout.',
    explanation:
      'Stagger can understand a grid. Using from: "center" and grid: "auto" produces a wave that radiates outward from the middle of the tiles.',
    tip: 'Combine stagger direction with scale and rotation for a surprisingly organic result.',
    level: 'advanced',
    categories: ['Stagger', 'Advanced'],
    scene: 'grid',
    accent: '#34d399',
    code: `gsap.fromTo(".grid-tile",
  { scale: 0.4, opacity: 0.2, rotation: -25 },
  {
    scale: 1,
    opacity: 1,
    rotation: 0,
    duration: 0.7,
    ease: "back.out(1.7)",
    stagger: {
      each: 0.04,
      from: "center",
      grid: "auto"
    }
  }
);`,
  },
  {
    id: 'responsive-animations',
    order: 29,
    title: 'Responsive Animations',
    summary: 'Define different animation setups for different breakpoints.',
    explanation:
      'gsap.matchMedia() creates animations that only exist inside a media query. When the query stops matching, GSAP automatically reverts them.',
    tip: 'Design motion for the device. A horizontal flourish on desktop may need to become vertical on mobile.',
    level: 'advanced',
    categories: ['Responsive'],
    scene: 'boxes',
    accent: '#60a5fa',
    code: `const mm = gsap.matchMedia();

mm.add("(min-width: 640px)", () => {
  gsap.to(".box", {
    x: 90,
    rotation: 180,
    stagger: 0.1,
    duration: 1,
    ease: "power2.inOut"
  });
});

mm.add("(max-width: 639px)", () => {
  gsap.to(".box", {
    y: -50,
    scale: 1.2,
    stagger: 0.1,
    duration: 1,
    ease: "power2.inOut"
  });
});`,
  },
  {
    id: 'reusable-functions',
    order: 30,
    title: 'Reusable Animation Functions',
    summary: 'Wrap animation logic in typed functions for consistent, maintainable motion.',
    explanation:
      'Reusable animation functions keep your motion language consistent. Return the tween so callers can add it to a timeline, reverse it or kill it.',
    tip: 'Return tween instances from helpers. It makes composition and cleanup dramatically easier.',
    level: 'advanced',
    categories: ['Advanced'],
    scene: 'boxes',
    accent: '#f97316',
    code: `function animateBox(box: HTMLElement, index: number) {
  return gsap.fromTo(box,
    { y: 40, opacity: 0, scale: 0.8 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      rotation: index % 2 ? 8 : -8,
      duration: 0.8,
      ease: "back.out(1.7)"
    }
  );
}

const boxes = gsap.utils.toArray<HTMLElement>(".box");
const tl = gsap.timeline();

boxes.forEach((box, index) => {
  tl.add(animateBox(box, index), index * 0.1);
});`,
  },
  {
    id: 'text-typewriter',
    order: 31,
    title: 'Typewriter Text Animation',
    summary: 'Reveal copy one character at a time with a blinking caret.',
    explanation:
      'By animating a counter object and writing its value to textContent on each update, GSAP can drive a typewriter effect. A second tween blinks the caret.',
    tip: 'Keep the counter tween linear so characters land at an even pace.',
    level: 'intermediate',
    categories: ['Text'],
    scene: 'text-typewriter',
    accent: '#34d399',
    code: `const state = { count: 0 };
const text = document.querySelector(".typewriter-text");
const full = text.textContent;

gsap.to(state, {
  count: full.length,
  duration: 2,
  ease: "none",
  repeat: -1,
  repeatDelay: 1.4,
  onUpdate: () => {
    text.textContent = full.slice(0, Math.round(state.count));
  }
});

gsap.to(".typewriter-cursor", {
  opacity: 0,
  duration: 0.5,
  repeat: -1,
  yoyo: true,
  ease: "steps(1)"
});`,
  },
  {
    id: 'text-marquee',
    order: 32,
    title: 'Infinite Text Marquee',
    summary: 'Loop text endlessly with duplicated tracks and percentage transforms.',
    explanation:
      'Duplicate the content so the loop is seamless, then animate xPercent from 0 to -50. A reverse track adds depth and contrast.',
    tip: 'Use xPercent rather than pixels so the marquee stays responsive.',
    level: 'intermediate',
    categories: ['Text'],
    scene: 'text-marquee',
    accent: '#22d3ee',
    code: `const tracks = gsap.utils.toArray(".marquee-track");

tracks.forEach((track, index) => {
  const reverse = track.dataset.direction === "reverse";

  gsap.fromTo(track,
    { xPercent: reverse ? -50 : 0 },
    {
      xPercent: reverse ? 0 : -50,
      duration: 14 + index * 4,
      ease: "none",
      repeat: -1
    }
  );
});`,
  },
  {
    id: 'carousel-slides',
    order: 33,
    title: 'Carousel Slide Loop',
    summary: 'Build an autoplaying carousel from a single looping timeline.',
    explanation:
      'Translate the track by one slide width per step, then return to zero. Dot indicators update from tween callbacks.',
    tip: 'Measure slide width at runtime so the carousel survives responsive layouts.',
    level: 'intermediate',
    categories: ['Carousel', 'Timeline'],
    scene: 'carousel',
    accent: '#c6ff4a',
    code: `const track = document.querySelector(".carousel-track");
const width = () => track.clientWidth;
const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });

for (let i = 1; i < slides.length; i++) {
  tl.to(track, {
    x: () => -i * width(),
    duration: 0.75,
    ease: "power3.inOut"
  });
}

tl.to({}, { duration: 1.1 })
  .to(track, { x: 0, duration: 0.75, ease: "power3.inOut" });`,
  },
  {
    id: 'carousel-draggable',
    order: 34,
    title: 'Draggable Carousel',
    summary: 'Give a carousel momentum, bounds and snapping with Draggable.',
    explanation:
      'Draggable with inertia lets visitors flick through slides. A snap function rounds the release to the nearest slide offset.',
    tip: 'Always derive snap points from real slide offsets, not fixed math.',
    level: 'advanced',
    categories: ['Carousel', 'Draggable', 'Interaction'],
    scene: 'carousel-drag',
    accent: '#f472b6',
    interaction: 'drag',
    code: `const viewport = document.querySelector(".carousel-window");
const track = document.querySelector(".carousel-track");
const slides = gsap.utils.toArray(".carousel-slide");

const offsets = slides.map((slide) => -slide.offsetLeft);
const minX = viewport.clientWidth - track.scrollWidth;

Draggable.create(track, {
  type: "x",
  bounds: { minX, maxX: 0 },
  inertia: true,
  edgeResistance: 0.7,
  snap: {
    x: (value) => nearestOffset(offsets, value, minX)
  }
});`,
  },
  {
    id: 'page-transition',
    order: 35,
    title: 'Page Transition Wipe',
    summary: 'Mask a route change with staggered curtain strips.',
    explanation:
      'Cover the viewport with strips, swap the page underneath, then uncover. Staggering each strip turns a hard swap into a sequence.',
    tip: 'Keep transition overlays pointer-events-none so they never block clicks.',
    level: 'advanced',
    categories: ['Transition', 'Timeline'],
    scene: 'page-transition',
    accent: '#8b5cf6',
    code: `const tl = gsap.timeline({ repeat: -1 });

tl.to(".transition-strip", {
  yPercent: 0,
  duration: 0.5,
  stagger: 0.06,
  ease: "power4.inOut"
})
.set(".page-a", { yPercent: -100 })
.set(".page-b", { yPercent: 0 })
.to(".transition-strip", {
  yPercent: -100,
  duration: 0.5,
  stagger: 0.06,
  ease: "power4.inOut"
});`,
  },
  {
    id: 'image-tilt',
    order: 36,
    title: '3D Image Tilt',
    summary: 'Tilt an image toward the cursor with quickTo setters.',
    explanation:
      'quickTo creates reusable high-performance setters. Map pointer position to rotationX and rotationY for a tactile 3D card.',
    tip: 'Cap the rotation range and use perspective on the parent for a believable result.',
    level: 'intermediate',
    categories: ['Image', 'Interaction'],
    scene: 'image-tilt',
    accent: '#60a5fa',
    interaction: 'hover',
    code: `const card = document.querySelector(".tilt-card");
const rotateX = gsap.quickTo(card, "rotationX", { duration: 0.5 });
const rotateY = gsap.quickTo(card, "rotationY", { duration: 0.5 });

card.addEventListener("mousemove", (event) => {
  const rect = card.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;

  rotateY(x * 22);
  rotateX(-y * 22);
});`,
  },
  {
    id: 'image-gallery',
    order: 37,
    title: 'Stacked Image Gallery',
    summary: 'Fan a stack of images outward with a staggered reveal.',
    explanation:
      'A single staggered tween can fan stacked cards into a gallery. yoyo brings them back together for a seamless loop.',
    tip: 'Animate from the center so the fan stays balanced on any screen width.',
    level: 'advanced',
    categories: ['Image', 'Stagger'],
    scene: 'image-gallery',
    accent: '#fbbf24',
    code: `const cards = gsap.utils.toArray(".gallery-card");
const total = cards.length;

gsap.to(cards, {
  x: (i) => (i - (total - 1) / 2) * 54,
  y: (i) => Math.abs(i - (total - 1) / 2) * 14,
  rotation: (i) => (i - (total - 1) / 2) * 10,
  duration: 0.9,
  stagger: 0.05,
  ease: "power3.out",
  repeat: -1,
  yoyo: true
});`,
  },
  {
    id: 'image-kenburns',
    order: 38,
    title: 'Ken Burns Image Zoom',
    summary: 'Add cinematic life to a still image with a slow zoom and pan.',
    explanation:
      'A long, eased scale and translate can make a static image feel alive. Very slow timing keeps the effect subtle.',
    tip: 'Keep Ken Burns movement under 20% scale or it becomes distracting.',
    level: 'beginner',
    categories: ['Image', 'Basics'],
    scene: 'image-kenburns',
    accent: '#f97316',
    code: `gsap.fromTo(".kenburns-panel",
  { scale: 1.02, xPercent: 0, yPercent: 0 },
  {
    scale: 1.22,
    xPercent: -3,
    yPercent: -2,
    duration: 6,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
  }
);`,
  },
  {
    id: 'scroll-progress',
    order: 39,
    title: 'Scroll Progress Timeline',
    summary: 'Drive a progress bar, counter and cards from one scrubbed timeline.',
    explanation:
      'A single ScrollTrigger timeline can own multiple properties. Scrub maps its playhead to scroll distance, so the bar, number and cards stay perfectly in sync.',
    tip: 'Use snap on the counter object so the displayed value stays a clean integer.',
    level: 'intermediate',
    categories: ['ScrollTrigger', 'Timeline'],
    scene: 'scroll-progress',
    accent: '#22d3ee',
    interaction: 'scroll',
    code: `const counter = { value: 0 };
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".progress-scene",
    start: "top top",
    end: "bottom bottom",
    scrub: 0.6
  }
});

tl.to(".progress-bar", { scaleX: 1, ease: "none" }, 0)
  .to(counter, {
    value: 100,
    ease: "none",
    snap: { value: 1 },
    onUpdate: () => {
      number.textContent = String(Math.round(counter.value)).padStart(2, "0");
    }
  }, 0)
  .from(".progress-card", {
    y: 44,
    opacity: 0,
    stagger: 0.4
  }, 0.2);`,
  },
  {
    id: 'scroll-velocity',
    order: 40,
    title: 'Scroll Velocity Skew',
    summary: 'Bend rows based on how fast the visitor is scrolling.',
    explanation:
      'ScrollTrigger.getVelocity() reports scroll speed. Feed it through quickTo setters to skew rows, then ease back to zero when scrolling stops.',
    tip: 'Clamp velocity before applying it so fast flicks never break the layout.',
    level: 'advanced',
    categories: ['ScrollTrigger', 'Advanced'],
    scene: 'scroll-velocity',
    accent: '#8b5cf6',
    interaction: 'scroll',
    code: `const clamp = gsap.utils.clamp(-12, 12);
const setters = rows.map((row) =>
  gsap.quickTo(row, "skewY", { duration: 0.35 })
);

ScrollTrigger.create({
  trigger: ".velocity-scene",
  start: "top top",
  end: "bottom bottom",
  onUpdate: (self) => {
    const velocity = clamp(self.getVelocity() / -260);
    setters.forEach((setter) => setter(velocity));

    gsap.to({}, {
      duration: 0.18,
      onComplete: () => setters.forEach((setter) => setter(0))
    });
  }
});`,
  },
  {
    id: 'scroll-parallax-gallery',
    order: 41,
    title: 'Parallax Image Columns',
    summary: 'Move gallery columns at different rates while the page scrolls.',
    explanation:
      'Each column reads its own speed multiplier and gets a scrubbed fromTo tween. Different rates create depth without any 3D transforms.',
    tip: 'Use a shared trigger for all columns so the parallax stays aligned.',
    level: 'intermediate',
    categories: ['ScrollTrigger', 'Image'],
    scene: 'scroll-parallax-gallery',
    accent: '#c6ff4a',
    interaction: 'scroll',
    code: `const columns = gsap.utils.toArray(".parallax-column");

columns.forEach((column) => {
  const speed = Number(column.dataset.speed);

  gsap.fromTo(column,
    { y: 40 * speed },
    {
      y: -70 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: ".parallax-scene",
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    }
  );
});`,
  },
  {
    id: 'text-scramble',
    order: 42,
    title: 'Text Scramble Decode',
    summary: 'Resolve random glyphs into a final message.',
    explanation:
      'A progress value controls how many characters are locked in. Unrevealed characters are replaced with random glyphs on every update.',
    tip: 'Keep spaces intact so the decoded line never jumps between layouts.',
    level: 'intermediate',
    categories: ['Text'],
    scene: 'text-scramble',
    accent: '#f472b6',
    code: `const state = { progress: 0 };
const glyphs = "!<>-_\\\\/[]{}—=+*^?#";

const tl = gsap.timeline({
  repeat: -1,
  repeatDelay: 1.3,
  onRepeat: () => { state.progress = 0; }
});

tl.to(state, {
  progress: 1,
  duration: 2.2,
  ease: "none",
  onUpdate: () => {
    const revealed = Math.floor(state.progress * text.length);
    text.textContent = [...text].map((char, index) => {
      if (index < revealed || char === " ") return char;
      return glyphs[Math.floor(Math.random() * glyphs.length)];
    }).join("");
  }
});`,
  },
  {
    id: 'text-line-reveal',
    order: 43,
    title: 'Masked Line Reveal',
    summary: 'Let SplitText lines rise from behind overflow-hidden masks.',
    explanation:
      'SplitText measures real line boxes. Animating yPercent on each line with an overflow-hidden mask produces a clean editorial reveal at any width.',
    tip: 'Revert the split when the scene is destroyed so the original text is restored.',
    level: 'intermediate',
    categories: ['Text', 'Stagger'],
    scene: 'text-lines',
    accent: '#34d399',
    code: `const split = new SplitText(".line-heading", {
  type: "lines",
  linesClass: "split-line"
});

const tl = gsap.timeline();

tl.from(split.lines, {
  yPercent: 120,
  opacity: 0,
  duration: 0.9,
  stagger: 0.1,
  ease: "power4.out"
})
.from(".line-sub", {
  y: 16,
  opacity: 0,
  duration: 0.6
}, "-=0.35");`,
  },
  {
    id: 'text-gradient-sweep',
    order: 44,
    title: 'Gradient Sweep Text',
    summary: 'Slide a multi-stop gradient across clipped text.',
    explanation:
      'Set the gradient larger than the text, clip it to the glyphs, then animate background-position. The yoyo loop creates a continuous color sweep.',
    tip: 'Use backgroundSize: "200% 100%" so there is room for the gradient to travel.',
    level: 'beginner',
    categories: ['Text', 'Easing'],
    scene: 'text-gradient',
    accent: '#fbbf24',
    code: `const tl = gsap.timeline({
  repeat: -1,
  yoyo: true,
  defaults: { ease: "sine.inOut" }
});

tl.fromTo(".gradient-text",
  { backgroundPosition: "0% 50%" },
  { backgroundPosition: "200% 50%", duration: 2.4 }
);`,
  },
  {
    id: 'page-transition-slide',
    order: 45,
    title: 'Slide Push Transition',
    summary: 'Push one page out as the next page slides in from the side.',
    explanation:
      'A full-width flex track shifts by one panel per step. Because each panel is 100% wide, xPercent -100 moves exactly one page.',
    tip: 'Keep the track width equal to one panel and use xPercent for resolution-independent steps.',
    level: 'advanced',
    categories: ['Transition', 'Timeline'],
    scene: 'page-transition-slide',
    accent: '#22d3ee',
    code: `const track = document.querySelector(".slide-track");
const panels = gsap.utils.toArray(".slide-panel");
const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

for (let i = 1; i < panels.length; i++) {
  tl.to(track, {
    xPercent: -100 * i,
    duration: 0.75,
    ease: "power3.inOut"
  });
}

tl.to({}, { duration: 1 })
  .to(track, {
    xPercent: 0,
    duration: 0.75,
    ease: "power3.inOut"
  });`,
  },
  {
    id: 'page-transition-zoom',
    order: 46,
    title: 'Zoom Blur Transition',
    summary: 'Swap stacked pages with a scale, blur and opacity hand-off.',
    explanation:
      'Stack both pages in the same frame, then cross-fade them while scaling and blurring in opposite directions. The result reads as a camera move.',
    tip: 'Animate filter blur sparingly and keep durations matched to avoid a muddy midpoint.',
    level: 'advanced',
    categories: ['Transition'],
    scene: 'page-transition-zoom',
    accent: '#8b5cf6',
    code: `const tl = gsap.timeline({
  repeat: -1,
  repeatDelay: 0.6,
  defaults: { ease: "power3.inOut" }
});

tl.to(".page-a", {
  opacity: 0,
  scale: 0.86,
  filter: "blur(14px)",
  duration: 0.7
})
.to(".page-b", {
  opacity: 1,
  scale: 1,
  filter: "blur(0px)",
  duration: 0.7
}, "<");`,
  },
  {
    id: 'carousel-coverflow',
    order: 47,
    title: '3D Coverflow Carousel',
    summary: 'Arrange cards in depth and rotate them like a coverflow gallery.',
    explanation:
      'Wrap offset maps each card to a signed distance from the active index. That distance drives x, scale, rotationY, opacity and zIndex.',
    tip: 'Reduce opacity beyond two steps so the back cards fade instead of cluttering the frame.',
    level: 'advanced',
    categories: ['Carousel', 'Advanced'],
    scene: 'carousel-coverflow',
    accent: '#f472b6',
    code: `const total = cards.length;
let active = 0;

function layout(duration) {
  cards.forEach((card, index) => {
    let offset = (index - active + total) % total;
    if (offset > total / 2) offset -= total;

    const distance = Math.abs(offset);

    gsap.to(card, {
      x: offset * 86,
      scale: 1 - distance * 0.14,
      rotationY: offset * -22,
      opacity: distance > 2 ? 0 : 1,
      zIndex: total - distance,
      duration,
      ease: "power3.inOut"
    });
  });
}`,
  },
  {
    id: 'carousel-vertical',
    order: 48,
    title: 'Vertical Carousel',
    summary: 'Move a carousel vertically and sync a slim dot rail.',
    explanation:
      'A vertical track translates by the window height for each step. Dot indicators update from tween onStart callbacks and reset on restart.',
    tip: 'Read the window height at animation time so resizes and zoom levels are respected.',
    level: 'intermediate',
    categories: ['Carousel', 'Timeline'],
    scene: 'carousel-vertical',
    accent: '#34d399',
    code: `const windowEl = document.querySelector(".vertical-window");
const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });

for (let i = 1; i < slides.length; i++) {
  tl.to(track, {
    y: () => -i * windowEl.clientHeight,
    duration: 0.7,
    ease: "power3.inOut",
    onStart: () => setActive(i)
  });
}

tl.to({}, { duration: 1 })
  .to(track, {
    y: 0,
    duration: 0.7,
    ease: "power3.inOut",
    onStart: () => setActive(0)
  });`,
  },
  {
    id: 'image-hover-follow',
    order: 49,
    title: 'Cursor-Follow Image Preview',
    summary: 'Reveal a floating image preview that tracks the pointer.',
    explanation:
      'quickTo setters keep the preview glued to the cursor without creating a new tween on every mousemove. Hover handlers swap the preview gradient per row.',
    tip: 'Use pointer-events-none on the preview so it never steals hover from the list.',
    level: 'intermediate',
    categories: ['Image', 'Interaction'],
    scene: 'image-hover-follow',
    accent: '#60a5fa',
    interaction: 'hover',
    code: `const preview = document.querySelector(".hover-preview");
const xTo = gsap.quickTo(preview, "x", { duration: 0.5 });
const yTo = gsap.quickTo(preview, "y", { duration: 0.5 });

root.addEventListener("mousemove", (event) => {
  const rect = root.getBoundingClientRect();
  xTo(event.clientX - rect.left);
  yTo(event.clientY - rect.top);
});

items.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    preview.style.background = item.dataset.gradient;
    gsap.to(preview, { opacity: 1, scale: 1 });
  });
});`,
  },
  {
    id: 'image-compare',
    order: 50,
    title: 'Draggable Before / After',
    summary: 'Compare two images with a draggable clip-path divider.',
    explanation:
      'Draggable moves a vertical handle while a clip-path on the top layer follows its x value. Bounds keep the divider inside the frame.',
    tip: 'Derive the clip percentage from the measured frame width, not a hardcoded pixel value.',
    level: 'advanced',
    categories: ['Image', 'Draggable', 'Interaction'],
    scene: 'image-compare',
    accent: '#f97316',
    interaction: 'drag',
    code: `const width = frame.clientWidth;

function update() {
  const x = gsap.getProperty(handle, "x");
  const percent = gsap.utils.clamp(0, 100, (x / width) * 100);
  topLayer.style.clipPath = \`inset(0 \${100 - percent}% 0 0)\`;
}

gsap.set(handle, { x: width * 0.5 });

Draggable.create(handle, {
  type: "x",
  bounds: { minX: 0, maxX: width },
  onDrag: update,
  onThrowUpdate: update
});`,
  },
]

export const exampleById = new Map(examples.map((example) => [example.id, example]))

export const examplesByLevel = {
  beginner: examples.filter((example) => example.level === 'beginner'),
  intermediate: examples.filter((example) => example.level === 'intermediate'),
  advanced: examples.filter((example) => example.level === 'advanced'),
}

export const featuredExampleIds = ['basic-tween', 'text-reveal', 'motion-path']

export const scrollExamples = examples.filter((example) =>
  example.categories.includes('ScrollTrigger'),
)
