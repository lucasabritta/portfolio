/**
 * Subset of Storybook `play` context used by co-located `*.stories.test.ts` modules.
 * (Storybook 10 does not re-export a stable `PlayFunction` type from `@storybook/react` for tsc.)
 */
export type StoryPlayContext = {
  canvasElement: HTMLElement;
};

export type StoryPlayFn = (context: StoryPlayContext) => void | Promise<void>;
