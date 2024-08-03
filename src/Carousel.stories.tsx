import React from "react"
import { Meta, StoryFn } from "@storybook/react"
import Carousel from "."
import type { CarouselProps } from "."

export default {
  title: "Carousel",
  component: Carousel,
} as Meta

const Template: StoryFn<CarouselProps> = (args: any) => <Carousel {...args} />

export const Default = Template.bind({})
Default.args = {
  options: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  initialOption: 1,
  onChange: (item: any) => console.log(item),
}
