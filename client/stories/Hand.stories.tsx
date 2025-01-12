// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";

import { Hand } from "@/components/Hand";
import { families } from "@/lib/family";
import { cardConfigs } from "@/lib/card";

const meta: Meta<typeof Hand> = {
  component: Hand,
};

export default meta;
type Story = StoryObj<typeof Hand>;

export const Default: Story = {
  args: {
    cards: Object.values(cardConfigs).map((cardConfig) => ({
      family: families.red,
      cardConfig,
    })),
  },
};
