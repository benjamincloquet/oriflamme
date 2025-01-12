// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";

import { Board } from "@/components/Board";

const meta: Meta<typeof Board> = {
  component: Board,
};

export default meta;
type Story = StoryObj<typeof Board>;

export const Default: Story = {};
