import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "@/components/Card";
import { cardConfigs } from "@/lib/card";

const meta: Meta<typeof Card> = {
  title: "Card",
  component: Card,
  argTypes: {
    config: {
      options: Object.keys(cardConfigs),
      mapping: cardConfigs,
      control: {
        type: "select",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    config: cardConfigs.spy,
    isHighlighted: false,
  },
};
